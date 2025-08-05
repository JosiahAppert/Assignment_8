# User Preferences Microservice

This project provides a simple User Preferences Microservice built with Node.js, Express, and MongoDB.

# Features

* Save or update user preferences (theme, notifications, etc.)
* Retrieve user preferences by user ID
* Delete user preferences by user ID

# Project Structure

.
├── models/
│   └── UserPreference.js       # Mongoose schema for user preferences
├── server.js                   # Express server exposing RESTful endpoints
├── .env                        # Environment configuration, instructions to create below
├── package.json                # Node.js project metadata and dependencies
└── README.md                   # Project documentation

# Getting Started

# Prerequisites

* [Node.js](https://nodejs.org/)
* [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) or local MongoDB server
* [Python 3.x](https://www.python.org/)
* [pip](https://pip.pypa.io/en/stable/installation/)

# Running the Microservice

# 1. Clone the Repository

```bash
git clone https://github.com/JosiahAppert/Assignment_8.git
cd user-preferences-service
```

# 2. Install Dependencies

```bash
npm install
```

# 3. Configure Environment

Create a `.env` file with the following:

```env
MONGODB_URI=mongodb+srv://<userid>:<password>@microservicea.ox8mtuh.mongodb.net/?retryWrites=true&w=majority&appName=MicroserviceA
PORT=3000
```

> Replace `<userid>` and `<password>` with your MongoDB Atlas credentials.

# 4. Start the Server

```bash
npm start
```

The server will run on http://localhost:3000.

# API Endpoints

# `POST /preferences`

Create or update preferences for a user.

# Request Body:

```json
{
  "userId": "user123",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

# `GET /preferences/:userId`
Retrieve preferences for a user.
# Example:
```bash
GET /preferences/user123
```

# `DELETE /preferences/:userId`
Delete preferences for a user.
# Example:
```bash
DELETE /preferences/user123
```

# Mongoose Schema

```js
{
  userId: { type: String, required: true, unique: true },
  preferences: { type: Object, default: {} }
}
```
