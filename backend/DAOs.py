from typing import List

from models import db, Customer, Professional, Admin, Services, professionalServices, Reviews


from sqlalchemy.orm import joinedload

class CustomersDAO:

    def getCustomerOnID(self, id: int) -> Customer:
        return Customer.query.filter_by(id=id).first()

    def getCustomerOnUsername(self, username: str) -> Customer:
        return Customer.query.filter_by(username=username).first()

    def getAllCustomers(self) -> List[Customer]:
        return Customer.query.all()

    def isValidLoginWithUsername(self, username:str, password: str) -> bool:
        queryRes = Customer.query.filter_by(username=username,password=password).first()
        return queryRes is not None

    def addCustomer(self,firstname: str, lastname: str, email: str, username: str, password: str) -> None:
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

    def getProfessionalOnId(self, id: int) -> Professional:
        return Professional.query.filter_by(id=id).first()

    def getProfessionalOnUsername(self, username: str) ->Professional:
        return Professional.query.filter_by(username=username).first()

    def getAllProfessionals(self) -> List[Professional]:
        return Professional.query.all()

    def isValidLoginWithUsername(self, username:str, password: str) -> bool:
        queryRes = Professional.query.filter_by(username=username,password=password).first()
        return queryRes is not None

    def addProfessional(self,firstname: str, lastname: str, email: str, username: str, password: str, description = None, rating=0,averageCost=None) -> None:
        newProfess = Professional(firstName=firstname,lastName=lastname, email=email, username=username, password= password,description=description, ratings=rating,averageCost=averageCost)
        db.session.add(newProfess)
        db.session.commit()

    def userNameExists(self, username:str) -> bool:
        queryRes = Professional.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Professional.query.filter_by(email=email).first()
        return queryRes is not None

    def getAllServicesForProfessional(self, id:int) -> List[Services]:
        return Professional.query.filter_by(id=id).first().services

    def getAllReviewsForProfesional(self,id:int) -> List[Reviews]:
        return Professional.query.filter_by(id=id).first().reviews

    def getFirstNReviewsForProfesional(self,id:int, numReviews = 3) -> List[Reviews]:
        return Professional.query.filter_by(id=id).first().reviews.limit(numReviews).all()


class AdminDAO:

    def getAdminlOnId(self, id: int) -> Admin:
        return Admin.query.filter_by(id=id).first()

    def getAdminOnUsername(self, username: str) -> Admin:
        return Admin.query.filter_by(username=username).first()

    def getAllAdmins(self) -> List[Admin]:
        return Admin.query.all()

    def isValidLoginWithUsername(self, username:str, password: str) -> bool:
        queryRes = Admin.query.filter_by(username=username,password=password).first()
        return queryRes is not None

    def addAdmin(self,firstname: str, lastname: str, email: str, username: str, password: str) -> None:
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

    def getAllServices(self) -> List[Services]:
        return Services.query.all()

    def getServiceByName(self,servicename:str) -> Services:
        return Services.query.filter(serviceName=servicename).first()

    def addService(self,servicename,description) -> None:
        newService = Services(serviceName=servicename,description=description)
        db.session.add(newService)
        db.session.commit()

    def getProfessionalsForService(self,servicename: str) -> List[Professional]:
        return Services.query.filter_by(serviceName=servicename).first().professionals


class ProfessionalServicesDAO:

    def getServiceFromUserID(self, id):
        return db.engine.execute(f"SELECT * FROM Professional P INNER JOIN ProfessionalServices PS on P.id = PS.professionalID INNER JOIN Services S on PS.serviceName = S.serviceName WHERE p.id={id}").fetchall()

def runDAOQueries():
    custDao = CustomersDAO()

    profDao = ProfessionalsDAO()
    # print(profDao.getAllServicesForProfessional(36))
    # print(profDao.getFirstNReviewsForProfesional(36,1))

    serviceDao = ServicesDAO()

    print(serviceDao.getProfessionalsForService("landscaping")[0])

    # print(serviceDao.getAllServices())



    prof = profDao.getProfessionalOnId(36)


    # profServDao = ProfessionalServicesDAO()
    # print(profServDao.getServiceFromUserID(6))

    # serviceDao.addService("nails","Making your nails look really pretty!")

    # print(profDao.addProfessional("Brian","Harrington","Brian@utoronto.ca","brianTheMan","helloworld","I do CMS stuff"))
    # print(custDao.getCustomerOnUsername("custoneuser"))
    # print(custDao.getCustomerOnUsername("large_cox"))
    # print(custDao.isValidLoginWithUsername("large_cox","password"))
    # print(custDao.addCustomer("Anya","Taflovich","anya@utoronto.ca","anyaTaf","haskellgood"))
    # print(custDao.addCustomer("Anya1","Taflovich2","anya@utoronto.ca","anyaTaf3","haskellgooddy"))

    # print( Customer.query.filter_by(firstName='Mike').first())