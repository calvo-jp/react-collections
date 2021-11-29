from fastapi import APIRouter

router = APIRouter()


@router.websocket('/validators/emails')
async def validate_email_():
    pass
