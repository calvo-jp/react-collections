from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import generate_tables
from .routers import users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods="*",
    allow_headers="*"
)

app.include_router(router=users.router)


@app.on_event(event_type="startup")
async def startup():
    generate_tables()
