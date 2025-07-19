from sqlmodel import SQLModel, Field

class Item(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    quantity: int | None

class ItemUpdate(SQLModel):
    name: str | None
    quantity: int | None

    