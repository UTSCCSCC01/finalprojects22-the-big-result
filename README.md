# Amorr

Amorr solves the problem of the demand of beauty services at home. It's a web app that allows customers to schedule sessions with beauty professionals, all from the comfort of their own home. 


## Motivation
People want the convenience of having beauty services at their own homes. Some people have scheduling conflicts, or a lack of transportation, which makes it difficult to easily go into a beauty salon for these services. 

## Installation
This project uses Typescript (NodeJS) and Python3, and so it is assumed that you have already installed both of these languages already. Also ensure that you have NPM and Pip already installed. If not, please do so before installing anything else.

We will need to install the frontend, backend, and database drivers. We will also need to set a few environment variables. To begin, clone the repository by running:
```bash
git clone https://github.com/UTSCCSCC01/finalprojects22-the-big-result.git
```

### Frontend
Navigate into the frontend directory and cd into the `react-app` subdirectory. Then run `npm install` to install all the necessary JS packages. You may need to install npm and node if you have not done so already.

### Backend
Navigate into the backend directory, and create a [virtual environment](https://docs.python.org/3/library/venv.html) called `myenv`. Then [activate](https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments) the virtual environment. Next, install all the dependencies with the following:
```bash
pip install -r requirements.txt
```
### Database
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
We will try to stick to as many of the standardized software engineering practices as possible. 

### Branches
We will be using the main branch, development branch, and several feature branches. Whenever a feature branch is ready to be merged into the development branch, we will submit a PR, which would then be subjected to a code review and manual tests to ensure that it works as expected. At the end of each sprint, we will merge our development branch into our main branch. 
