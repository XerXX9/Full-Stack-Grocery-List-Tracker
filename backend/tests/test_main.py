from fastapi.testclient import TestClient

def test_create_item(client: TestClient, test_item: dict):
    response_post = client.post(
        "/items/",
        json={"name": "Test Item", "quantity": 123}
    )

    assert response_post.status_code == 200
    data = response_post.json()
    assert data["name"] == "Test Item"
    assert data["quantity"] == 123
    assert "id" in data

def test_read_item(client: TestClient, test_item: dict):
    response_get = client.get("/items/")

    assert response_get.status_code == 200
    assert response_get.json() == [test_item]

def test_update_item(client: TestClient, test_item:dict):
    response_post = client.post(
        "/items/",
        json={"name": "Test Item", "quantity": 123}
    )

    item_id = test_item["id"]

    response_put = client.put(
        f"/items/{item_id}",
        json={"name": "Updated Item", "quantity": 121}
    )
    assert response_put.status_code == 200
    data = response_put.json()
    assert data["name"] == "Updated Item"
    assert data["quantity"] == 121

def test_update_item_not_found(client: TestClient):
    response_post = client.put(
        "/items/999", 
        json={"name": "Doesn't Matter", "quantity": 0}
    )
    assert response_post.status_code == 404
    assert response_post.json() == {"detail": "Item with id 999 not found"}

def test_delete_item(client: TestClient, test_item: dict):
    item_id = test_item["id"]

    response_delete = client.delete(
        f"/items/{item_id}",
    )
    assert response_delete.status_code == 204


