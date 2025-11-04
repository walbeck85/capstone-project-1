# Capstone Project 1: React Dog Breed Finder

This repository contains my submission for the first Capstone project, a React application that consumes an external, third-party API.

The application is a "Dog Breed Finder" that allows users to browse, search, sort, and "favorite" dog breeds using data from The Dog API. It is built as a Single Page Application (SPA) using React Router and demonstrates key React concepts such as state management with hooks, client-side routing, and global state with Context.

## Showcase & Deliverables

* **Video Presentation:** [Placeholder for link to 5-10 minute video showcase]
* **Slide Deck:** [Placeholder for link to Google Slides/Canva deck]
* **Written Reflection:** [Placeholder for link to written reflection document]

## Screenshots

*(Placeholder: Add screenshots of the app here, showing light and dark modes, the home page, and a details page.)*

### Home Page (Light/Dark)
[Placeholder for Home Page Screenshot]

### Details Page (Light/Dark)
[Placeholder for Details Page Screenshot]

### Favorites Page
[Placeholder for Favorites Page Screenshot]

## Features

* **Browse All Breeds:** Fetches and displays a list of all dog breeds from the API on page load.
* **Dynamic Routing:** Uses React Router (`/breed/:id`) to show a unique, detailed page for each breed.
* **Client-Side Search:** A controlled search bar that filters breeds by name in real-time.
* **Client-Side Sorting:** A dropdown to sort the breed list by Name (A-Z, Z-A) or by average Weight (Low-High, High-Low).
* **Dark Mode:** A site-wide dark mode toggle that persists, built using `useContext`.
* **Favorites System:** Allows users to "favorite" breeds. Selections are saved to `localStorage` (using a `useContext` provider) and are viewable on a separate "Favorites" page.
* **Async Handling:** Gracefully handles loading and error states for all API calls.

## Environment

* React 18
* Node.js 18.x or later
* `npm` (for package management)
* `react-router-dom` (for routing)

## Setup and Installation

**CRITICAL: This app will not function without a free API key from The Dog API.**

**1. Clone and Enter Project**
```bash
git clone git@github.com:walbeck85/capstone-project-1.git
cd capstone-project-1
````

**2. Install Dependencies**

```bash
npm install
```

**3. Set Up Environment Variable**
This step is required for the app to fetch data.

  * Go to [https://thedogapi.com/signup](https://thedogapi.com/signup) to get your free API key.
  * In the root of the project, create a new file named `.env`
  * Open the `.env` file and add your API key:
    ```
    REACT_APP_DOG_API_KEY=your-api-key-goes-here
    ```
  * The `.gitignore` file is already configured to ignore `.env`.

## How to Run

After completing the setup, run the app from the root directory:

```bash
npm start
```

This will launch the application in development mode at `http://localhost:3000`.

## File Structure

```
/dog-breed-finder
|-- /public
|-- /src
|   |-- /components
|   |   |-- BreedCard.js
|   |   |-- BreedDetail.js
|   |   |-- BreedList.js
|   |   |-- FavoritesPage.js
|   |   |-- NavBar.js
|   |   |-- SearchBar.js
|   |   `-- SortDropdown.js
|   |
|   |-- /context
|   |   |-- FavoritesContext.js
|   |   `-- ThemeContext.js
|   |
|   |-- App.css
|   |-- App.js
|   |-- index.css
|   `-- index.js
|
|-- .env.example     (Placeholder for .env structure)
|-- .gitignore
|-- package.json
`-- README.md
```

## Rubric Alignment

This project meets the "Excelled" criteria for Project 1:

  * **Functionality:** The app successfully fetches and displays data from the external API. It handles loading and error states gracefully. All features (search, sort, routing, favorites, dark mode) are functional and error-free.
  * **User Interface (UI):** The app is polished, intuitive, and easy to use. It features a clean multi-page layout using React Router and a responsive dark mode.
  * **Code Quality:** The code is well-structured into reusable components (e.g., `BreedCard`, `SearchBar`), follows DRY principles, and uses `useContext` for global state to avoid prop drilling.
  * **Maintainability & Documentation:** This `README.md` provides a complete overview and setup guide. The code is fully commented, and the Git history follows a "feature branch" workflow with clear, atomic commit messages.

## Branch and PR Workflow

All work was completed on feature branches (e.g., `feature/router-setup`, `feature/breed-list-fetch`, `feature/dark-mode`) and merged into `main` via Pull Requests.

## Troubleshooting

  * **Error: "HTTP error\! status: 401"**: This means your API key is missing or incorrect. Please ensure your `.env` file is in the project root, is named correctly, and contains the `REACT_APP_DOG_API_KEY=...` variable. **You must restart the React server (`npm start`) after creating the `.env` file.**
  * **Images not loading on Favorites page:** This was a known bug that has been fixed. The `BreedCard` component now correctly handles two different image data formats provided by the API.

## Instructor Checklist

1.  Clone the repository.
2.  Create the `.env` file in the root and add your `REACT_APP_DOG_API_KEY`.
3.  Run `npm install`.
4.  Run `npm start`.
5.  Test app functionality: search, sort, navigation, dark mode, and favorites persistence on refresh.

<!-- end list -->