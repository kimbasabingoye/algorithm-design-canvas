import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


################################################
#           USER MODEL
################################################

# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(
        default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    canvases: list["Canvas"] = Relationship(
        back_populates="owner", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

################################################
#           CANVAS MODEL
################################################

# Shared properties


class CanvasBase(SQLModel):
    problem_name: str = Field(min_length=1, max_length=255)
    problem_url: str = Field(min_length=1, max_length=255)
    ideas: str | None
    constraints: str | None
    test_cases: str | None
    code: str | None


# Properties to receive on canvas creation
class CanvasCreate(CanvasBase):
    pass


# Properties to receive on canvas update
class CanvasUpdate(CanvasBase):
    problem_name: str | None = Field(
        default=None, min_length=1, max_length=255)
    problem_url: str | None = Field(default=None, min_length=1, max_length=255)


# Database model, database table inferred from class name
class Canvas(CanvasBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="canvases")


# Properties to return via API, id is always required
class CanvasPublic(CanvasBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class CanvasesPublic(SQLModel):
    data: list[CanvasPublic]
    count: int


################################################
#           Generic Models
################################################

# Generic message


class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
