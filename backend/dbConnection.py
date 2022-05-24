from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

def sampleQuery():
    load_dotenv("./config/.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    engine = create_engine(f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server")

    return {"myquery": str(engine.execute("SELECT * from Persons").fetchall())}