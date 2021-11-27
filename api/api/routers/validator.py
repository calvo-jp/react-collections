"""
Validators for realtime use cases example is checking email availability.
See usage below

```javascript
const socket = new WebSocket("ws://localhost:8000/validators/emails");
socket.addEventListener("message", (event) => {
    console.log(JSON.parse(event.data)) // { available: true }
});
socket.send(JSON.stringify({ subject: "johndoe@gmail.com" }));
...
```
"""

from fastapi import APIRouter

router = APIRouter()


@router.websocket('/validators/emails')
async def validate_email_():
    pass
