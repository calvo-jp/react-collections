from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import generate_models
from .routers import session, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_methods='*',
    allow_headers='*',
)

app.include_router(session.router)


@app.on_event('startup')
async def startup():
    generate_models()
