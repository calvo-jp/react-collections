"""
Router for routes that need realtime data including sse, websocket, etc.
"""

from fastapi import APIRouter

router = APIRouter()


@router.websocket('/validators/emails')
async def validate_email_():
    pass
