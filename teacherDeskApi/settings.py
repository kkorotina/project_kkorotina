from envparse import Env

env = Env()

REAL_DATABASE_URL = env.str(
    "REAL_DATABASE_URL",
    default='postgresql+asyncpg://postgres:sendnudes@localhost:5432/postgres'
)