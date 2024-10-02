# my-Roadmap

My Roadmap is a project that allows users to dynamically add, edit, and track goals, milestones, and events through an intuitive interface. Unlike static roadmaps that require manual HTML updates, this project offers real-time editing and saves progress using cookies for persistent data storage. It’s designed to explore modern frontend technologies like HTML, CSS, JavaScript, and cookie management, providing a flexible and responsive solution for personal or organizational planning. The overall design and style are inspired by the roadmap template of the [TON organization](https://ton.org/en).

# Overview
...

# Usage Guide
1. **Creating a Roadmap**: 
   Click the `Create Roadmap` button. Once clicked, the button will change to `Done`. A timeline group will appear on the screen, containing input fields for entering a title and a detailed description.

   **Note**: The title field cannot be left empty; otherwise, a red border will appear around the field, indicating an error. The description field can be left empty, but the title is limited by the number of characters and can occupy a maximum of two lines. If the description height exceeds the height of the line connecting this timeline group to the next, the line will automatically adjust to ensure proper spacing between the groups.

3. **Adding a New Timeline Group**: 
   To add a new group, click the `plus (+) icon`. A new timeline group with input fields for the title and description will appear, connected to the previous group by a continuous line.

4. **Saving Data**: 
   After entering your data, click the `Finish` button. The input data will be validated and saved. The `Finish` button will automatically change to `Edit`, and the information will be stored in cookies for future use.

5. **Deleting a Timeline Group**: 
   To delete an unnecessary group, leave all input fields in that group empty. The group will be removed automatically after clicking the `Finish` button.

# Visual Design
The primary design template was inspired by the [TON website’s roadmap page](https://ton.org/en/roadmap). The main color palette and fonts were also borrowed from the [brand assets page](https://ton.org/en/brand-assets). The web application is fully responsive and adapts to various screen sizes. Below are videos showcasing how it performs on different devices.



https://github.com/user-attachments/assets/747582b5-1830-48af-8a67-6f77f7884513

# Cookies
In this project, cookies are used to store user data after they press the "Finish" button. When the user clicks "Edit", the cookies are cleared, allowing for a fresh start. The cookies store the state of the button (whether it is in "Edit" or "Finish" mode), the number of timeline groups, the title of each group, and the height of the line connecting the timeline groups. Additionally, the height of each group's description is saved in cookies.

Due to storage limitations in cookies, the description text is stored in **local storage**, which offers greater memory capacity. This ensures that all content, including text and visual elements, is preserved for `7 days`, allowing users to continue working on their roadmap even after refreshing the page.

# Future Enhancements
For future updates, several improvements can be made. First, a custom logo and favicon could be added to the site. Additionally, bug fixes and code optimization can be carried out, along with the addition of various text formatting features and some animations. A feature to create categories for different areas of interest could be implemented, allowing users to have separate roadmaps for each category. Eventually, a database could be introduced to store all user data. An example of a relational database schema is provided below.

![myRoadmapDB](https://github.com/user-attachments/assets/564d7f8b-40bd-4446-9ebe-dea22e8eaece)


