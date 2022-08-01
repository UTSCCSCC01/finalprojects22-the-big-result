import os
from typing import List

# from caching import cache
import boto3

from models import db, Customer, Professional, Admin, Services, ProfessionalServices, Reviews, AvailabilitiesRec, \
    AvailabilitiesNonRec, DayOfWeek, IsAvailable, Bookings, Status, Settings, User

from datetime import time, date, datetime, timezone
from sqlalchemy import select, update, delete, values
from sqlalchemy import func


class UserDAO:

    def getAllUsers(self) -> List[User]:
        return User.query.all()

    def getUserById(self, id: int) -> User:
        return User.query.filter_by(id=id).first()



class CustomersDAO:

    def getCustomerOnID(self, id: int) -> Customer:
        return Customer.query.filter_by(id=id).first()
        
    def getCustomerOnUsername(self, username: str) -> Customer:
        return Customer.query.filter_by(username=username).first()

    def getAllCustomers(self) -> List[Customer]:
        return Customer.query.all()

    def isValidLoginWithUsername(self, username: str, password: str) -> bool:
        queryRes = Customer.query.filter_by(username=username, password=password).first()
        return queryRes is not None

    def addCustomer(self, firstname: str, lastname: str, email: str, username: str, password: str) -> None:
        newCustomer = Customer(firstName=firstname, lastName=lastname, email=email, username=username,
                               password=password)
        db.session.add(newCustomer)
        db.session.commit()

    def userNameExists(self, username: str) -> bool:
        queryRes = Customer.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Customer.query.filter_by(email=email).first()
        return queryRes is not None


class ProfessionalsDAO:

    def getProfessionalOnId(self, id: int) -> Professional:
        return Professional.query.filter_by(id=id).first()

    def getProfessionalOnUsername(self, username: str) -> Professional:
        return Professional.query.filter_by(username=username).first()

    def getProfessionalOnName(self, firstName: str, lastName: str) -> Professional:
        return Professional.query.filter_by(firstName=firstName, lastName=lastName).first()

    def getAllProfessionals(self) -> List[Professional]:
        return Professional.query.all()

    def isValidLoginWithUsername(self, username: str, password: str) -> bool:
        queryRes = Professional.query.filter_by(username=username, password=password).first()
        return queryRes is not None

    #Added pending status when signing up as professional
    def addProfessional(self, firstname: str, lastname: str, email: str, username: str, password: str, description=None,
                        rating=0, averageCost=0, location="Toronto, Ontario") -> None:
        newProfess = Professional(firstName=firstname, lastName=lastname, email=email, username=username,
                                  password=password, description=description, ratings=rating,
                                  averageCost=averageCost, location=location, status="PENDING")
        db.session.add(newProfess)
        db.session.commit()

    def userNameExists(self, username: str) -> bool:
        queryRes = Professional.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Professional.query.filter_by(email=email).first()
        return queryRes is not None

    def getAllServicesForProfessional(self, id: int) -> List[Services]:
        return Professional.query.filter_by(id=id).first().services

    def getAllReviewsForProfesional(self, id: int) -> List[Reviews]:
        return Professional.query.filter_by(id=id).first().reviews

    def getFirstNReviewsForProfesional(self, id: int, numReviews=3) -> List[Reviews]:
        return Professional.query.filter_by(id=id).first().reviews.limit(numReviews).all()
    
    def getProfessionalsByLocation(self,location:str) -> List[Professional]:
        return Professional.query.filter_by(location=location, status="APPROVED").all()

    def getLowestAveragePrice(self) -> float:
        return db.session.query(func.min(Professional.averageCost)).filter_by(status="APPROVED").scalar()

    def getHighestAveragePrice(self) ->float:
        return db.session.query(func.max(Professional.averageCost)).filter_by(status="APPROVED").scalar()

    def getProfessionalsWithMinRating(self, minRating: float) -> List[Professional]:
        return Professional.query.filter(Professional.ratings >= minRating, Professional.status == "APPROVED").all()

    # This is price inclusive
    def getProfessionalsByAvgPriceRange(self, minPrice: float, maxPrice: float) -> List[Professional]:
        return Professional.query.filter(Professional.averageCost.between(minPrice,maxPrice), Professional.status == "APPROVED").all()

    def updateDescForProfessional(self, id: int, description: str):
        professional = Professional.query.filter_by(id=id).first()
        professional.description = description
        db.session.commit()

    def updateProfessionalStatus(self, id:int, status:str):
        professional = Professional.query.filter_by(id=id).first()
        professional.status = status
        db.session.commit()

    def getProfessionalsByStatus(self, status: str) -> List[Professional]:
        return Professional.query.filter_by(status=status).all()

    def getAllUniqueLocations(self) ->List[str]:
        return [locationTuple[0] for locationTuple in Professional.query.filter_by(status="APPROVED").with_entities(Professional.location).distinct().all()]


