from datetime import datetime
from typing import Optional

import strawberry


@strawberry.type
class Purok:
    id: int
    name: str
    created_at: datetime
    updated_at: Optional[datetime]


@strawberry.type
class Household:
    id: int
    code: str
    purok: Purok
    total_families: int
