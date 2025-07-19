import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from main import app
from database import get_session

from sqlmodel import create_engine, Session, SQLModel

db_file_name = "tests/db_api_test.db"
sqlite_url = f"sqlite:///{db_file_name}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

def get_test_session():
    with Session(engine) as session:
        yield session

@pytest.fixture(name='client')
def client_fixture():
    SQLModel.metadata.create_all(engine)
    app.dependency_overrides[get_session] = get_test_session
    yield TestClient(app)
    app.dependency_overrides.clear()
    SQLModel.metadata.drop_all(engine)

@pytest.fixture(name="test_item")
def test_item_fixture(client: TestClient):
    response = client.post(
        "/items/",
        json={"name": "Test Item", "quantity": 123}
    )
    assert response.status_code == 200
    return response.json()