class AdminDAO:

    def getAdminlOnId(self, id: int) -> Admin:
        return Admin.query.filter_by(id=id).first()

    def getAdminOnUsername(self, username: str) -> Admin:
        return Admin.query.filter_by(username=username).first()

    def getAllAdmins(self) -> List[Admin]:
        return Admin.query.all()

    def isValidLoginWithUsername(self, username: str, password: str) -> bool:
        queryRes = Admin.query.filter_by(username=username, password=password).first()
        return queryRes is not None

    def addAdmin(self, firstname: str, lastname: str, email: str, username: str, password: str) -> None:
        newAdmin = Admin(firstName=firstname, lastName=lastname, email=email, username=username, password=password)
        db.session.add(newAdmin)
        db.session.commit()

    def userNameExists(self, username: str) -> bool:
        queryRes = Admin.query.filter_by(username=username).first()
        return queryRes is not None

    def emailExists(self, email: str) -> bool:
        queryRes = Admin.query.filter_by(email=email).first()
        return queryRes is not None


class ServicesDAO:
    # @cache.cached(timeout=50, key_prefix='all-serivces')
    def getAllServices(self) -> List[Services]:
        return Services.query.all()

    def serviceExists(self, serviceName: str) -> bool:
        queryRes = Services.query.filter_by(serviceName=serviceName).first()
        return queryRes is not None

    def getServiceByName(self, servicename: str) -> Services:
        return Services.query.filter(serviceName=servicename).first()

    def addService(self, servicename, description) -> None:
        newService = Services(serviceName=servicename, description=description)
        db.session.add(newService)
        db.session.commit()


    def getProfessionalsForService(self, servicename: str) -> List[Professional]:
        return Professional.query.filter_by(status="APPROVED").join(ProfessionalServices).filter_by(serviceName=servicename).all()

class ProfessionalServicesDAO:

    def getProfessionalsByServicePrice(self,servicename: str, minPrice: float, maxPrice: float) -> List[Professional]:
        return ProfessionalServices.query.filter(ProfessionalServices.serviceName == servicename,
                                                 ProfessionalServices.defaultPrice.between(minPrice,maxPrice)).all()

    def checkServiceProvidedByProfessional(self, id: int, serviceName: str) -> bool:
        return ProfessionalServices.query.filter(ProfessionalServices.professionalID == id,
                                                 ProfessionalServices.serviceName == serviceName).all() != []

    def addServiceProvidedByProfessional(self, id: int, serviceName: str, price: float, description: str) -> None:
        new = ProfessionalServices(professionalID=id,
                                          serviceName=serviceName, defaultPrice=price, serviceDescription=description)
        db.session.add(new)
        db.session.commit()
    
    def removeServiceProvidedByProfessional(self, id: int, serviceName: str) -> None:
        service = ProfessionalServices.query.filter(ProfessionalServices.professionalID == id,
                                                 ProfessionalServices.serviceName == serviceName).first()
        db.session.delete(service)
        db.session.commit()
    
    # NOTE (A): confirm...
    def getDescriptionOfServicesByProfessional(self, id: int, serviceName: str) -> List[str]:
        service = ProfessionalServices.query.filter(ProfessionalServices.professionalID == id,
                                                 ProfessionalServices.serviceName == serviceName).first()
        return service.serviceDescription
    
    def getDefaultPriceOfServiceByProfessional(self, id: int, serviceName: str) -> List[str]:
        service = ProfessionalServices.query.filter(ProfessionalServices.professionalID == id,
                                                 ProfessionalServices.serviceName == serviceName).first()
        return service.defaultPrice
                                                 
    # def getServiceFromUserID(self, id):
    #     return db.engine.execute(
    #         f"SELECT * FROM Professional P INNER JOIN ProfessionalServices PS on P.id = PS.professionalID INNER JOIN Services S on PS.serviceName = S.serviceName WHERE p.id={id}").fetchall()


