from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_register_user():
    payload = {
        "first_name": "Jean",
        "last_name": "Dupont",
        "email": "jean.dupont@example.com",
        "password": "mon_super_password"
    }

    response = client.post("/user/register", json=payload)
    assert response.status_code == 200
    assert "message" in response.json()
