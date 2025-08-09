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

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/jayprakash-code77/Triple_T.git
cd mainFile
```

#### 2. Set Up Environment Variables
Create .env files in root directories:

##### /.env
```bash
PORT=8080
CLOUD_NAME=dgegh81w8
API_KEY=148543985735397
API_SECRET=3Tmk0ICmtkU2ULvUAR9q04_x0mU

CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dgegh81w8
MONGO_ATLAS_URL=mongodb+srv://trueekoimpact:60n4PgXwgyLDye2a@trueekocluster0.zxoiyzg.mongodb.net/
```


#### 3. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```
#### 4. Database Setup
- Create a free cluster on MongoDB Atlas
- Get your connection string and add to `.env`
- Or for local MongoDB:
```bash
# For macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### 5. Run the Application
```bash
# From project root directory

# Start backend server
cd server
npm run dev

# In new terminal - start frontend
cd ../client
npm start
```

The app should now be running at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000


## 🏗️ Project Structure
```bash
real-estate-project/
├── client/               # React Frontend
│   ├── public/
│   └── src/
│       ├── assets/       # Images, fonts
│       ├── components/   # Reusable UI components
│       ├── features/     # Redux slices
│       ├── hooks/        # Custom hooks
│       ├── pages/        # Route components
│       ├── services/     # API calls
│       ├── App.tsx
│       └── main.tsx
│
├── server/              # Express Backend
│   ├── config/          # DB config
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   └── server.ts
│
├── .github/            # GitHub workflows
├── .husky/             # Git hooks
└── docs/               # Documentation
```

## 🤝 How to Contribute

Contribution Workflow
1. Find an issue or propose a new feature
2. Assign the issue to yourself
3. Create a feature branch:
```bash
git checkout -b feat/your-feature-name
```
4. Commit changes following Conventional Commits:
```bash
git commit -m "feat: add property filtering"
```
5. Push and open a Pull Request

**Code Standards**
- TypeScript everywhere
- Functional components with hooks
- Modular component structure
- Meaningful variable names
- JSDoc comments for complex functions

```bash
/**
 * Calculates the total rental price
 * @param {number} basePrice - Base price per night
 * @param {number} nights - Number of nights
 * @param {number} [taxRate=0.1] - Optional tax rate
 * @returns {number} Total price with tax
 */
function calculateTotal(basePrice: number, nights: number, taxRate = 0.1): number {
  return (basePrice * nights) * (1 + taxRate);
}
```

## 📈 Roadmap
**Phase 1 (Current)**
- Basic property listings
- User authentication
- CRUD operations for properties

**Phase 2 (Next)**
-Advanced search with maps
-Booking system
-Payment integration

**Phase 3 (Future)**
-Mobile app (React Native)
-AI recommendations
-Virtual tours

## 💬 Communication
- Discord: Join our server
- Weekly Sync: Every Friday 3PM UTC
- Issue Tracking: GitHub Projects board

## 📜 License
MIT License - See LICENSE file for details.

## 🙏 Acknowledgments
Special thanks to all our contributors! Want to see your name here? Make your first contribution!