class AvailabilitiesRecDAO:

    def getAvailabilitiesFromProfID(self, profID: int) -> List[AvailabilitiesRec]:
        return AvailabilitiesRec.query.filter_by(professionalID=profID).all()

    def getAvailabilitiesFromProfIDAndDay(self, profID: int, day: DayOfWeek) -> List[AvailabilitiesRec]:
        return AvailabilitiesRec.query.filter_by(professionalID=profID, dayOfWeek=day.value).all()

    def addAvailability(self, profID: int, day: DayOfWeek, startTime: time, endTime: time):
        newAvailability = AvailabilitiesRec(professionalID=profID, dayOfWeek=day.value, startTime=startTime,
                                            endTime=endTime)
        db.session.add(newAvailability)
        db.session.commit()

    def deleteAvailabilitiesForProfIDAndDay(self, profID: int, day: DayOfWeek):
        AvailabilitiesRec.query.filter_by(professionalID=profID, dayOfWeek=day.value).delete()
        db.session.commit()

    def deleteAllAvailabilitiesForProfID(self, profID: int):
        AvailabilitiesRec.query.filter_by(professionalID=profID).delete()
        db.session.commit()


class AvailabilitiesNonRecDAO:

    def getAvailabilitiesFromProfID(self, profID: int) -> List[AvailabilitiesNonRec]:
        return AvailabilitiesNonRec.query.filter_by(professionalID=profID).all()

    def getAvailabilitiesFromProfIDAndDate(self, profID: int, date: date) -> List[AvailabilitiesNonRec]:
        return AvailabilitiesNonRec.query.filter_by(professionalID=profID, date=date).all()

    def addAvailability(self, profID: int, date: date, startTime: time, endTime: time, isAvailable: IsAvailable):
        newAvailability = AvailabilitiesNonRec(professionalID=profID, date=date, startTime=startTime,
                                               endTime=endTime, isAvailable=isAvailable.value)
        db.session.add(newAvailability)
        db.session.commit()
        
    def addListOfAvailabilities(self,availabilities: List[AvailabilitiesNonRec]):
        for avail in availabilities:
            if avail.isAvailable != 0 and avail.isAvailable != 1:
                raise ValueError("isAvailable field must either be 0 or 1")
            db.session.add(avail)
        db.session.commit()

    def deleteAvailabilitiesForProfIDAndDay(self, profID: int, date: date):
        AvailabilitiesNonRec.query.filter_by(professionalID=profID, date=date).delete()
        db.session.commit()

    def deleteAllAvailabilitiesForProfID(self, profID: int):
        AvailabilitiesNonRec.query.filter_by(professionalID=profID).delete()
        db.session.commit()

