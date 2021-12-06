from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import create_tables
from .router import recipe, session, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_methods='*',
    allow_headers='*',
)

app.include_router(router=session.router)
app.include_router(router=user.router)
app.include_router(router=recipe.router)


@app.on_event(event_type='startup')
async def startup():
    create_tables()
