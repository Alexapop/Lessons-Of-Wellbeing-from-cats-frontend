# Lessons of Wellbeing from Cats

This is my individual final project for the Factoría F5 Full Stack Development Bootcamp.

The application introduces a wellbeing sanctuary inspired by the wisdom of cats, with Mia and Thor as its main characters. It combines feline-inspired self-care lessons with traditional practices such as yoga and Ayurveda, as well as kombucha and tea tasting sessions.

Visitors will be able to explore the sanctuary and its activities without logging in. An account will be required to book sessions and manage reservations.

## Project Structure

The project uses a decoupled architecture, with the frontend and backend maintained in separate repositories. This repository contains the frontend.

- **[Frontend repository](https://github.com/Alexapop/Lessons-Of-Wellbeing-from-cats-frontend)**
- **[Backend repository](https://github.com/Alexapop/Lessons-Of-Wellbeing-from-cats-backend)**

## Planned Features

### Home & Sanctuary

- Explore the homepage without an account.
- Discover the sanctuary and meet Mia and Thor.
- Preview the wellbeing lessons, Yoga & Ayurveda activities, and Kombucha & Tea Lounge.
- Find sanctuary opening hours, location, and payment information.
- Navigate to the lessons page or the class calendar.
- Use a responsive layout across mobile, tablet, and desktop screens.

### Wellbeing Lessons

- Read feline-inspired self-care lessons.
- Expand and collapse individual lessons.
- Use the **Practice in Class** button to open the calendar with the relevant filters applied.

### Class Calendar

- Browse upcoming sessions without logging in.
- View each session's date, time, host, location, description, and duration.
- Filter sessions by category, such as Yoga, Ayurveda, or Kombucha, and by host.
- Open the calendar from the Yoga & Ayurveda or Kombucha & Tea Lounge sections with the corresponding category filter applied.
- View a **Reserve** button when logged in or a **Login to Reserve** button when logged out.

### Registration & Login

- Create an account with a name, email address, phone number, location, handle, and password.
- Register with a unique email address and handle, then proceed to the login page.
- Log in with a handle or email address and a password.
- See the user's name and a logout button in the header after signing in.
- Access the user dashboard after login, or the separate admin dashboard when signing in as an administrator.
- Log out and return to the homepage.

### Reservations & User Dashboard

- Open a reservation form for a selected session, with the user's name, email address, and phone number pre-filled.
- Provide tea or kombucha preferences when booking a Kombucha session. These preferences are required before confirming the booking.
- Confirm a reservation and return to the dashboard.
- View personal reservations, including their status, notes, date, host, and location.
- Cancel confirmed reservations from the dashboard.
- Keep cancelled reservations visible with a **Cancelled** status and no cancellation button.
- View payment instructions for confirmed bookings: **Cash or Bizum**.

### Admin Dashboard

- Access a separate dashboard restricted to administrators.
- View all reservations, including user information and booking notes.
- Create sessions and publish them in the calendar.
- Edit session details.
- Delete sessions so they no longer appear in the calendar.

## Frontend Technologies

The frontend project is configured with:

- **Vue 3** for the user interface.
- **Vue Router** for page navigation.
- **Pinia** for state management.
- **Vite** for development and production builds.
- **Vitest** and **Vue Test Utils** for unit testing.
- **Playwright** for end-to-end testing.
- **ESLint**, **Oxlint**, and **Prettier** for code quality and formatting.

## Project Documentation

Links to the project Wiki and supporting documentation will be added as they become available.

| Topic                           | Planned content                                                                    | Link        |
| ------------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| Getting Started                 | Environment setup, installation, and instructions for running the project locally. | To be added |
| Agile Management & User Stories | Jira tracking, user stories, and acceptance criteria.                              | To be added |
| Architecture                    | Frontend and backend responsibilities, application structure, and API integration. | To be added |
| Security                        | Authentication, user and admin access, and protected reservations.                 | To be added |
| Testing                         | Instructions for running unit and end-to-end tests.                                | To be added |

## Developer

| Developer | GitHub                                   |
| --------- | ---------------------------------------- |
| Alexa Pop | [@Alexapop](https://github.com/Alexapop) |
