# my-Roadmap

My Roadmap is a project that allows users to dynamically add, edit, and track goals, milestones, and events through an intuitive interface. Unlike static roadmaps that require manual HTML updates, this project offers real-time editing and saves progress using cookies for persistent data storage. It’s designed to explore modern frontend technologies like HTML, CSS, JavaScript, and cookie management, providing a flexible and responsive solution for personal or organizational planning. The overall design and style are inspired by the roadmap template of the [TON organization](https://ton.org/en).

# Overview
...

# Usage Guide
...

# Visual Design
...

# Cookies
In this project, cookies are used to store user data after they press the "Finish" button. When the user clicks "Edit", the cookies are cleared, allowing for a fresh start. The cookies store the state of the button (whether it is in "Edit" or "Finish" mode), the number of timeline groups, the title of each group, and the height of the line connecting the timeline groups. Additionally, the height of each group's description is saved in cookies.

Due to storage limitations in cookies, the description text is stored in **local storage**, which offers greater memory capacity. This ensures that all content, including text and visual elements, is preserved for `7 days`, allowing users to continue working on their roadmap even after refreshing the page.

# Future Enhancements
For future updates, several improvements can be made. First, a custom logo and favicon could be added to the site. Additionally, a feature to create categories for different areas of interest could be implemented, allowing users to have separate roadmaps for each category. Eventually, a database could be introduced to store all user data. An example of a relational database schema is provided below.

![myRoadmapDB](https://github.com/user-attachments/assets/564d7f8b-40bd-4446-9ebe-dea22e8eaece)


