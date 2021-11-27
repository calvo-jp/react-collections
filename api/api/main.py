from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import generate_models
from .routers import place, session, user, validator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_methods='*',
    allow_headers='*',
)

app.include_router(session.router)
app.include_router(user.router)
app.include_router(place.router)
app.include_router(validator.router)


@app.on_event('startup')
async def startup():
    generate_models()
