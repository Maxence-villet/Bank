import uvicorn
from api.load_app import load_app

app = load_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
