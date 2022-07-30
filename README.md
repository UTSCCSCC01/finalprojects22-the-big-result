# Amorr

Amorr solves the problem of the demand of beauty services at home. It is a web interface where users can easily and securely connect with service providers near them and get on-demand services such as beauty, hair, and landscaping, at their doorstep. This user-friendly platform will eliminate commuting issues for users, help them choose their service preference, track their service in real-time, and review their experience. The web app will also help businesses expand their reach by supporting a new way of service delivery.

## Motivation

People want the convenience of having beauty services at their own homes. Some people have scheduling conflicts, or a lack of transportation, which makes it difficult to easily go into a beauty salon for these services.

## Installation

This project uses Javascript (NodeJS) and Python3, and so it is assumed that you have already installed both of these languages already. Also ensure that you have NPM and Pip already installed. If not, please do so before installing anything else.

We will need to install the frontend, backend, and database drivers. We will also need to set a few environment variables. To begin, clone the repository by running:

```bash
git clone https://github.com/UTSCCSCC01/finalprojects22-the-big-result.git
```

### Frontend Setup

Navigate into the frontend directory and cd into the `react-app` subdirectory. You may need to install npm and node if you have not done so already. Install all necessary JS packages and start the frontend with the following:

```bash
npm install
npm start
```

### Backend Setup

Navigate into the backend directory, and create a [virtual environment](https://docs.python.org/3/library/venv.html) called `myenv`. Then [activate](https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments) the virtual environment. Next, install all the dependencies and start the backend with the following:

```bash
pip install -r requirements.txt
python app.py
```

### Database Setup

We are using Azure SQL, which is essentially MS SQL in the cloud. We will need to have a password to connect to the database, and this will be stored in a `.env` file.

Within the `backend` directory, create a new directory called `config`, and a file within that called `.env`. This is how you will be setting your environment variables.

Open up `.env` and add the following configuration:

```
DATABASE_PASSWORD=mydatabasepassword
```

Replace `mydatabasepassword` with the actual value of the database password.

#### Database driver installation

We are using ODBC SQL driver 17 for connecting to the remote database via our python app. [Install this database driver here](https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16). 

## Software frameworks/libraries/tools used
#### Flask
We're using Flask is a backend web server framework for python. It provides
many useful features, like enabling CORS, caching, integration with SQLAlchemy ORM, and allows for modularity 
with blueprints. [Documentation found here](https://flask.palletsprojects.com/en/2.1.x/)

#### ReactJS
We're using ReactJS as the frontend framework our web application. As the name suggests, it runs on javascript. It divides everything into components,
which allows for easy reuse of components on multiple pages. It's currently the world's most popular frontend framework.
[Documentation found here](https://reactjs.org/docs/getting-started.html)

#### SQLAlchemy
SQLAlchemy is used as an object-relational mapper, which maps the SQL table(s) into python class objects.
 It has a variety of helpful features, like automatically getting relationship data and being able to be passed around
 as an object. We're specifically using flask-sqlalchemy, which helps simplify a few things like query sessions. 
 Documentation for [Flask-SQLAlchemy can be found here](https://flask-sqlalchemy.palletsprojects.com/en/2.x/). 

#### Material UI
Material UI is our CSS library that we're using. Specifically, we're using react-material-ui, which helps
simplify much of the frontend styling by providing built-in components. [Documentation found here](https://mui.com/getting-started/usage/)

#### Gmail API
Gmail API is a library from the Google Cloud API. While the Google Cloud API provides a vast library, our usage is strictly using the https://www.googleapis.com/auth/gmail.modify endpoint.
It is used to send email notifications to service providers, informing them of changes to their account or bookings. 
The API requires OATH2 setup, and our backend utilizes environment variables to find the credentials.json and updates tokens on launch.
This allows us to easily send emails by calling the gmailAPI class on our backend. [Gmail API Documentation for endpoint usage.](https://developers.google.com/gmail/api/guides/sending)

#### React Places Autocomplete
We're using react-places-autocomplete powered by Google Maps Places Library as a react component to build customized autocomplete dropdowns for service locations. [Documentation found here](https://www.npmjs.com/package/react-places-autocomplete)

## Contribution

#### Do you use git flow?

Yes.

#### What do you name your branches?

Based on git flow standards, the main branch will contain the official releases at the end of each sprint. The develop branch will be used to work on and integrate features.

To contribute a new feature, create a feature branch from the develop branch following the convention: feature/descriptive-name-of-feature

#### Do you use github issues or another ticketing website?

Jira will be primarily used as a ticketing website. Github Issues can be used as a secondary tool.

#### Do you use pull requests?

Yes. Submit a descriptive pull request to merge your new branch into develop. It will be subjected to a code review and manual tests by at least 2 people to ensure that it works as expected. At the end of each sprint, the develop branch will be merged into our main branch.
