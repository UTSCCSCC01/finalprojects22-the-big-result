# Metadata
The meeting was held on June 13, 2022 on Discord from 9:45pm to 10:45pm.

## Attendance & Participation
Ananya Poddar, Fariha Fyrooz, Vishal Deb Sahoo, Ava Oveisi, Amy Yao, Carlos Huang, Noor Nasri

All 7 team members were present and participated actively.


# Sprint Goals
- **Goal 1:** Finish or improve sprint 1 tasks, such as making the frontend more consistent and aesthetically pleasing and finish implementing the DAOs
- **Goal 2:** Elevate the basic features from sprint 1 by making them more robust, such as introducing filtering instead of simply displaying all services or service providers.
- **Goal 3:** Implement many of the features related to booking, such as seeing available times, the ability to book, and past/upcoming bookings. 


# User Stories for Sprint 2
- As Lamia (a customer), I want to view available times, so that I can schedule a service. **[THEB-7]**
- As Lamia (a customer), I want to book a service, so that I can receive the service. **[THEB-8]**
- As Martha (a service provider), I want to declare my availability, so that potential customers can schedule bookings. **[THEB-21]**
- As Jonathan (a customer), I want to filter service providers by types of services provided, ratings, and cost, so that I can find the best fit for me. **[THEB-9]**
- As Lamia (a customer), I want to see all my current and previous service bookings, so that I can track my activity. **[THEB-12]**
- As Martha (a service provider), I want to see my upcoming bookings, so that I can attend them. **[THEB-17]**
- As Jonathan (a user), I want to be able to visit the site and see a landing page and navbar so that I can get a glimpse of what the website is about and navigate it. **[THEB-33]**
- As a developer, I want to continue implementing the DAOs and associated object classes for the database **[THEB-53]**
- As a developer, I want to refactor the frontend to be more visually appealing **[THEB-56]**


# Task Breakdown

1. THEB-7 (View times to schedule) - Ava, Noor

*Subtasks*: Create API endpoint for getting a specific professional's availabilities, design frontend page for a customer to see professional availabilities

2. THEB-8 (Book a service) - Ava, Carlos

*Subtasks*: Add booking functionality to the frontend page with the professional's availabilities, setup API endpoint for booking a service

3. THEB-21 (Declare professional availabilities) - Ava, Noor

*Subtasks*: Create API endpoint for getting availabilities, create API endpoint for setting availabilities, create frontend page for week by week schedule display

3. THEB-9 (Filter) - Ananya, Fariha

*Subtasks*: Insert mock data for service providers; create frontend to filter by service; create frontend to filter by price, rating, location; create API endpoint to filter by all given filters

4. THEB-12 (Customer bookings display) - Vishal

*Subtasks*: Create front end page to display upcoming bookings, create front end page to display previous bookings, set up backend endpoint to retrieve upcoming bookings, set up backend endpoint to retrieve previous bookings

5. THEB-17 (Professional bookings display) - Amy

*Subtasks*: Mock data for upcoming bookings, create frontend page to display upcoming bookings, mock data for past bookings, create frontend to display past bookings, set up endpoints to use DAOs

6. THEB-33 (Landing page, Navbar) - Fariha, Ananya

*Subtasks*: Create navbar, create footer, Landing Page frontend

7. THEB-53 (DAOs) - Carlos

*Subtasks*: Connect sprint1 endpoints to the database

8. THEB-56 (Refactor the frontend to be more visually appealing) - Ananya

*Subtasks*: Refactor frontend code for list of services, refactor frontend code for list of service providers, refactor frontend code for provider profile


# Team Capacity

Each story was estimated on a multiplicative scale from 1-10, where a 1 is expected to take anywhere between 2-3 hours of work per developer, a 2 is expected to take between 4-6 hours, and so on. The team capacity is 42 points, equivalent to approximately 105 hours.


## Spikes
- We had a hard time choosing how to display and use a calendar for booking-related features. We explored multiple options (such as the Google Calendar API but we ran into problems because it restricted the use to Gmail accounts) before deciding on Big React Calendar.
