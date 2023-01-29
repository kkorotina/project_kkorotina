import uvicorn
from fastapi import FastAPI
from fastapi.routing import APIRouter
from api.handlers import student_router, project_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Teacher Desk API')
main_api_router = APIRouter()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

main_api_router.include_router(student_router, prefix='/student', tags=['student'])
main_api_router.include_router(project_router, prefix='/project', tags=['project'])
app.include_router(main_api_router)

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)



