# Amorr

Amorr solves the problem of the demand of beauty services at home. It is a web interface where users can easily and securely connect with service providers near them and get on-demand services such as beauty, hair, and landscaping, at their doorstep. This user-friendly platform will eliminate commuting issues for users, help them choose their service preference, track their service in real-time, and review their experience. The web app will also help businesses expand their reach by supporting a new way of service delivery.

## Motivation

People want the convenience of having beauty services at their own homes. Some people have scheduling conflicts, or a lack of transportation, which makes it difficult to easily go into a beauty salon for these services.

## Installation

This project uses Typescript (NodeJS) and Python3, and so it is assumed that you have already installed both of these languages already. Also ensure that you have NPM and Pip already installed. If not, please do so before installing anything else.

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

We are using ODBC SQL driver 17 for connecting to the remote database via our python app. [Install this database driver here](https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16). This might be subject to change in the future.

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
