# Focus & Joy - Productivity Helper

Focus & Joy is a productivity app that allows users to track various aspects of their daily lives, including sleep, water, calories, and steps on a weekly basis. The app includes a list feature, data visualizations, progress tracking, and the ability for users to share their lists with others.

## Features

- **Trackers**: Track your sleep, water, and calorie intake. You can also select a current mood option for a fun visual :). Add or edit details about sleep.
- **To-Do Lists**: Create and manage your daily to-do lists or any other type of lists. Track task's progress, edit or add new tasks or lists. Select color for each list.
- **Performance**: View your progress through visualized charts  powered by Chart.js.
- **Inspiration**: Share your lists or ideas with other users and receive feedback via like or comment, if logged in. See full list with view Details option. Not authenticated users can only see the lists and their comment and likes count.
- **User Authentication**: Secure login and registration system for users.
- **Error Handling**: Proper error messages and handling during data fetching.
- **Reusable Components**: Modular and reusable Angular components.

## Technologies Used

- **Frontend**: Angular 18 (Standalone Components)
- **Backend**: Firebase (for authentication and data storage)
- **Styling**: CSS (custom styles).
- **Animations**: GSAP (for advanced animations)
- **Charts**: Chart.js (for data visualizations and performance tracking)
- **State Management**: RxJS (with operators like `map`, `switchMap`, and `from`)
- **Routing**: Angular Router (with route guards for access control)
- **Custom Pipes**: `ProgressBarPipe`: A custom pipe used to calculate and display progress percentages in trackers.

## Installation

To get started with the project, follow these steps:
1. **Clone the repository**:

   ```bash
   git clone https://github.com/RadostGeorgieva/focus---Joy-Productivity-App.git

 2. **Install dependencies**:
    Navigate to the project directory and install the required packages:
    npm install

3. **Run the project loclly**:
    ng serve
    Open your browser and navigate to http://localhost:4200.

## Structure
**Project folder Structure**
src/app: Contains the main application files.
home-page: Components for the home page.
dashboard: Components and logic related to trackers.
trackers: Components for tracking sleep, water, calories, and mood.
performance: Components for performance tracking and charts.
productivity-hub: list and productivity-related components.
inspiration: Components for the inspiration page.
guards: Route guards for authentication and access control.
models: TypeScript interfaces and models used across the application.
services: Services for data fetching, authentication, and other logic.
user: Components for user authentication and profile management.
src/environments: Stores environment configuration files (e.g., Firebase settings).
src/index.html: The main HTML file for the application.
src/styles.css: Global CSS styles.
angular.json: Angular configuration file.
firebase.json: Firebase configuration for hosting.


**License**
This project is licensed under the MIT License - see the LICENSE file for details.

Made with ❤️ by Radostina Georgieva(Joy)
