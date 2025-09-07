# backend/app/main.py
from fastapi import FastAPI
from .api import users

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

app.include_router(users.router, prefix="/users", tags=["users"])