class BookingsDAO:

    def getBookingByID(self, id: int) -> Bookings:
        return Bookings.query.filter_by(id=id).first()

    def getBookingsFromProfID(self, profID: int) -> List[Bookings]:
        return Bookings.query.filter_by(professionalID=profID).all()

    def cancelBookingsFromProfId(self, profID:int):
        bookings = Bookings.query.filter(Bookings.professionalID==profID, ((Bookings.status==Status.BOOKED) | (Bookings.status==Status.RESCHEDULED))).all()
        for booking in bookings:
            booking.status = Status.CANCELLED
        db.session.commit()

    def getBookingsFromCustID(self, custID: int) -> List[Bookings]:
        return Bookings.query.filter_by(customerID=custID).all()

    def getBookingsFromStatusForProf(self,profID: id, status: Status) -> List[Bookings]:
        return Bookings.query.filter_by(professionalID=profID, status=status).order_by(Bookings.beginServiceDateTime).all()

    def getBookingsFromStatusForCust(self,custID: id, status: Status) -> List[Bookings]:
        return Bookings.query.filter_by(customerID=custID, status=status).order_by(Bookings.beginServiceDateTime).all()

    def resolveBooking(self, id: int):
        booking = Bookings.query.filter_by(id=id).first()
        booking.status = Status.RESOLVED
        db.session.commit()


    def addBooking(self,custID:int, profID: int,beginServDateTime: datetime, endServDateTime: datetime,
                   location: str, status: Status, price: float, serviceName: str ,
                   specialInstructions = ""):
        newBooking = Bookings(customerID=custID,professionalID=profID,
                              beginServiceDateTime=beginServDateTime,endServiceDateTime=endServDateTime,
                              location=location,status=status,price=price,serviceName=serviceName,
                              specialInstructions=specialInstructions)

        db.session.add(newBooking)
        db.session.commit()

    def setBookingAsRescheduled(self, id: int):
        booking = Bookings.query.filter_by(id=id).first()
        booking.status = Status.RESCHEDULED
        db.session.commit()

    # # NOTE: assume booking time is fixed to an hour so add availability for an hour
    # def cancelBooking(self, id: int):
    #   booking = Bookings.query.filter_by(id=id).first()
    #   booking.status = Status.CANCELLED
    #   db.session.commit()

    #   # add cancelled booking as non recurring availability
    #   profId = booking.professionalID
    #   date = booking.beginServiceDateTime.date()
    #   startTime = booking.beginServiceDateTime.time()
    #   endTime = booking.endServiceDateTime.time()
    #   newAvailability = AvailabilitiesNonRec(professionalID=profId, date=date,startTime=startTime,endTime=endTime, isAvailable=1)
    #   db.session.add(newAvailability)
    #   db.session.commit()

    def getNonCancelledBookingsFromProfIDinRangeWithStatusIncl(self, profID: int, rangeStart: datetime, rangeEnd: datetime):
      return [booking for booking in db.session.query(Bookings)
                                       .filter(Bookings.professionalID==profID, Bookings.status!=Status.CANCELLED)
                                       .filter(rangeStart < Bookings.endServiceDateTime)
                                       .filter(Bookings.beginServiceDateTime < rangeEnd)]

    def getBookingsFromProfIDinRangeWithStatusIncl2(self, profID: int, rangeStart: datetime, rangeEnd: datetime, status: Status) -> List[Bookings]:
        return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.endServiceDateTime)\
            .filter(Bookings.beginServiceDateTime < rangeEnd).filter(Bookings.status == Status.BOOKED or Bookings.status == Status.RESOLVED).all()

    # NOTE: assume booking time is fixed to an hour so add availability for an hour
    def cancelBooking(self, id: int):
      booking = Bookings.query.filter_by(id=id).first()
      booking.status = Status.CANCELLED
      db.session.commit()

      # add cancelled booking as non recurring availability
      profId = booking.professionalID
      date = booking.beginServiceDateTime.date()
      startTime = booking.beginServiceDateTime.time()
      endTime = booking.endServiceDateTime.time()
      newAvailability = AvailabilitiesNonRec(professionalID=profId, date=date,startTime=startTime,endTime=endTime, isAvailable=1)
      db.session.add(newAvailability)
      db.session.commit()

    def getNonCancelledBookingsFromProfIDinRangeWithStatusIncl(self, profID: int, rangeStart: datetime, rangeEnd: datetime):
      return [booking for booking in db.session.query(Bookings)
                                       .filter(Bookings.professionalID==profID, Bookings.status!=Status.CANCELLED)
                                       .filter(rangeStart < Bookings.endServiceDateTime)
                                       .filter(Bookings.beginServiceDateTime < rangeEnd)]

    # def getBookingsFromProfIDinRangeWithStatusIncl(self, profID: int, rangeStart: datetime, rangeEnd: datetime, status: Status) -> List[Bookings]:
    #     return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.endServiceDateTime)\
    #         .filter(Bookings.beginServiceDateTime < rangeEnd).filter(Bookings.status == status).all()
    
    def getBookingsFromProfIDinRangeWithStatusIncl(self, profID: int, rangeStart: datetime, rangeEnd: datetime, status: Status, invertStatus=False) -> List[Bookings]:
        if invertStatus:
          return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.endServiceDateTime)\
            .filter(Bookings.beginServiceDateTime < rangeEnd).filter(Bookings.status != status).all()
        return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.endServiceDateTime)\
            .filter(Bookings.beginServiceDateTime < rangeEnd).filter(Bookings.status == status).all()
    
    # def getBookingsFromProfIDinRangeWithStatusesIncl(self, profID: int, rangeStart: datetime, rangeEnd: datetime, statusLst: List[Status]) -> List[Bookings]:
    #   print(statusLst)
    #   return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.endServiceDateTime)\
    #         .filter(Bookings.beginServiceDateTime < rangeEnd).filter(Bookings.status in statusLst).all()


    def getBookingsFromProfIDinRangeIncl(self, profID: int, rangeStart: datetime, rangeEnd: datetime) -> List[Bookings]:
        return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.endServiceDateTime)\
            .filter(Bookings.beginServiceDateTime < rangeEnd).all()

    def getBookingsFromProfIDinRangeExcl(self, profID: int, rangeStart: datetime, rangeEnd: datetime) -> List[Bookings]:
        return Bookings.query.filter_by(professionalID=profID).filter(rangeStart < Bookings.beginServiceDateTime) \
            .filter(Bookings.endServiceDateTime < rangeEnd).all()

