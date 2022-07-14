import enum
from typing import List

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date, time
from sqlalchemy import Enum, func
from sqlalchemy.orm import relationship

db = SQLAlchemy()


# All the Testing stuff here!
# class TestUser(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     anotherCol = db.Column(db.Integer,nullable=True)
#
#     def __repr__(self):
#         return f'User({self.id}, {self.username}, {self.email}, {self.anotherCol})'
#
# class Employee(db.Model):
#     __tablename__ = "employee"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50))
#     type = db.Column(db.String(50))
#
#     __mapper_args__ = {
#         "polymorphic_identity": "employee",
#         "polymorphic_on": type,
#     }
#
# class Engineer(Employee):
#     __tablename__ = "engineer"
#     id = db.Column(db.Integer, db.ForeignKey("employee.id"), primary_key=True)
#     engineer_name = db.Column(db.String(30))
#
#     __mapper_args__ = {
#         "polymorphic_identity": "engineer",
#     }
#
#
# class Manager(Employee):
#     __tablename__ = "manager"
#     id = db.Column(db.Integer, db.ForeignKey("employee.id"), primary_key=True)
#     manager_name = db.Column(db.String(30))
#
#     __mapper_args__ = {
#         "polymorphic_identity": "manager",
#     }

# Actual database objects here

class Status(enum.Enum):
    BOOKED = "BOOKED"
    CANCELLED = "CANCELLED"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    RESCHEDULED = "RESCHEDULED"


class DayOfWeek(enum.Enum):
    SUNDAY = 0
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6


class IsAvailable(enum.Enum):
    false = 0
    true = 1


professionalServices = db.Table('ProfessionalServices',
                                db.Column('professionalID', db.Integer, db.ForeignKey('Professional.id'),
                                          primary_key=True),
                                db.Column('serviceName', db.String, db.ForeignKey('Services.serviceName'),
                                          primary_key=True)
                                )


class ProfessionalServices(db.Model):
    __tablename__ = "ProfessionalServices"

    professionalID: int = db.Column(db.Integer, db.ForeignKey("Professional.id"), primary_key=True)
    serviceName: str = db.Column(db.String(200), db.ForeignKey("Services.serviceName"), primary_key=True)
    defaultPrice: float = db.Column(db.Float, default=0)
    serviceDescription: str = db.Column(db.String(200), default='')

    __table_args__ = {'extend_existing': True}


class User(db.Model):
    __tablename__ = "User"
    id: int = db.Column(db.Integer, primary_key=True)  # This autoincrements
    firstName: str = db.Column(db.String(40), nullable=False)
    lastName: str = db.Column(db.String(100), nullable=False)
    email: str = db.Column(db.String(120), unique=True, nullable=False)
    username: str = db.Column(db.String(80), unique=True, nullable=False)
    password: str = db.Column(db.String(100), nullable=False)

    userType: str = db.Column(db.String(50))

    __mapper_args__ = {
        "polymorphic_identity": "BaseUser",
        "polymorphic_on": userType,
    }


class Professional(User):
    __tablename__ = "Professional"
    id: int = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)
    description: str = db.Column(db.Text, nullable=True)
    ratings: float = db.Column(db.Float, nullable=False, default=0)
    averageCost: float = db.Column(db.Float)
    location: str = db.Column(db.String(500),default= "UTSC")

    # List of services
    services: List = db.relationship("Services", secondary=professionalServices, lazy='subquery', back_populates="professionals")

    # List of reviews
    reviews: List = db.relationship('Reviews', back_populates="professional", lazy='dynamic')

    availabilitiesRec = db.relationship('AvailabilitiesRec',back_populates='professional')
    availabilitiesNonRec = db.relationship('AvailabilitiesNonRec',back_populates='professional')

    def getFirstNReviews(self, numReviews=3):
        return self.reviews.limit(numReviews).all()

    __mapper_args__ = {
        "polymorphic_identity": "Professional",
    }


class Customer(User):
    __tablename__ = "Customer"
    id: int = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)

    # List of bookings
    bookings = db.relationship('Bookings',back_populates='customer',lazy=True)

    __mapper_args__ = {
        "polymorphic_identity": "Customer",
    }


class Admin(User):
    __tablename__ = "Admin"

    id: int = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "Admin",
    }


class Settings(db.Model):
    __tablename__ = "Settings"
    id: int = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)
    billing: str = db.Column(db.Text, nullable=True)
    profilePicLink: str = db.Column(db.String(300), nullable=True, default="https://picsum.photos/100")


class Reviews(db.Model):
    __tablename__ = "Reviews"
    id: int = db.Column(db.Integer, primary_key=True)
    bookingID: int = db.Column(db.Integer, db.ForeignKey("Bookings.id"))
    professionalID: int = db.Column(db.Integer, db.ForeignKey("Professional.id"))
    customerID: int = db.Column(db.Integer, db.ForeignKey("Customer.id"))

    description: str = db.Column(db.Text, nullable=False)
    ratings: int = db.Column(db.Integer, db.CheckConstraint("ratings >= 1 AND ratings <= 5"), nullable=False)

    booking = db.relationship('Bookings', back_populates='review')
    professional: Professional = db.relationship('Professional',back_populates='reviews')


class Pictures(db.Model):
    __tablename__ = "Pictures"
    id: int = db.Column(db.Integer, primary_key=True)
    reviewID: int = db.Column(db.Integer, db.ForeignKey("Reviews.id"))
    pictureLink: str = db.Column(db.String(500), nullable=True)


