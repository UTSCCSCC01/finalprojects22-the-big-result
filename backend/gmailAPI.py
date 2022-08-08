import base64
from email.message import EmailMessage

import os.path
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from DAOs import BookingsDAO, UserDAO
from email.mime.text import MIMEText

bookingDAO = BookingsDAO()
userDAO = UserDAO()

SCOPES = ['https://www.googleapis.com/auth/gmail.modify']
creds = None

def verifyToken():
    global creds

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(os.environ['gmailAPICredentials'], SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

def sendEmail(recieverEmail, subject, plainMessage):
    global creds
    verifyToken()

    try:
        service = build('gmail', 'v1', credentials=creds)
        #message = EmailMessage()

        #message.set_content(plainMessage)
        message = MIMEText(plainMessage, 'plain')

        message['To'] = recieverEmail
        message['From'] = 'amorrmailingservice@gmail.com'
        message['Subject'] = subject

        # encoded message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        create_message = {
            'raw': encoded_message
        }

        service.users().messages().send(userId="me", body=create_message).execute()

    except HttpError as error:
        print('An error occurred: ', error)

def signupProvider(email, name):

    sendEmail(email, "Welcome to Amorr!",
    """Hello, {0}
Thank you for creating an account and welcome to Amorr. We look forward to helping you grow your business, now and in the years to come!

Please give our approval team 1-2 business days to verify your details. You will receive an email once you've been approved!
If you did not create this account, please contact us so that we may deactivate the account.

Thank you,
Amorr Public Relations
    """.format(name)
    )

def approveProvider(providerID):
    provider = userDAO.getUserById(providerID)
    sendEmail(provider.email, "Your account has been approved!",
    """Hello, {0}
Thank you for waiting. You have been approved as a service provider on Amorr, and can now login. 

Once again, we welcome you to the Amorr family! 

Thank you,
Amorr Public Relations
    """.format(provider.firstName + " " + provider.lastName)
    )

def newBooking(customer_id, professional_id, startDateTime, endDateTime, location, service, instructions):
    provider = userDAO.getUserById(professional_id)
    customer = userDAO.getUserById(customer_id)

    sendEmail(provider.email, "New Booking!",
    """Hello, {0}
We are pleased to inform you that {1} has booked you for the following service: {2}!

    Date: {3}
    Time: {4}
    Location: {5}
    Duration: {6}
    Extra Instructions: {7}

Thank you,
Amorr Public Relations
    """.format(
        provider.firstName + " " + provider.lastName,
        customer.firstName + " " + customer.lastName,
        service, 
        startDateTime.date().isoformat(),
        startDateTime.strftime("%H:%M:%S"),
        location,
        str((endDateTime - startDateTime).total_seconds() // 60) + " minutes",
        instructions
        )
    )

def rescheduleBooking(oldBooking_id, customer_id, professional_id, 
        startDateTime, endDateTime, location, instructions):
    old_booking = bookingDAO.getBookingByID(oldBooking_id)
    provider = userDAO.getUserById(professional_id)
    customer = userDAO.getUserById(customer_id)

    sendEmail(provider.email, "Your booking has been rescheduled",
    """Hello, {0}
Your booking with {1} on {2} has been rescheduled. Please ensure these details work for you:

    Date: {3}
    Time: {4}
    Location: {5}
    Duration: {6}
    Extra Instructions: {7}

Thank you,
Amorr Public Relations
    """.format(
        provider.firstName + " " + provider.lastName,
        customer.firstName + " " + customer.lastName,
        str(old_booking.beginServiceDateTime), 
        startDateTime.date().isoformat(),
        startDateTime.strftime("%H:%M:%S"),
        location,
        str((endDateTime - startDateTime).total_seconds() // 60) + " minutes",
        instructions
        )
    )

def cancelBooking(bookingId):
    old_booking = bookingDAO.getBookingByID(bookingId)
    provider = userDAO.getUserById(old_booking.professionalID)
    customer = userDAO.getUserById(old_booking.customerID)

    sendEmail(provider.email, "Your booking has been cancelled",
    """Hello, {0}
{1} has cancelled their appointment on {2} with you.

Fortunately, there's still time for someone else to book that timeslot. We will notify you if there is a new booking!

Thank you,
Amorr Public Relations
    """.format(
        provider.firstName + " " + provider.lastName,
        customer.firstName + " " + customer.lastName,
        str(old_booking.beginServiceDateTime)
        )
    )
