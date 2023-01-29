from sqlalchemy.ext.asyncio import AsyncSession
from .models import Student, Projects
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy import select, delete


class StudentDAL:
    """Data Access Layer for operating user info"""

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_user(
            self, name: str, surname: str, email: str, project_id: int
    ) -> Student:
        new_student = Student(
            name=name,
            surname=surname,
            email=email,
            project_id=project_id
        )
        self.db_session.add(new_student)
        await self.db_session.flush()
        return new_student

    async def select_users(self):
        result = await self.db_session.execute(select(Student))
        return result.scalars().all()

    async def patch_user(self, student):
        db_student = await self.db_session.execute(select(Student).filter(Student.student_id == student.student_id))
        db_student = db_student.scalar()
        if db_student is None:
            return None

        for var, value in vars(student).items():
            setattr(db_student, var, value) if value else None

        self.db_session.add(db_student)
        await self.db_session.flush()
        return db_student

    async def delete_student(self, student_id):
        result = await self.db_session.execute(delete(Student).where(Student.student_id == student_id).returning(Student.student_id))
        await self.db_session.flush()
        return {'student_id': result.one()[0]}


class ProjectDAL:
    """Data Access Layer for operating user info"""

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_project(
            self, name: str, description: str, max_capacity: str
    ) -> Projects:
        new_project = Projects(
            name=name,
            description=description,
            max_capacity=max_capacity,
        )
        self.db_session.add(new_project)
        await self.db_session.flush()
        return new_project

    async def select_projects(self):
        result = await self.db_session.execute(select(Projects).options(selectinload(Projects.students)))
        return result.scalars().all()

    async def delete_project(self, project_id):
        result = await self.db_session.execute(delete(Projects).where(Projects.project_id == project_id).returning(Projects.project_id))
        await self.db_session.flush()
        return {'project_id': result.one()[0]}

    async def patch_project(self, project):
        db_project = await self.db_session.execute(select(Projects).options(joinedload(Projects.students)).filter(Projects.project_id == project.project_id))
        db_project = db_project.scalar()
        if db_project is None:
            return None

        for var, value in vars(project).items():
            setattr(db_project, var, value) if value else None

        self.db_session.add(db_project)
        await self.db_session.flush()
        return db_project