class Calendar(db.Model):
    __tablename__ = "Calendar"
    userID: int = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)
    googleAccount: str = db.Column(db.String(500), nullable=False)
    accountKey: str = db.Column(db.String(200), nullable=False)


class Bookings(db.Model):
    __tablename__ = "Bookings"
    id: int = db.Column(db.Integer, primary_key=True)
    customerID: int = db.Column(db.Integer, db.ForeignKey("Customer.id"))
    professionalID: int = db.Column(db.Integer, db.ForeignKey("Professional.id"))

    beginServiceDateTime: datetime = db.Column(db.DateTime, default=datetime(2001, 5, 26))
    endServiceDateTime: datetime = db.Column(db.DateTime, default=datetime(2001, 5, 26))
    location: str = db.Column(db.String(1000), nullable=True)
    status: Status = db.Column(Enum(Status), nullable=False, default=Status.BOOKED)
    price: float = db.Column(db.Float, nullable=False)
    bookingDateTime: datetime = db.Column(db.DateTime, default=datetime.today())
    specialInstructions: str = db.Column(db.String(500), nullable=True)
    serviceName: str = db.Column(db.String(200), db.ForeignKey("Services.serviceName"))

    # review: Reviews  # This works because of the backref param in the Reviews ORM class. EDIT: Don't need anymore !!!
    # Using back_populates instead!!!
    review: Reviews = db.relationship('Reviews',back_populates='booking', uselist=False)

    customer: Customer = db.relationship('Customer',back_populates='bookings',lazy=True)


class Services(db.Model):
    __tablename__ = "Services"
    serviceName: str = db.Column(db.String(200), primary_key=True, unique=True)
    description: str = db.Column(db.String(500), nullable=False)

    professionals: List[Professional] = db.relationship("Professional", secondary=professionalServices, back_populates="services")


class AvailabilitiesRec(db.Model):
    __tablename__ = "AvailabilitiesRec"
    id: int = db.Column(db.Integer, primary_key=True)
    professionalID: int = db.Column(db.Integer, db.ForeignKey("Professional.id"))
    dayOfWeek: int = db.Column(db.Integer)
    startTime: time = db.Column(db.Time)
    endTime: time = db.Column(db.Time)

    professional: Professional = db.relationship('Professional',back_populates='availabilitiesRec')



class AvailabilitiesNonRec(db.Model):
    __tablename__ = "AvailabilitiesNonRec"
    id: int = db.Column(db.Integer, primary_key=True)
    professionalID: int = db.Column(db.Integer, db.ForeignKey("Professional.id"))
    date: date = db.Column(db.Date, nullable=False)
    startTime: time = db.Column(db.Time, nullable=False)
    endTime: time = db.Column(db.Time, nullable=False)
    isAvailable: int = db.Column(db.Integer, nullable=False)

    professional: Professional = relationship('Professional',back_populates='availabilitiesNonRec')


def runDBQueries():
    # poggers = TestUser(username='poggers', email='pog@example.com')
    # db.session.add(poggers)
    # db.session.commit()
    # print(TestUser.query.all())
    # createTables()
    # sampleUSer = Customer(firstName="Mike", lastName="Coxlong", email="mikecox@gmail.com",username="large_cox")
    # db.session.add(sampleUSer)
    # db.session.commit()

    # sampleService = Services("Personal trainer", "Makes you more fit with exercise!")
    #
    # db.session.add(sampleService)
    # db.session.commit()
    # print(Services.query.all())
    # print(Professional.query.filter_by(id=36).first().reviews)
    # print(Services.query.filter_by(serviceName="landscaping").first().professionals[0].username)
    # currService = Services.query.filter_by(serviceName="landscaping").first()
    # print(currService.description)
    # print(currService.professionals[0].username)

    # currProfessional = Professional.query.filter_by(id=36)
    # currProfessional.description
    # currProfessional.services

    # print(Bookings.query.all()[0].beginServiceTime)

    # print("Running database queries")
    # print(date(2019, 4, 13))
    # print(Manager.query.all())

    # print(Reviews.query.filter_by(id=4).first().booking.location)
    # print(Customer.query.filter_by(id=34).first().bookings[0].specialInstructions)

    # print(DayOfWeek(5))
    # avail = AvailabilitiesRec.query.first()
    # print(avail.professionalID)
    # print(avail.dayOfWeek)
    # print(avail.startTime)
    # print(avail.endTime)
    # print(avail.professional.firstName)

    #
    # availNonRec = AvailabilitiesNonRec.query.first()
    # print(availNonRec.professionalID)
    # print(availNonRec.date)
    # print(availNonRec.startTime)
    # print(availNonRec.endTime)
    # print(availNonRec.isAvailable)
    # print(availNonRec.professional.firstName)

    # print(Professional.query.all()[0].reviews)
    # print(Professional.query.all()[0].services)
    #
    # print(Reviews.query.all()[0].professional)

    # print(Customer.query.first().bookings)
    # print(Bookings.query.first().customer)

    # print(Bookings.query.first().review)
    # print(Reviews.query.first().booking)

    # print(AvailabilitiesRec.query.first().professional)
    # print(Professional.query.first().availabilitiesRec)

    # print(AvailabilitiesNonRec.query.first().professional)

    # start_time: time = Professional.query.first().availabilitiesNonRec[1].startTime
    # print(type(start_time))

    # print(isinstance(Professional.query.first().services, List))

    prof36: Professional = Professional.query.filter_by(id=36).first()
    print(prof36.getFirstNReviews(3))
    pass


def createTables():
    db.create_all()
