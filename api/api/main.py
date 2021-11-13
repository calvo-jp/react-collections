from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import generate_models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_methods='*',
    allow_headers='*',
)


@app.on_event('startup')
async def startup():
    generate_models()
