import time

from fastapi import APIRouter
from .models import ShowStudent, StudentCreate, ShowProject, ProjectCreate, StudentUpdate, ProjectUpdate
from typing import List
from fastapi import Depends
from db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from db.dals import StudentDAL, ProjectDAL
from pydantic import parse_obj_as

student_router = APIRouter()
project_router = APIRouter()


async def create_new_student(body: StudentCreate, db) -> ShowStudent:
    async with db as session:
        async with session.begin():
            user_dal = StudentDAL(session)
            user = await user_dal.create_user(
                name=body.name,
                surname=body.surname,
                email=body.email,
                project_id=body.project_id
            )
            return ShowStudent(
                student_id=user.student_id,
                name=user.name,
                surname=user.surname,
                email=user.email,
                project_id=user.project_id,
            )


async def patch_user(student: StudentUpdate, db) -> ShowStudent:
    async with db as session:
        async with session.begin():
            student_dal = StudentDAL(session)
            student = await student_dal.patch_user(student)
            return ShowStudent(
                student_id=student.student_id,
                name=student.name,
                surname=student.surname,
                email=student.email,
                project_id=student.project_id,
            )


async def select_all_users(db) -> List[ShowStudent]:
    async with db as session:
        async with session.begin():
            user_dal = StudentDAL(session)
            students = await user_dal.select_users()
            print(parse_obj_as(List[ShowStudent], students))
            return parse_obj_as(List[ShowStudent], students)


async def delete_student(student_id: str, db) -> object:
    async with db as session:
        async with session.begin():
            student_dal = StudentDAL(session)
            deleted_id = await student_dal.delete_student(student_id)
            if deleted_id:
                return deleted_id
            else:
                return {'error': 'no rows to delete'}


async def create_new_project(body: ProjectCreate, db) -> ProjectCreate:
    async with db as session:
        async with session.begin():
            project_dal = ProjectDAL(session)
            project = await project_dal.create_project(
                name=body.name,
                description=body.description,
                max_capacity=body.max_capacity,
            )
            print(project)
            return ProjectCreate(
                name=project.name,
                description=project.description,
                max_capacity=project.max_capacity,
            )


async def patch_project(project: ProjectUpdate, db) -> ShowProject:
    async with db as session:
        async with session.begin():
            project_dal = ProjectDAL(session)
            project = await project_dal.patch_project(project)
            return parse_obj_as(ShowProject, project)


async def select_all_projects(db) -> List[ShowProject]:
    async with db as session:
        async with session.begin():
            project_dal = ProjectDAL(session)
            projects = await project_dal.select_projects()
            return parse_obj_as(List[ShowProject], projects)


async def delete_project(project_id: object, db) -> object:
    async with db as session:
        async with session.begin():
            project_dal = ProjectDAL(session)
            deleted_id = await project_dal.delete_project(project_id)
            if deleted_id:
                return deleted_id
            else:
                return {'error': 'no rows to delete'}


@student_router.post("/", response_model=ShowStudent)
async def create_student(body: StudentCreate, db: AsyncSession = Depends(get_db)) -> ShowStudent:
    return await create_new_student(body, db)


@student_router.patch("/", response_model=ShowStudent)
async def patch_std(body: StudentUpdate, db: AsyncSession = Depends(get_db)) -> ShowStudent:
    project = await patch_user(body, db)
    return parse_obj_as(ShowStudent, project)


@student_router.get("/", response_model=List[ShowStudent])
async def show_students(db: AsyncSession = Depends(get_db)) -> List[ShowStudent]:
    return await select_all_users(db)


@student_router.delete("/", response_model=object)
async def del_student(student_id: str, db: AsyncSession = Depends(get_db)) -> object:
    return await delete_student(student_id, db)


@project_router.post("/", response_model=ProjectCreate)
async def create_project(body: ProjectCreate, db: AsyncSession = Depends(get_db)) -> ProjectCreate:
    return await create_new_project(body, db)


@project_router.patch("/", response_model=ShowProject)
async def patch_pr(body: ProjectUpdate, db: AsyncSession = Depends(get_db)) -> object:
    return await patch_project(body, db)


@project_router.delete("/", response_model=object)
async def del_project(project_id: int, db: AsyncSession = Depends(get_db)) -> object:
    return await delete_project(project_id, db)


@project_router.get("/", response_model=List[ShowProject])
async def show_projects(db: AsyncSession = Depends(get_db)) -> List[ShowProject]:
    return await select_all_projects(db)
