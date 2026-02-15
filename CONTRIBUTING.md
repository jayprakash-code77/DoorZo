# Real Estate Listings Project - Collaboration Guide

## 🌟 Project Overview
An open-source platform for property rentals where users can list, browse, and rent various properties including homes, hotels, castles, and villas.

## ✨ Current Features
| Feature Area       | Functionality |
|--------------------|---------------|
| 🏠 Listings        | - View all properties<br>- Filter by property type<br>- Search functionality |
| 👤 User Management | - Account creation<br>- Login/Logout<br>- Profile management |
| 🛠️ Property Tools  | - Create new listings<br>- Edit/Delete own listings<br>- Rent properties |
| 💬 Interactions    | - Comment on listings<br>- View all comments |
| 
## 🛠️ Tech Stack
**Frontend**:
- ejs (Embaded Javascript)
- Raw CSS and Bootstrap
- Javascript

**Backend**:
- Node.js with Express
- MongoDB (Mongoose)
- `passport`
- `passport-local-mongoose`

**Dev Tools**:
- VSCode
- Postman

## 🚀 Getting Started

### Prerequisites
- Node.js 
- MongoDB Atlas account or local MongoDB
- Git
- Nodemon (Optional)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/jayprakash-code77/Triple_T.git
cd mainFile
```

#### 2. Set Up Environment Variables
Create `.env` files in root directories:

##### /.env
```bash
PORT=8080
CLOUD_NAME=exampleCloudName
API_KEY=1857742199235397
API_SECRET=3Tmk0I_examle_secret_CmtkU2ULvUAR9q04_x0mU
CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dgegh81w8
MONGO_URL = "mongodb://127.0.0.1:27017/Triple_T"; 
```
##NOTE: 
By default, in `config/dbConfig`, the local URL : `MONGO_URL = "mongodb://127.0.0.1:27017/Triple_T"; ` is set. 


#### 3. Install Dependencies
```bash
# Install application dependencies
npm install

```
#### 4. Database Setup
- Create a free cluster on MongoDB Atlas Or Local Database of MongoDB Compass.
- Get your connection string and add to `.env`

```bash
# For macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### 5. Run the Application
```bash
# From project root directory : mainFile

nodemon app.js

OR

node app.js (Optional)

```

The app should now be running at:
`http://localhost:8080/listing`



## 🏗️ Project Structure
```bash
Triple_T/
mainFile/ # Primary application files
├── config/ # Configuration files
│ ├── dbConfig.js # Database configuration
│ └── cloudConfig.js # cloud configuration for image storage
│
├── controllers/ # Business logic handlers
│ ├── listingController.js # For lisitng related controllers
│ └── reviewController.js # For reviews related controllers
│ └── userController.js # Controllers for users
├── init/ # Initialization scripts
│ ├── data.js # Data for Database Initialization
│ └── index.js # routers root file for DB Initialization
├── middleware/ # Custom middleware
│ ├── authMiddleware.js # Authentication middleware
│ └── isOwner.js # Error handling
│ └── isReviewAuthor.js # Error handling
│ └── postMiddleware.js # empty or not used
│ └── preMiddleware.js # empty or not used
│ └── schemaValidationMW.js # To validate the schema
├── models/ # Database models
│ ├── listing.js # Listing schema
│ └── review.js # Review schema
│ └── user.js # User schema
├── node_modules/ # NPM dependencies (auto-generated)
├── public/ # Static assets
│ ├── CSS/ # Stylesheets
│ ├── JS/ # Client-side scripts
│ └── images/ # Image assets
│
├── routes/ # Route definitions
│ ├── authRoute.js # Auth routes
│ └── index.js # Access point on all routes
│ └── listingRoute.js # Routes related to listing
│ └── reviewRoute.js # Routes related to review
├── tests/ # for writing the jest tests
│ ├── ControllersTests/ # test for controllers
│ 
├── uploads/ # User uploads directory
│ 
├── utils/ # Utility functions
│ ├── ExpressError.js # For Express Error handling
│ └── geoCode.js # geo coding (Map) utilities
│ └── wrapAsync.js # To handle Asynchronous controllers (routes)
│
├── views/ # Template files
│ ├── auth/ # Auth layouts
│ └── includes/ # components 
│ └── layouts/ # Different boilerplate code
│ └── listings/ # layouts for listing
│ └── allListings.ejs # Homepage
│ └── edit.ejs # Layout to edit listing
│ └── error.ejs # Layout for error
│ └── map.ejs # Layout for Map
│ └── new.ejs # Layout for creating new List
│ └── show.ejs # Layout for displaying list details
│
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── app.js # Main application entry point
├── detail.txt # Project details/documentation
├── package-lock.json # Dependency lockfile
├── package.json # Project manifest
└── README.md # Project documentation
```

## Key Directories Explained:

1. **config/** - Contains all configuration files for databases, services, and application settings.

2. **controllers/** - Houses the business logic that handles requests and returns responses.

3. **middleware/** - Contains functions that process requests before they reach route handlers.

4. **models/** - Defines data structures and database schemas using Mongoose or similar ORM.

5. **public/** - Stores all static assets served directly to clients (CSS, JS, images).

6. **routes/** - Defines the application endpoints and links them to controllers.

7. **utils/** - Contains reusable utility functions and services used throughout the app.

8. **views/** - Holds template files for server-side rendering (if using templating engine).

## Best Practices:

- Keep `app.js` clean by moving route definitions to the routes/ directory
- Store all environment variables in `.env` (add to `.gitignore`)
- Group related functionality in modules within each directory
- Use consistent naming conventions (camelCase for JS files, kebab-case for templates)
- Document each directory's purpose in a README.md within the directory

This structure follows common Node.js MVC patterns while maintaining flexibility for different types of applications.



# 🤝 How to Contribute

Contribution Workflow
1. Find an issue or propose a new feature
2. Assign the issue to yourself
3. Create a feature branch:
```bash
git checkout -b feat/your-feature-name
```
4. Make your changes following the above project structure.
5. Commit changes following Conventional Commits:
```bash
git commit -m "feature: add property filtering"
```
6. Push to your branch:
```bash
git push origin feat/your-feature-name
```
7. Open a Pull Request

# 🧩 Where to Contribute
**For Frontend Developers**
- `public/` directory: Improve CSS/JS/assets
- `views/` directory: Enhance templates and layouts

**For Backend Developers**
- `controllers/`: Add new business logic
- `models/`: Create new database schemas
- `middleware/`: Implement new middleware

**For Full-Stack Developers**
- `routes/`: Create new API endpoints
- `utils/`: Add helper functions
- `config/`: Improve application configuration

# 🧑‍💻 Coding Standards

**File Structure:**
- Keep files in their designated directories
- Name files descriptively (e.g., userController.js)
  
**Code Style:**
- Follow existing patterns in each directory
- Use JSDoc comments for complex functions:

```bash
/**
 * Authenticates user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
async function authenticateUser(req, res) {...}
```

Testing(Optional):
- Add tests for new features in corresponding test files
- Ensure existing tests pass:
```bash
npm test
```

# 🐛 Reporting Issues

**When reporting bugs:**
1. Check if the issue already exists
2. Include
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable
   - Environment details

# 🙏 Code Review Process

- Maintainers will review your PR.
- You may need to make adjustments.
- Once approved, your code will be merged.

# 📜 License
By contributing, you agree that your contributions will be licensed under the project's MIT License.

***Happy coding! 🚀 Your contributions help make this project better for everyone.***
