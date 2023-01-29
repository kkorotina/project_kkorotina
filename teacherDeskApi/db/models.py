from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, String, Integer, ForeignKey, update as sqlalchemy_update
from sqlalchemy.dialects.postgresql import UUID
import uuid
Base = declarative_base()


class Student(Base):
    __tablename__ = 'students'

    student_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.project_id", ondelete='cascade'), nullable=True)


class Projects(Base):
    __tablename__ = 'projects'

    project_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    max_capacity = Column(Integer, nullable=False)
    students = relationship("Student")
