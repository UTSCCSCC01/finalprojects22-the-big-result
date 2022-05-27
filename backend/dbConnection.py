from sqlalchemy import create_engine
from dotenv import load_dotenv
import os




# app.config['SQLALCHEMY_DATABASE_URI'] = ''
# server = "my-database-csc-c01.database.windows.net"
# database = "csc-c01-db"
# username = "masterUsername"
# password = "cscc01isawesome!!"
#
# driver = '{ODBC Driver 17 for SQL Server}'
#
# odbc_str = 'DRIVER='+driver+';SERVER='+server+';PORT=1433;UID='+username+';DATABASE='+ database + ';PWD='+ password
# connect_str = 'mssql+pyodbc:///?odbc_connect=' + urllib.parse.quote(odbc_str)
#
# print (connect_str)

# engine = create_engine("mssql+pyodbc://masterUsername:cscc01isawesome!!@my-database-csc-c01.database.windows.net:1433/csc-c01-db?driver=ODBC+Driver+17+for+SQL+Server")

# engine = create_engine(connect_str)



# db = SQLAlchemy(app)

def sampleQuery():

    load_dotenv(f".{os.sep}config{os.sep}.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    engine = create_engine(f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server")

    return {"myquery": str(engine.execute("SELECT * from Persons").fetchall())}