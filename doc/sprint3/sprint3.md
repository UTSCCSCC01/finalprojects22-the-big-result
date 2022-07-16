# Metadata
The meeting was held on July 5, 2022 on Discord from 5pm - 6pm.

## Attendance & Participation
Ananya Poddar, Fariha Fyrooz, Vishal Deb Sahoo, Ava Oveisi, Amy Yao, Carlos Huang, Noor Nasri

All 7 team members were present and participated actively.

# Sprint Goals
- **Goal 1:** Refactor existing code and create a workflow, so that users can utilize all features seamlessly.
- **Goal 2:**  Elevate the features from sprint 2 by making them more robust, such as cancelling or rescheduling a booking and being able to see all reviews of a professional.
- **Goal 3:** Implement features that allow the user to input information, such as a user leaving a review and a professional editing their own profile.

# User Stories for Sprint 3
- As Jonathan (a customer), I want to see reviews of a service provider, so that I can learn more about the quality of their service. **[THEB-6]**
- As Jonathan (a customer), I want to cancel bookings, so that I can declare a change in my plans. **[THEB-13]**
- As Jonathan (a customer), I want to reschedule bookings, so that I can declare a change in my plans. **[THEB-14]**
- As Lamia (a customer), I want to review services I have received, so that I can help other potential customers. **[THEB-15]**
- As Martha (a user), I want to see my account/settings page, so that I can view my personal information. **[THEB-16]**
- As Martha (a service provider), I want to edit my own service profile, so that I can declare any changes to potential customers. **[THEB-18]**
- As a developer, I want to refactor existing code and create a workflow, so that users can utilize all features seamlessly. **[THEB-83]**

# Task Breakdown

1. THEB-6 (See All Reviews) - Fariha

*Subtasks*: Frontend of See All Reviews page, Backend endpoint for retrieving all reviews

2. THEB-13 (Cancel Bookings) - Ava

*Subtasks*: Setup backend for cancelling a booking, Update professional and customer frontend views to show the cancelled booking, 	
Add back the availability of professional for that cancelled booking slot
3. THEB-14 (Reschedule Bookings) - Noor

*Subtasks*: Design frontend page for rescheduling a booking, Create API endpoint for rescheduling a booking

4. THEB-15 (Customer Reviews Services) - Amy

*Subtasks*: Create DAO method for creating a review, Create backend endpoint for creating a review, Create frontend for creating a review

5. THEB-16 (User Account/Settings Page) - Carlos

*Subtasks*: Created DAO for user settings, created backend endpoint for getting the user settings, and frontend for the user settings. Added caching to the endpoint. 

6. THEB-18 (Professional Edits Service Profile) - Vishal

*Subtasks*: Create frontend to support editing of profile, Create backend endpoint to update profile, Create DAO methods necessary to update profile

7. THEB-83 (Refactor Existing Code) - Ananya, Everyone

*Subtasks*: Add caching, Create role-based protected routes, Modify/Add stuff to the DAOs and Models, Refactor all API request calls, Refactor jwt authorization methods for better security, automate checking access and refresh tokens, Automatically modify Status of bookings in the database based on date, Update sign up for providers to register description and information for each service provided.

# Team Capacity

Each story was estimated on a multiplicative scale from 1-10, where a 1 is expected to take anywhere between 2-3 hours of work per developer, a 2 is expected to take between 4-6 hours, and so on. The team capacity is 36 points, equivalent to approximately 90 hours.

## Spikes
- Everybody worked on refactoring the code we’ve written over the past 2 sprints to create a workflow, elevate a feature, or finish up small tasks. 

