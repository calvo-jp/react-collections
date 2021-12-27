from json.decoder import JSONDecodeError

from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlmodel import Session, func, select

from ..dependency import get_session
from ..models import User

router = APIRouter()


@router.websocket(path='/validators/emails')
async def check_email_availability(
    *,
    socket: WebSocket,
    session: Session = Depends(get_session)
):
    """
    @example
    ```javascript
    const ws = new WebSocket("ws://localhost:8000/validators/emails");

    ws.addEventListener("open", () => {
        ws.send(JSON.stringify({ subject: "calvojp92@gmail.com" }));
    });

    ws.addEventListener("message", (event) => {
        console.log(JSON.parse(event.data)); // { available: true }
    });

    // codes...
    ```
    """
    await socket.accept()

    try:
        while True:
            try:
                data = await socket.receive_json()
                assert isinstance(data, dict)

                subject = data.get("subject")
                assert isinstance(subject, str)

                validate_email(subject, check_deliverability=False)

                count: int = session.execute(
                    select(User)
                    .with_only_columns(func.count(User.id))
                    .where(User.email == subject)
                    .limit(1)
                ).scalar_one()

                await socket.send_json(dict(available=count == 0))
            except (
                JSONDecodeError,
                AssertionError,
                EmailNotValidError,
            ):
                await socket.send_json(dict(available=False))
    except WebSocketDisconnect:
        await socket.close()