class ReviewsDAO:

    def addReview(self, bookingID: int, profID: int, custID: int, description: str, rating: int) -> None:
        newReview = Reviews(bookingID=bookingID, professionalID=profID, customerID=custID,
                            description=description, ratings=rating)
        db.session.add(newReview)
        db.session.commit()
        
class SettingsDAO:

    def getAllSettings(self) -> List[Settings]:
        return Settings.query.all()

    def getSettingsByUserID(self, userID: int) -> Settings:
        return Settings.query.filter_by(id=userID).first()

class PicturesDAO:

    DEFAULT_IMAGE_KEY = 'default_image.jpeg'
    BUCKET_NAME = "csc-c01-pictures"

    def __photoKey(self,userID: int) -> str:
        return str(userID) + ".jpg"

    def __init__(self):
        self.client = boto3.client('s3'
                                   ,aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
                                   aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))

    def getProfilePictureByUserID(self,userID:int):
        test_image = self.client.get_object(Bucket=self.BUCKET_NAME, Key=self.__photoKey(userID))
        # print(test_image)
        return test_image['Body']


    def uploadProfilePictureByUserID(self,profilePicFile,userID:int):
        self.client.upload_fileobj(profilePicFile, self.BUCKET_NAME, self.__photoKey(userID))

    def uploadDefaultPictureByUserID(self, userID:int):
        copySource = {
            'Bucket': self.BUCKET_NAME,
            'Key': self.DEFAULT_IMAGE_KEY
        }
        self.client.copy_object(Bucket=self.BUCKET_NAME,Key=self.__photoKey(userID),CopySource=copySource)




