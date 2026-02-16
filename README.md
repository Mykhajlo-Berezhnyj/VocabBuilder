# VocabBuilder

# VocabBuilder — web application for learning and managing vocabulary.
It allows users to register, log in, add words to their personal dictionary, track learning progress, search/filter words, and practice them through interactive training modules.

## 🚀 Project Overview

VocabBuilder is designed as a responsive React-based single-page application with a REST API backend.
The app supports:

User authentication (Register/Login)

Protected routes

Personalized word dictionary

Server-side pagination

Word search and category filters

Interactive word training

Dashboard with summary statistics

It provides a clean UX for users to study English ⇄ Ukrainian vocabulary efficiently.

🧠 Main Features
## 🔐 Authentication

# Register / Login pages

Email and password validation using react-hook-form + Yup

Email normalized to lower case before sending to backend

On successful login/registration → redirect to Dictionary Page

Handle and display server validation errors

Special case:

If registration fails with a 409 Conflict response (email already exists), the user is automatically redirected to the Login Page.

A message is displayed: “This email already exists. Please enter password to log in.”

This guides the user to log in with their existing account rather than attempting to register again.

## 🗂 Dictionary Page ( /dictionary )

Accessible only for authenticated users

Shows a Dashboard containing:

Word search with debounce and trimmed input

Category filter (select with optional extra behavior for verbs)

Statistics for current learning progress

A WordsTable:

Displays words added by user

Supports pagination (server-side)

Actions per row (Edit / Delete)

Add/Edit word modals

Pagination component for navigating pages

Fetch new data dynamically on page or filter change

## 📊 Filtering & Search

Search box filters by content keyword with debounce (~300ms)

Category select to narrow results

Optional verb sub-filters (radio buttons) based on category

Full state synchronization with URL query parameters

Deep linking support (users can share filtered views)

Persistent UI state via query params


## 🧪 Training

Interactive training page to practice vocabulary

Fetches training tasks from backend

Dynamic progress visualization (ProgressBar)

Handles navigation after training and error cases

Shows results in a dedicated modal on completion

## 🏠 Home Page
The HomePage component acts as a redirector.

If the authentication state is still refreshing (isRefreshing), nothing is rendered until the check completes.

Once the check is done:

If the user is logged in → they are redirected to the Dictionary Page.

If the user is not logged in → they are redirected to the Login Page.

## 🚫 404 Not Found Page
A custom NotFoundPage component is displayed when the user navigates to a route that does not exist.

The page shows a 404 error message and a visual countdown indicator.

After a short delay, the user is automatically redirected back to the root of the site (/).

This provides a clear fallback experience and prevents users from being stuck on broken links.

## 🖼 Design & Layout

Responsive layout for:

Mobile: ≥320px

Tablet: ≥768px

Desktop: ≥1440px

All HTML semantics must follow accessibility standards

Custom fonts loaded with @font-face

Optimized images and icons via sprites

Design source: Figma file linked in project spec

## 🛠 Technologies

<pre>```
| Layer        | Tools / Libraries |
|-------------|-------------------|
| Frontend    | React, Redux, TypeScript |
| Forms       | react-hook-form, Yup |
| UI          | CSS Modules, clsx, MUI |
| HTTP        | Axios |
| Routing     | React Router |
| State       | Redux Toolkit |
| Tables      | React Table |
| Icons       | SVG / sprite |
| Components  | MUI Menu, MUI CircularProgress |

```</pre>

## 📦Folder Structure (suggested)

<pre>```
src
├──components/ 
|  ├── #... Reusable UI components        
|  ├── hooks/         # Custom React hooks
|  ├── validation/    # Yup schemas
|  ├── utils/         # Helpers
|      
├──| pages/
│  ├── DictionaryPage/
│  ├── HomePage/
│  ├── LoginPage/
│  ├── RecommendPage/
│  ├── TrainingPage/
│  └── NotFoundPage/       
└── redux/         # Redux slices & async thunks
   ├── auth/
   ├── dictionary/
   ├── filters/
   ├── modal/
   ├── tasks/
   └── userDictionary/  
   
```</pre>

## 📌 Coding Standards

Semantic HTML5

Responsive & adaptive UI

Consistent state management using Redux Toolkit

Proper error feedback to user (toasts/modals)

Debounced search inputs

Pagination handled on server

Form validation before submit


## 🚀 Getting Started

Install dependencies
npm install

Start the development server
npm run dev

The app can be deployed using:

GitHub Pages: https://github.com/Mykhajlo-Berezhnyj/VocabBuilder

Netlify: https://vocabbuilder-m.netlify.app/