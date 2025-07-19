import dotenv
import os
from sqlmodel import create_engine, SQLModel, Session
from typing import Annotated
from fastapi import Depends

dotenv.load_dotenv()
postgres_url = os.getenv("POSTGRES_URL")

if postgres_url is None:
    raise ValueError("POSTGRES_URL environment variable is not set")

engine = create_engine(postgres_url)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
