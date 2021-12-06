from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlmodel import Session, func, select

from ..config import engine
from ..models import User

router = APIRouter()


@router.websocket(path='/validators/emails')
async def check_email_availability(socket: WebSocket):
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
            data = await socket.receive_json()
            email = data.get("subject")

            try:
                validate_email(email, check_deliverability=False)

                with Session(engine) as session:
                    count: int = session.execute(
                        select(User)
                        .with_only_columns(func.count(User.id))
                        .where(User.email == email)
                        .limit(1)
                    ).scalar_one()

                    await socket.send_json(dict(available=count == 0))
            except EmailNotValidError:
                await socket.send_json(dict(available=False))
    except WebSocketDisconnect:
        await socket.close()
