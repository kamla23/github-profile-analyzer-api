
# GitHub Profile Analyzer API

A robust backend API that fetches GitHub user profile data, analyzes their repository statistics, calculates a custom developer score, and stores the structured results in a secure cloud database.

---

## 🔗 Project Deliverables

- **GitHub Repository Link:** https://github.com/kamla23/github-profile-analyzer-api
- **Live Deployed API URL:** https://github-profile-analyzer-api-3rxn.onrender.com
- **Cloud Database Provider:** Aiven MySQL

---

## 🛠️ API Endpoints & Postman Usage Guide

### 1. Analyze and Save a GitHub Profile
Fetches live data from GitHub, calculates the developer score, and inserts/updates it in the Aiven Cloud Database.
- **Method:** `POST`
- **URL:** `https://github-profile-analyzer-api-3nxn.onrender.com/api/profiles/:username`
- **Example Tested:** `https://github-profile-analyzer-api-3nxn.onrender.com/api/profiles/kamla23`

### 2. Get All Analyzed Profiles
Retrieves the list of all profiles stored inside the database.
- **Method:** `GET`
- **URL:** `https://github-profile-analyzer-api-3nxn.onrender.com/api/profiles`

### 3. Get a Specific Profile from Database
Retrieves the stored analysis data for a single username.
- **Method:** `GET`
- **URL:** `https://github-profile-analyzer-api-3nxn.onrender.com/api/profiles/:username`

---

## 🗄️ Database Schema

The cloud database automatically triggers the table creation. Below is the exact schema (`schema.sql`) exported for this project:

```sql
CREATE TABLE IF NOT EXISTS github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    bio TEXT,
    location VARCHAR(255),
    public_repos INT,
    followers INT,
    following INT,
    developer_score INT,
    last_analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



💻 Local Setup Instructions

1.Clone the repository:  
git clone [https://github.com/kamla23/github-profile-analyzer-api.git](https://github.com/kamla23/github-profile-analyzer-api.git)
cd github-profile-analyzer-api

2. Install all required dependencies: 
npm install

3.Configure Environment Variables:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_password
DB_NAME=github_analyzer

4.Start the development server:
npm start


🚀 Tech Stack Used
1.Backend Environment: Node.js

2.Framework: Express.js

3.Database: MySQL (Hosted on Aiven Cloud)

4.Deployment Platform: Render

5.API Testing Tool: Postman