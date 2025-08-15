# 🤝 Collaboration Guidelines

Welcome to the **Open Source Real Estate Room Listing Web Application**!  
This project is designed to let users browse, list, and manage room/hotel properties.  
We welcome contributors from all backgrounds to help improve and grow this project together.

---
**Connect with me:**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/jayprakash-maurya-05569626b/) 
[![Discord](https://img.shields.io/badge/Discord-Join-7289DA?style=flat&logo=discord)](https://discord.gg/AK4vcrMf)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat&logo=github)](https://github.com/jayprakash-code77)
---

## 📁 Project Structure

The project is contained in the `mainFile/` directory:

mainFile/
├── models/ # Mongoose schemas
├── routes/ # Express route handlers
├── config/ # MongoDB and Cloudinary configs
├── views/ # EJS templates
├── public/ # Static files (CSS, images)
├── server.js # Entry point
├── .env.example # Sample env config
└── ...





---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local or Atlas)
- **Authentication:** Passport.js & passport-local-mongoose
- **Image Uploads:** Cloudinary + multer-storage-cloudinary
- **Templating Engine:** EJS
- **Sessions:** Express-session

---

## 🌟 Core Features

- ✅ User Signup/Login (Authentication)
- ✅ View room listings without login (Read-Only)
- ✅ After login:
  - Post a room listing (with images)
  - Edit/delete your own listings
  - Leave reviews on listings
- ❌ Unauthenticated users cannot post/edit/delete or review

---

## 🚀 Getting Started

### 1. Fork and Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/real-estate-app.git
cd mainFile
```




### 2. Install Dependencies
```
npm install
```




### 3. Setup .env File
- Create a .env file in the root using the provided .env.example template:


```
PORT=8080

# MongoDB Connection (use Atlas or local)
MONGO_ATLAS_URL=your_mongodb_connection_string

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```




#🧠 Development Workflow
##🔀 Branching Strategy

- main: Stable production-ready branch

- dev: Active development branch

- For features/fixes:




```
git checkout dev
git checkout -b feature/your-feature-name
```



### 📝 Commit Message Convention

- Use clear, atomic commit messages:

```
git commit -m "Add image upload support using Cloudinary"
```


#✅ Before Creating Pull Request


- Make sure your feature works as expected

- Don't leave any debug logs or test code

- Add comments where necessary

- Test Cloudinary integration and DB interactions




##📦 Included Files and Best Practices

These files help keep the repo maintainable:








##🧬 Code of Conduct

- Be respectful and inclusive

- Keep the tone friendly and constructive

- Collaborate to help, not to compete




## 📩 Issues & Feedback

- Found a bug? Open an Issue

- Want to request a feature? Start a Discussion

- Have suggestions? Comment in PRs or Discussions




## 📝 License

- This project is open-source and available under the MIT License.
- You may use, distribute, or modify it freely with attribution.




**Thanks for contributing 💻✨**
**Let’s build something meaningful together!**





