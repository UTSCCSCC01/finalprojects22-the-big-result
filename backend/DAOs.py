from models import db, Customer, Professional, Admin, Services


from sqlalchemy.orm import joinedload
from sqlalchemy.orm import Query

class CustomersDAO:

    def getCustomerOnID(self, id: int):
        return Customer.query.filter_by(id=id).first()

    def getCustomerOnUsername(self, username: str):
        return Customer.query.filter_by(username=username).first()

    def getAllCustomers(self):
        return Customer.query.all()

    def isValidLoginWithUsername(self, username:str, password: str) -> bool:
        queryRes = Customer.query.filter_by(username=username,password=password).first()
        return queryRes is not None

    def addCustomer(self,firstname: str, lastname: str, email: str, username: str, password: str):
        newCustomer = Customer(firstName=firstname,lastName=lastname, email=email, username=username, password= password)
        db.session.add(newCustomer)
        db.session.commit()

    def userNameExists(self, username:str) -> bool:
        queryRes = Customer.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Customer.query.filter_by(email=email).first()
        return queryRes is not None



class ProfessionalsDAO:

    def getProfessionalOnId(self, id: int):
        return Professional.query.filter_by(id=id).first()

    def getProfessionalOnUsername(self, username: str):
        return Professional.query.filter_by(username=username).first()

    def getAllProfessionals(self):
        return Professional.query.all()

    def isValidLoginWithUsername(self, username:str, password: str) -> bool:
        queryRes = Professional.query.filter_by(username=username,password=password).first()
        return queryRes is not None

    def addProfessional(self,firstname: str, lastname: str, email: str, username: str, password: str, description = None, rating=0,averageCost=None):
        newProfess = Professional(firstName=firstname,lastName=lastname, email=email, username=username, password= password,description=description, ratings=rating,averageCost=averageCost)
        db.session.add(newProfess)
        db.session.commit()

    def userNameExists(self, username:str) -> bool:
        queryRes = Professional.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Professional.query.filter_by(email=email).first()
        return queryRes is not None


class AdminDAO:

    def getAdminlOnId(self, id: int):
        return Admin.query.filter_by(id=id).first()

    def getAdminOnUsername(self, username: str):
        return Admin.query.filter_by(username=username).first()

    def getAllAdmins(self):
        return Admin.query.all()

    def isValidLoginWithUsername(self, username:str, password: str) -> bool:
        queryRes = Admin.query.filter_by(username=username,password=password).first()
        return queryRes is not None

    def addAdmin(self,firstname: str, lastname: str, email: str, username: str, password: str):
        newAdmin = Admin(firstName=firstname,lastName=lastname, email=email, username=username, password= password)
        db.session.add(newAdmin)
        db.session.commit()

    def userNameExists(self, username:str) -> bool:
        queryRes = Admin.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Admin.query.filter_by(email=email).first()
        return queryRes is not None



class ServicesDAO:

    def getAllServices(self):
        return Services.query.all()

    def getServiceByName(self,servicename:str):
        return Services.query.filter_by(serviceName=servicename).first()

    def addService(self,servicename,description):
        newService = Services(serviceName=servicename,description=description)
        db.session.add(newService)
        db.session.commit()

class ProfessionalServicesDAO:

    def getServiceFromUserID(self, id):
        return db.engine.execute(f"SELECT * FROM Professional P INNER JOIN ProfessionalServices PS on P.id = PS.professionalID INNER JOIN Services S on PS.serviceName = S.serviceName WHERE p.id={id}").fetchall()

def runQueries():
    custDao = CustomersDAO()

    profDao = ProfessionalsDAO()

    serviceDao = ServicesDAO()

    profServDao = ProfessionalServicesDAO()
    print(profDao.getProfessionalOnId(13).location)

    # serviceDao.addService("nails","Making your nails look really pretty!")

    # print(profDao.addProfessional("Brian","Harrington","Brian@utoronto.ca","brianTheMan","helloworld","I do CMS stuff"))
    # print(custDao.getCustomerOnUsername("custoneuser"))
    # print(custDao.getCustomerOnUsername("large_cox"))
    # print(custDao.isValidLoginWithUsername("large_cox","password"))
    # print(custDao.addCustomer("Anya","Taflovich","anya@utoronto.ca","anyaTaf","haskellgood"))
    # print(custDao.addCustomer("Anya1","Taflovich2","anya@utoronto.ca","anyaTaf3","haskellgooddy"))

    # print( Customer.query.filter_by(firstName='Mike').first())