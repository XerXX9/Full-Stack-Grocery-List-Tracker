from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import create_db_and_tables, SessionDep
from sqlmodel import select
from model import Item, ItemUpdate, Item




@asynccontextmanager # turns function into a special context manager that Fastapi knows how to use for startup and shutdown
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield # The function sends back a value and then freezes its state. When asked for the next value, it unpauses and continues running.

app = FastAPI(lifespan=lifespan)

origins = [
    "https://full-stack-grocery-list-tracker.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome! Use the /items/ endpoint to view all items."}

@app.get("/items/", response_model=list[Item])
def show_all_items(session: SessionDep):
    items = session.exec(select(Item)).all()

    return items

@app.post("/items/", response_model=Item)
def add_new_item(session: SessionDep, item: Item) -> Item:
    session.add(item)
    session.commit()
    session.refresh(item)

    return item

@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, session: SessionDep, item_update: ItemUpdate):
    db_item = session.get(Item, item_id)
    print(db_item)
    if not db_item:
        raise HTTPException(status_code=404, detail=f"Item with id {item_id} not found")
    item_data = item_update.model_dump(exclude_unset=True)
    for key, value in item_data.items():
        setattr(db_item, key, value)

    session.add(db_item)
    session.commit()
    session.refresh(db_item)

    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, session: SessionDep):
    db_item = session.get(Item, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail=f"Item with id {item_id} not found")
    session.delete(db_item)
    session.commit()

    return Response(status_code=204)