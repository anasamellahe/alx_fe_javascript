# alx_fe_javascript
DOM manipulation, Web storage and working with JSON data

#  DOM Manipulation, Web Storage, and Working with JSON Data

Welcome to the **“DOM Manipulation, Web Storage, and Working with JSON Data”** project!  
In this project, you will build a dynamic web application that allows users to generate, manage, and filter quotes. This project focuses on advanced **DOM manipulation**, **web storage**, and **handling JSON data** to create interactive and persistent experiences in the browser.

---

##  Learning Objectives

By the end of this project, you will be able to:

-  Create and manipulate dynamic content using JavaScript
-  Use `localStorage` and `sessionStorage` to persist data
-  Import and export JSON data to manage application state
-  Implement dynamic filtering of content based on user-selected criteria
-  Sync local data with a server and handle potential data conflicts

---

##  Project Tasks Overview

###  Task 0 – Building a Dynamic Content Generator

**Objective:** Use advanced DOM manipulation techniques to generate and manage dynamic content.

- Create a **Dynamic Quote Generator** that displays quotes based on selected categories
- Allow users to add new quotes and categories via a form
- All content and UI changes are handled using **JavaScript**

**Key files:**
- `index.html` – Basic HTML structure
- `script.js` – Contains logic for showing random quotes and adding new ones

---

###  Task 1 – Implementing Web Storage and JSON Handling

**Objective:** Store and manage quotes using browser storage and support JSON import/export.

- Save quotes to `localStorage` and load them when the app starts
- (Optional) Use `sessionStorage` for temporary settings like last viewed quote
- Add features to:
  - Export quotes to a downloadable `.json` file
  - Import quotes from a `.json` file

---

###  Task 2 – Creating a Dynamic Filtering System

**Objective:** Let users filter displayed quotes by category.

- Populate a category filter dropdown dynamically
- Filter quotes shown based on the selected category
- Save the last selected filter in `localStorage` to persist across sessions

---

###  Task 3 – Syncing Data with a Server

**Objective:** Simulate syncing local data with a remote server and resolve conflicts.

- Use a mock API (like JSONPlaceholder) to simulate fetching/sending data
- Periodically check for new server data and update local storage
- Implement basic conflict resolution where the server’s version takes precedence
- Notify the user when conflicts are resolved or updates are received

---

##  Testing & Validation

- Ensure all features work as expected in different browsers
- Validate correct use of web storage
- Check that import/export handles JSON data properly
- Verify that the filtering system updates the UI dynamically
- Test syncing logic and conflict handling thoroughly

---

##  Repository

- **GitHub Repository:** `alx_fe_javascript`
- **Project Directory:** `dom-manipulation`

---

