import os
import uvicorn
from api.load_app import load_app

app = load_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5432))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
