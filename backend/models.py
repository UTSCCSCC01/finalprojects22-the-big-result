import enum

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,date
from sqlalchemy import  Enum
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
    BOOKED = 1
    CANCELLED = 2
    IN_PROGRESS = 3
    RESOLVED = 4
    RESCHEDULED = 5

professionalServices = db.Table('ProfessionalServices',
    db.Column('professionalID', db.Integer, db.ForeignKey('Professional.id'), primary_key=True),
    db.Column('serviceName', db.String, db.ForeignKey('Services.serviceName'), primary_key=True)
)


# class ProfessionalServices(db.Model):
#     __tablename__ = "ProfessionalServices"
#     professionalID = db.Column(db.Integer, db.ForeignKey("Professional.id"),primary_key=True)
#     serviceName = db.Column(db.String(200), db.ForeignKey("Services.serviceName"),primary_key=True)



class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True) #This autoincrements
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    userType = db.Column(db.String(50))

    __mapper_args__ = {
        "polymorphic_identity": "BaseUser",
        "polymorphic_on": userType,
    }

class Professional(User):
    __tablename__ = "Professional"
    id = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)
    description = db.Column(db.Text, nullable=True)
    ratings = db.Column(db.Float,nullable=False, default=0)
    averageCost = db.Column(db.Float)

    services = relationship("Services",secondary=professionalServices,lazy='subquery',back_populates="professionals")

    reviews = relationship('Reviews',backref="professional",lazy='dynamic')



    __mapper_args__ = {
        "polymorphic_identity": "Professional",
    }

class Customer(User):
    __tablename__ = "Customer"
    id = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "Customer",
    }

class Admin(User):
    __tablename__ = "Admin"
    id = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "Admin",
    }

class Settings(db.Model):
    __tablename__ = "Settings"
    id = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)
    billing = db.Column(db.Text, nullable=True)



class Reviews(db.Model):
    __tablename__ = "Reviews"
    id = db.Column(db.Integer, primary_key=True)
    bookingID = db.Column(db.Integer, db.ForeignKey("Bookings.id"))
    professionalID = db.Column(db.Integer, db.ForeignKey("Professional.id"))
    customerID = db.Column(db.Integer, db.ForeignKey("Customer.id"))
    serviceName = db.Column(db.String(200), db.ForeignKey("Services.serviceName"))

    description = db.Column(db.Text, nullable=False)
    ratings = db.Column(db.Integer,db.CheckConstraint("ratings >= 1 AND ratings <= 5"), nullable=False)

class Pictures(db.Model):
    __tablename__ = "Pictures"
    id = db.Column(db.Integer, primary_key=True)
    reviewID = db.Column(db.Integer, db.ForeignKey("Reviews.id"))
    pictureLink = db.Column(db.String(500),nullable=True)

class Calendar(db.Model):
    __tablename__ = "Calendar"
    userID = db.Column(db.Integer, db.ForeignKey("User.id"), primary_key=True)
    googleAccount = db.Column(db.String(500), nullable=False)
    accountKey = db.Column(db.String(200), nullable=False)

class Bookings(db.Model):
    __tablename__ = "Bookings"
    id = db.Column(db.Integer, primary_key=True)
    customerID = db.Column(db.Integer, db.ForeignKey("Customer.id"))
    professionalID = db.Column(db.Integer, db.ForeignKey("Professional.id"))

    serviceTime = db.Column(db.Time, default=date(2001, 5, 26))
    location = db.Column(db.String(1000), nullable=True)
    status = db.Column(Enum(Status), nullable=False,default=Status.BOOKED)
    price = db.Column(db.Float,nullable=False)
    bookingTime = db.Column(db.Time,default=datetime.utcnow)
    specialInstructions = db.Column(db.String(500),nullable=True)


class Services(db.Model):
    __tablename__ = "Services"
    serviceName = db.Column(db.String(200),primary_key=True,unique=True)
    description = db.Column(db.String(500), nullable=False)

    professionals = db.relationship("Professional",secondary=professionalServices, back_populates="services")




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
    print(Professional.query.filter_by(id=36).first().reviews)
    # print(Services.query.filter_by(serviceName="landscaping").first().professionals[0].firstName)
    # print("Running database queries")
    # print(date(2019, 4, 13))
    # print(Manager.query.all())
    pass

def createTables():
    db.create_all()

