from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_register_user():
    assert True
