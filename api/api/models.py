
from datetime import date, datetime, timezone
from enum import Enum
from typing import Generic, List, Optional, TypedDict, TypeVar

from pydantic import EmailStr, validator
from pydantic.generics import GenericModel
from sqlalchemy import event
from sqlmodel import Column, Date, DateTime
from sqlmodel import Enum as EnumField
from sqlmodel import Field, Relationship, SQLModel, String

from .config import engine
from .utils import date_difference, validators


class ZonedDateTime(DateTime):
    """Timestamp with timezone table column"""

    def __init__(self):
        super().__init__(timezone=True)


def utcnow_():
    return datetime.now(timezone.utc)


class SQLModelTimestamped(SQLModel):
    """Add created_at and updated_at field to sqlmodel table"""

    created_at: datetime = Field(
        default_factory=utcnow_,
        sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )


@event.listens_for(SQLModelTimestamped, "before_update")
def update_timestamp(_, table: SQLModelTimestamped):
    table.updated_at = utcnow_()


class Purok(SQLModelTimestamped, table=True):
    __tablename__: str = 'puroks'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(
        ..., sa_column=Column(String, unique=True, nullable=False)
    )

    households: List['Household'] = Relationship(back_populates='purok')
    residents: List['User'] = Relationship(back_populates='purok')
    document_requests: List['DocumentRequest'] = Relationship(
        back_populates='purok'
    )

    @property
    def total_residents(self):
        pass

    @property
    def total_households(self):
        pass


class ReadPurok(SQLModel):
    id: int
    name: str
    created_at: datetime
    updated_at: Optional[datetime]


class Household(SQLModelTimestamped, table=True):
    __tablename__: str = 'households'

    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(
        ..., sa_column=Column(String, unique=True, nullable=False)
    )
    purok_id: int = Field(..., foreign_key='puroks.id')
    purok: Purok = Relationship(back_populates='households')
    total_families: int
    members: List['User'] = Relationship(back_populates='household')

    @property
    def total_members(self):
        pass


class ReadHousehold(SQLModel):
    id: int
    code: str
    purok: ReadPurok
    total_families: int
    created_at: datetime
    updated_at: Optional[datetime]


class Name(TypedDict):
    first: str
    middle: Optional[str]
    last: str
    suffix: Optional[str]


class Gender(str, Enum):
    MALE = 'male'
    FEMALE = 'female'


class Marital(str, Enum):
    SINGLE = 'single'
    MARRIED = 'married'
    WIDOWED = 'widowed'
    DIVORCED = 'divorced'


class EmploymentStatus(str, Enum):
    STUDENT = 'student'
    EMPLOYED = 'employed'
    UNEMPLOYED = 'unemployed'
    SELF_EMPLOYED = 'self employed'


class EducationalAttainment(str, Enum):
    COLLEGE_LEVEL = 'college level'
    HIGHSCHOOL_LEVEL = 'highschool level'
    ELEMENTARY_LEVEL = 'elementary level'
    COLLEGE_GRADUATE = 'college graduate'
    HIGHSCHOOL_GRADUATE = 'highschool graduate'
    ELEMENTARY_GRADUATE = 'elementary graduate'


class Age(TypedDict):
    years: int
    months: int
    days: int


