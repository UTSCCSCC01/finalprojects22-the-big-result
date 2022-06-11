## Metadata:
The meeting was held on May 31, 2022 on Discord from 9pm to 10:00pm.

## Attendance & Participation: 

Ananya Poddar, Fariha Fyrooz, Vishal Deb Sahoo, Ava Oveisi, Amy Yao, Carlos Huang, Noor Nasri

All 7 team members were present and participated actively.

## Sprint Goals

- **Goal 1:** Complete setup of database and project setup for all team members.
- **Goal 2:** Work towards features related to basic requirements (mocking data if required) such as signup, login and viewing various services, providers, and provider profiles. Specifically address as many high-priority items from Kritika, the product owner, as possible.
- **Goal 3:** Understand and implement backend to frontend communication

## User Stories For Sprint 1

1. As Jonathan (a user), I want to be able to sign up, so that I can use the product. **[THEB-1]**
2. As Jonathon (a user), I want to be able to log in, so that I can see information relevant to me. **[THEB-2]**
3. As Lamia (a customer), I want to see a list of services offered, so that I can choose the service I want. **[THEB-3]**
4. As Lamia (a customer), I want to see a list of service providers, so that I can choose the service provider I want. **[THEB-4]**
5. As Jonathan (a customer), I want to see a service provider’s profile, so that I can learn more about who they are. **[THEB-5]**
6. As a developer, I want to design the system so that I can learn how the system interacts with the environment and how to structure my code **[THEB-30]**
7. As a developer, I want to learn SQL and SQLAlchemy to setup databases **[THEB-36]**

## Task Breakdown

1. **THEB-1 (SignUp)** - Ava, Ananya

*Subtasks*:
Set up frontend that allows toggle between service provider and customer signup
Set up API endpoint to sign up as a customer
Set up API endpoint to sign up as a service provider 

2. **THEB-2 (Login)** - Ava, Ananya

*Subtasks*:
Set up frontend for user login
Set up logged-in API endpoint that needs JWT authentication

3. **THEB-3 (List of Services)** - Fariha

*Subtasks*:
Create frontend page to display the list
Setup API endpoint for retrieving a list of services

4. **THEB-4 (List of Service Providers)** - Vishal, Noor

*Subtasks*:
Create frontend page for selecting service providers 
Setup API endpoint for retrieving service provider data

5. **THEB-5 (Provider Profile)** - Amy, Carlos

*Subtasks*:
Create frontend page for profile display 
Setup API endpoint for retrieving specific service provider profile data

6. **THEB-30 (System Design)** - Noor, Carlos, Amy

*Subtasks*:
Database modelling
Completing CRC cards
Software Architecture Diagram

7. **THEB-36 (Learning SQL and SQLAlchemy)** - Carlos

*Subtasks*:
SQL and SQLAlchemy: Create tables in databases
SQL and SQLAlchemy: Start Creating Python SQLAlchemy DAOs
Documentation (Sprint1.md, RPM.md) - Primarily Ananya, Ava, but everyone

## Team Capacity

Each story was estimated on a multiplicative scale from 1-10, where a 1 is expected to take anywhere between 2-3 hours of work per developer, a 2 is expected to take between 4-6 hours, and so on. The team capacity is 19 points, equivalent to approximately 48 hours.

## Spikes

We had a hard time understanding how asynchronous functionality works in React, and how to communicate with the backend to fetch and update data in the frontend. We took time to learn about hooks, especially useState and useEffect, and how to use axios.

We didn’t know how to separate out code both in the frontend and backend so we learned how to create blueprints for flask and tried to follow best practices for components and views in the frontend.

