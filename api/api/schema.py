from datetime import datetime
from typing import Optional

import strawberry


@strawberry.type
class Purok:
    id: int
    name: str
    created_at: datetime
    updated_at: Optional[datetime]
