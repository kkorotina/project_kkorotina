import uuid
import re
from typing import List
from fastapi import HTTPException
from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import validator
from typing import Optional

LETTER_MATCH_PATTERN = re.compile(r"^[а-яА-Яa-zA-Z\-]+$")


class TunedModel(BaseModel):
    class Config:
        """tells pydantic to convert even non dict obj to json"""

        orm_mode = True


class ShowStudent(TunedModel):
    student_id: uuid.UUID
    name: str
    surname: str
    email: EmailStr
    project_id: int


class StudentUpdate(BaseModel):
    student_id: uuid.UUID
    name: Optional[str] = None
    surname: Optional[str] = None
    email: Optional[EmailStr] = None
    project_id: Optional[int] = None


class StudentCreate(BaseModel):
    name: str
    surname: str
    email: EmailStr
    project_id: int

    @validator("name")
    def validate_name(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Name should contains only letters"
            )
        return value

    @validator("surname")
    def validate_surname(cls, value):
        if not LETTER_MATCH_PATTERN.match(value):
            raise HTTPException(
                status_code=422, detail="Surname should contains only letters"
            )
        return value


class ShowProject(TunedModel):
    project_id: int
    name: str
    description: str
    max_capacity: int
    students: List[ShowStudent] = []


class ProjectUpdate(TunedModel):
    project_id: int
    name: Optional[str]
    description: Optional[str]
    max_capacity: Optional[int]
    students: Optional[List[ShowStudent]] = []


class ProjectCreate(BaseModel):
    name: str
    description: str
    max_capacity: int

