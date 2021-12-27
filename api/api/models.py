from datetime import date, datetime
from typing import List, Literal, Optional, TypeAlias, TypedDict

from pydantic import EmailStr
from sqlmodel import (Column, Date, DateTime, Field, Relationship, SQLModel,
                      String)

from .config import engine
from .utils import date_difference


class ZonedDateTime(DateTime):
    """Timestamp with timezone table column"""

    def __init__(self):
        super().__init__(timezone=True)


class SQLModelTimestamped(SQLModel):
    """Add created_at and updated_at field to sqlmodel table"""

    created_at: datetime = Field(
        ..., sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )


class Purok(SQLModelTimestamped, table=True):
    __tablename__: str = "puroks"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(
        ..., sa_column=Column(String, unique=True, nullable=False)
    )

    households: List["Household"] = Relationship(back_populates="purok")
    residents: List["User"] = Relationship(back_populates="purok")

    @property
    def total_residents(self):
        pass

    @property
    def total_households(self):
        pass


class Household(SQLModelTimestamped, table=True):
    __tablename__: str = "households"

    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(
        ..., sa_column=Column(String, unique=True, nullable=False)
    )
    purok_id: int = Field(..., foreign_key="puroks.id")
    purok: Purok = Relationship(back_populates="households")
    total_families: int

    members: List["User"] = Relationship(back_populates="household")
    document_requests: List["DocumentRequest"] = Relationship(
        back_populates="purok"
    )

    @property
    def total_members(self):
        pass


class Name(TypedDict):
    first: str
    middle: Optional[str]
    last: str
    suffix: Optional[str]


Gender: TypeAlias = Literal[
    "male",
    "female"
]


Marital: TypeAlias = Literal[
    "single",
    "married",
    "widowed",
    "divorced",
]


EmploymentStatus: TypeAlias = Literal[
    "student",
    "employed",
    "unemployed",
    "self employed",
]


EducationalAttainment: TypeAlias = Literal[
    "college level",
    "highschool level",
    "elementary level",
    "college graduate",
    "highschool graduate",
    "elementary graduate",
]


class Age(TypedDict):
    years: int
    months: int
    days: int


class User(SQLModelTimestamped, table=True):
    __tablename__: str = "users"

    id: Optional[int] = Field(default=False, primary_key=True)
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    suffix: Optional[str] = None
    gender: Optional[Gender] = Field(
        default=None,
        sa_column=Column(String)
    )
    marital: Optional[Marital] = Field(
        default=None,
        sa_column=Column(String)
    )
    date_of_birth: Optional[date] = Field(default=None, sa_column=Column(Date))
    is_pwd: Optional[bool] = None
    employment_status: Optional[EmploymentStatus] = Field(
        default=None,
        sa_column=Column(String)
    )
    educational_attainment: Optional[EducationalAttainment] = Field(
        default=None,
        sa_column=Column(String)
    )
    email: Optional[EmailStr] = Field(
        default=None,
        sa_column=Column(String, unique=True)
    )
    phone_number: Optional[str] = Field(
        default=None,
        sa_column=Column(String, unique=True)
    )
    username: Optional[str] = Field(
        default=None,
        sa_column=Column(String, unique=True)
    )
    password: Optional[bytes] = None
    purok_id: Optional[int] = Field(default=None, foreign_key="puroks.id")
    purok: Optional[Purok] = Relationship(back_populates="residents")
    household_id:  Optional[int] = Field(
        default=None,
        foreign_key="households.id"
    )
    household: Optional[Household] = Relationship(back_populates="members")
    employment: List["Employee"] = Relationship(back_populates="user")
    document_requests: List["DocumentRequest"] = Relationship(
        back_populates="user"
    )

    @property
    def age(self):
        if self.date_of_birth is None:
            return None

        diff = date_difference(self.date_of_birth)

        return Age(
            years=diff["years"],
            months=diff["months"],
            days=diff["days"]
        )

    @property
    def name(self):
        return Name(
            first=self.first_name,
            middle=self.last_name,
            last=self.last_name,
            suffix=self.suffix
        )

    @property
    def full_name(self):
        name = "%s %s %s %s" % (
            self.first_name,
            self.middle_name or "",
            self.last_name,
            self.suffix or ""
        )

        return "".join(name.split())


EmployeePosition: TypeAlias = Literal[
    "Barangay Captain",
    "Secretary",
    "SK Chairman",
    "SK Kagawad",
    "SK Member",
    "Lupon",
]


class Employee(SQLModelTimestamped, table=True):
    __tablename__: str = "employees"

    id: Optional[int] = Field(default=None, primary_key=True)
    position: EmployeePosition = Field(..., sa_column=Column(String))
    user_id: int = Field(..., foreign_key="users.id")
    user: User = Relationship(back_populates="employment")
    start: date
    until: Optional[date] = None
    reason_for_leaving: Optional[str] = None


DocumentType: TypeAlias = Literal[
    "barangay permit",
    "barangay certificate",
    "certificate of ownership",
    "certificate of singleness",
    "certificate of cutting trees",
]


DocumentRequestStatus: TypeAlias = Literal[
    "pending",
    "approved",
    "canceled",
    "forwarded",
]


class DocumentRequest(SQLModelTimestamped, table=True):
    __tablename__: str = "document_requests"

    id: Optional[int] = Field(default=None, primary_key=True)
    type_: DocumentType = Field(..., sa_column=Column(String))
    status: DocumentRequestStatus = Field(..., sa_column=Column(String))
    user: User = Relationship(back_populates="document_requests")
    user_id: int = Field(..., foreign_key="users.id")
    purok: User = Relationship(back_populates="document_requests")
    purok_id: int = Field(..., foreign_key="puroks.id")


def create_tables():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