class User(SQLModelTimestamped, table=True):
    __tablename__: str = 'users'

    id: Optional[int] = Field(default=False, primary_key=True)
    first_name: str
    middle_name: Optional[str] = None
    last_name: str
    suffix: Optional[str] = None
    gender: Optional[Gender] = Field(
        default=None,
        sa_column=Column(EnumField(Gender))
    )
    marital: Optional[Marital] = Field(
        default=None,
        sa_column=Column(EnumField(Marital))
    )
    date_of_birth: Optional[date] = Field(default=None, sa_column=Column(Date))
    is_pwd: Optional[bool] = None
    employment_status: Optional[EmploymentStatus] = Field(
        default=None,
        sa_column=Column(EnumField(EmploymentStatus))
    )
    educational_attainment: Optional[EducationalAttainment] = Field(
        default=None,
        sa_column=Column(EnumField(EducationalAttainment))
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
    purok_id: Optional[int] = Field(default=None, foreign_key='puroks.id')
    purok: Optional[Purok] = Relationship(back_populates='residents')
    household_id:  Optional[int] = Field(
        default=None,
        foreign_key='households.id'
    )
    household: Optional[Household] = Relationship(back_populates='members')
    employment: List['Employee'] = Relationship(back_populates='user')
    document_requests: List['DocumentRequest'] = Relationship(
        back_populates='user'
    )

    @property
    def age(self):
        if self.date_of_birth is None:
            return None

        diff = date_difference(self.date_of_birth)

        return Age(
            years=diff['years'],
            months=diff['months'],
            days=diff['days']
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
        name = '%s %s %s %s' % (
            self.first_name,
            self.middle_name or "",
            self.last_name,
            self.suffix or ""
        )

        return "".join(name.split())


class ReadUser(SQLModel):
    id: int
    name: Name
    full_name: str
    gender: Optional[Gender]
    marital: Optional[Marital]
    is_pwd: Optional[bool]
    date_of_birth: Optional[date]
    age: Optional[Age]
    employment_status: Optional[EmploymentStatus]
    educational_attainment: Optional[EducationalAttainment]
    phone_number: Optional[str]
    username: Optional[str]
    email: Optional[EmailStr]
    created_at: datetime
    updated_at: Optional[datetime]

    purok: Optional[ReadPurok]
    household: Optional[ReadHousehold] = Field(
        default=None,
        exclude=('purok',)
    )


class CreateUser(SQLModel):
    name: Name
    gender: Optional[Gender]
    marital: Optional[Marital]
    is_pwd: Optional[bool]
    date_of_birth: Optional[date]
    employment_status: Optional[EmploymentStatus]
    educational_attainment: Optional[EducationalAttainment]
    phone_number: Optional[str]
    username: Optional[str]
    password: Optional[str]
    email: Optional[EmailStr]

    @validator(
        'email',
        'gender',
        'marital',
        'username',
        'employment_status',
        'educational_attainment',
        pre=True
    )
    @classmethod
    def lowercase(cls, subject: Optional[str] = None):
        return subject.lower() if subject is not None else None

    @validator('phone_number')
    @classmethod
    def validate_phone(cls, subject: Optional[str] = None):
        if subject is not None:
            assert validators.is_phone(subject), 'Malformed phone number'
        return subject


class EmployeePosition(str, Enum):
    BARANGAY_CAPTAIN = 'Barangay Captain'
    SECRETARY = 'Secretary'
    SK_CHAIRMAN = 'SK Chairman'
    SK_KAGAWAD = 'SK Kagawad'
    SK_MEMBER = 'SK Member'
    LUPON = 'Lupon'


class Employee(SQLModelTimestamped, table=True):
    __tablename__: str = 'employees'

    id: Optional[int] = Field(default=None, primary_key=True)
    position: EmployeePosition = Field(
        ..., sa_column=Column(EnumField(EmployeePosition))
    )
    user_id: int = Field(..., foreign_key='users.id')
    user: User = Relationship(back_populates='employment')
    start: date
    until: Optional[date] = None
    reason_for_leaving: Optional[str] = None


class ReadEmployee(SQLModel):
    id: int
    position: EmployeePosition
    user: User
    start: date
    until: Optional[date]
    reason_for_leaving: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]


class DocumentType(str, Enum):
    BARANGAY_PERMIT = 'barangay permit'
    BARANGAY_CERTIFICATE = 'barangay certificate'
    CERTIFICATE_OF_OWNERSHIP = 'certificate of ownership'
    CERTIFICATE_OF_SINGLENESS = 'certificate of singleness'
    CERTIFICATE_OF_CUTTING_TREES = 'certificate of cutting trees'


class DocumentRequestStatus(str, Enum):
    PENDING = 'pending'
    APPROVED = 'approved'
    CANCELED = 'canceled'
    FORWARDED = 'forwarded'


class DocumentRequest(SQLModelTimestamped, table=True):
    __tablename__: str = 'document_requests'

    id: Optional[int] = Field(default=None, primary_key=True)
    type_: DocumentType = Field(
        ..., sa_column=Column('type', EnumField(DocumentType))
    )
    status: DocumentRequestStatus = Field(
        ..., sa_column=Column(EnumField(DocumentRequestStatus))
    )
    user: User = Relationship(back_populates='document_requests')
    user_id: int = Field(..., foreign_key='users.id')
    purok: Purok = Relationship(back_populates='document_requests')
    purok_id: int = Field(..., foreign_key='puroks.id')


class ReadDocumentRequest(SQLModel):
    id: int
    type_: DocumentType = Field(..., alias='type')
    status: DocumentRequest
    user: User
    purok: Purok
    created_at: datetime
    updated_at: Optional[datetime]


PaginatedT = TypeVar(
    'PaginatedT',
    ReadPurok,
    ReadHousehold,
    ReadUser,
    ReadEmployee
)


class Paginated(GenericModel, Generic[PaginatedT]):
    rows: list[PaginatedT]
    total_rows: int
    page: int
    page_size: int
    has_next: bool
    search: Optional[str]


def create_tables():
    SQLModel.metadata.create_all(engine)
