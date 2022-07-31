# Metadata
The meeting was held on June 19, 2022 on Discord at 10pm.

## Attendance & Participation
Ananya Poddar, Fariha Fyrooz, Vishal Deb Sahoo, Ava Oveisi, Amy Yao, Carlos Huang, Noor Nasri

All 7 team members were present and participated actively.

# Sprint Goals
- **Goal 1:** Refactor existing code and create a workflow, so that users can utilize all features seamlessly.
- **Goal 2:**  Elevate the features from sprint 3 by making them more robust, such as allowing users to upload photos in their reviews.
- **Goal 3:** Implement some “Delighters” such as receiving emails when booking times change or being able to deactivate your account.

# User Stories for Sprint 4
- As Jonathan (a customer), I would like to be able to set my profile picture. **[THEB-109]**
- As Martha (a service provider), I want to receive an email when my bookings change, so that I don't miss any bookings. **[THEB-111]**
- As Kritika (an owner), I want to view and accept sign up requests from service providers, so that I can vet a service provider before giving them access. **[THEB-24]**
- As Martha (a service provider), I want to deactivate my account, so that I can opt out of being part of Amorr or offering services. **[THEB-35]**
- As Jonathan (a customer), I want to select my location to get providers at a given distance to me. **[THEB-112]**
- As a developer, I would like to refine the workflow and update how information is displayed, so that I can improve quality. **[THEB-113]**
- As a developer, I would like to refactor existing features, so that I can improve efficiency. **[THEB-114]**

# Task Breakdown

1. THEB-109 (User can upload photos) - Carlos

*Subtasks*: Be able to add profile pictures

2. THEB-111 (Email users when bookings change) - Noor

*Subtasks*: Setup Gmail API, Send emails to new service providers to ensure emails are properly linked, Notify service providers when a customer books a time with them, Notify service providers when a customer changes their booking with them, Notify service providers when a customer cancels a booking with them


3. THEB-24 (Kritika accepts sign-up requests) - Vishal

*Subtasks*: Create front-end for admin login and viewing pending sign up requests, Create back-end for admin login and returning pending sign up requests, Add functionality for approving and denying a pending sign up request.

4. THEB-35 (Users can deactivate) - Ananya

*Subtasks*: Create frontend for account deactivation, Create backend endpoint to deactivate account, Update existing endpoints to fetch approved providers, cancel upcoming for deactivated professionals

5. THEB-112 (User can provide their location) - Ava

*Subtasks*: Find and set up an API to autocomplete location, Add autocomplete location filter for service providers, Add location autocomplete field on provider signup page

6. THEB-113 (Refactor frontend) - Fariha

*Subtasks*: All buttons should work and lead to the correct page, See My Review displays review in a modal, myProfile should show editable profile for providers

7. THEB-114 (Refactor backend) - Amy

*Subtasks*: Providers lists get sorted alphabetically by full name, Bookings lists get sorted by date (and time)