def runDAOQueries():
    custDao = CustomersDAO()

    profDao = ProfessionalsDAO()

    bookingsDao = BookingsDAO()
    # print(bookingsDao.cancelBookingsFromProfId(40))

    # print(profDao.getProfessionalsByLocation("toronto"))


    # print(profDao.getAllServicesForProfessional(36))
    # print(profDao.getFirstNReviewsForProfesional(36,1))
    # print(profDao.getLowestAveragePrice())
    # print(profDao.getHighestAveragePrice())
    # print(profDao.getProvidersWithMinRating(2))
    # print(profDao.getProfessionalsByAvgPriceRange(0,70))


    serviceDao = ServicesDAO()

    # print(serviceDao.getProfessionalsForService("landscaping")[0])

    # print(serviceDao.getAllServices())

    # prof = profDao.getProfessionalOnId(36)

    profServDao = ProfessionalServicesDAO()
    # print(profServDao.getServiceFromUserID(6))
    # print(profServDao.getProfessionalsByServicePrice("hairstyling",70,100))

    # serviceDao.addService("nails","Making your nails look really pretty!")

    # print(profDao.addProfessional("Brian","Harrington","Brian@utoronto.ca","brianTheMan","helloworld","I do CMS stuff"))
    # print(custDao.getCustomerOnUsername("custoneuser"))
    # print(custDao.getCustomerOnUsername("large_cox"))
    # print(custDao.isValidLoginWithUsername("large_cox","password"))
    # print(custDao.addCustomer("Anya","Taflovich","anya@utoronto.ca","anyaTaf","haskellgood"))
    # print(custDao.addCustomer("Anya1","Taflovich2","anya@utoronto.ca","anyaTaf3","haskellgooddy"))

    # print( Customer.query.filter_by(firstName='Mike').first())

    availRecDao = AvailabilitiesRecDAO()

    # print(availRecDao.getAvailabilitiesFromProfAndDayID(profID=36, day=DayOfWeek.TUESDAY))
    # availRecDao.addAvailability(36,DayOfWeek.TUESDAY,startTime=time(hour=13,minute=15),endTime=time(hour=15,minute=15))
    # availRecDao.deleteAvailabilitiesForProfIDAndDay(36,DayOfWeek.TUESDAY)

    availNonRecDao = AvailabilitiesNonRecDAO()

    # availNonRecList = [AvailabilitiesNonRec(professionalID=40,date=date(2022,6,12),startTime=time(9,14),endTime=time(11,14),isAvailable=1),AvailabilitiesNonRec(professionalID=40,date=date(2022,6,12),startTime=time(15,14),endTime=time(19,14),isAvailable=1)]
    # print(availNonRecDao.getAvailabilitiesFromProfIDAndDate(36, date(year=2022, month=6, day=24)))
    # availNonRecDao.addAvailability(40,date(2022,5,12),startTime=time(12,5),endTime=time(15,5),isAvailable=IsAvailable.true.value)
    # availNonRecDao.addListOfAvailabilities(availNonRecList)

    # availNonRecDao.deleteAvailabilitiesForProfIDAndDay(40,date=date(2022,5,12))

    bookingsDao = BookingsDAO()
    # print(bookingsDao.getBookingsFromProfIDinRangeIncl(40,datetime(2022,5,26),datetime(2022,5,28)))
    # print(bookingsDao.getBookingsFromProfIDinRangeExcl(40,datetime(2022,5,26),datetime(2022,5,28)))

    # print(type(bookingsDao.getBookingsFromProfID(36)[0].endServiceDateTime))
    # bookingsDao.addBooking(35,40,datetime(2022,6,27,13,30),datetime(2022,6,27,15,30),"UTSC Campus",Status.BOOKED,80.5,"makeup",specialInstructions="Go fast!!!")

    # print(bookingsDao.getBookingsFromCustID(34))
    # print(bookingsDao.getBookingsFromStatusForProf(36, Status.BOOKED))

    # print(serviceDao.getProfessionalsForService("agaga"))

    # print(bookingsDao.getBookingsFromCustID(34)[0].review)
    # print(db.session.query(Bookings).filter(Bookings.professionalID==36, Bookings.status!="CANCELLED"))
    # print()
    # for row in db.session.query(Bookings).filter(Bookings.professionalID=="36", Bookings.status!="CANCELLED"):
    #   print (row.professionalID)
    # locations = profDao.getAllUniqueLocations()
    # print(locations)
    # picDao = PicturesDAO()
    # picDao.uploadDefaultPictureByUserID(150)
    pass



