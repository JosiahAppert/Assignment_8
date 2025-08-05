# User Preferences Microservice

This project provides a simple **User Preferences Microservice** built with **Node.js**, **Express**, and **MongoDB**. It exposes a RESTful API for storing, retrieving, and deleting user preferences.

You can interact with the API using any HTTP client in your programming language of choice (e.g., Python `requests`, JavaScript `fetch`, Go `net/http`, etc.).

---

## Features

- Save or update user preferences (e.g., theme, notifications)
- Retrieve user preferences by user ID
- Delete user preferences

---

## Project Structure

```

.
├── models/
│   └── UserPreference.js       # Mongoose schema for user preferences
├── server.js                   # Express server exposing RESTful endpoints
├── .env                        # Environment configuration
├── package.json                # Node.js project metadata and dependencies
└── README.md                   # Project documentation

````

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

---

### 1. Clone the Repository

```bash
git clone https://github.com/JosiahAppert/Assignment_8.git
cd Assignment_8
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file with the following content:

```env
MONGODB_URI=mongodb+srv://<userid>:<password>@microservicea.ox8mtuh.mongodb.net/?retryWrites=true&w=majority&appName=MicroserviceA
PORT=3000
```

> Replace `<userid>` and `<password>` with your MongoDB Atlas credentials.

### 4. Start the Server

```bash
npm start
```

The service will start on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

You can make HTTP requests to the following endpoints using any HTTP client library or tool.

### `POST /preferences`

Create or update preferences for a user.

#### Request Body (JSON)

```json
{
  "userId": "user123",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

#### Example in Python:

```python
import requests

data = {
    "userId": "user123",
    "preferences": {
        "theme": "dark",
        "notifications": True
    }
}
response = requests.post("http://localhost:3000/preferences", json=data)
print(response.json())
```

### `GET /preferences/:userId`

Retrieve preferences for a specific user.

#### Example in Python:

```python
import requests

user_id = "user123"
response = requests.get(f"http://localhost:3000/preferences/{user_id}")
print(response.json())
```

---

### `DELETE /preferences/:userId`

Delete preferences for a specific user.

#### Example in Python:

```python
import requests

user_id = "user123"
response = requests.delete(f"http://localhost:3000/preferences/{user_id}")
print(response.json())
```

---

## Mongoose Schema

```js
{
  userId: { type: String, required: true, unique: true },
  preferences: { type: Object, default: {} }
}
```

---

## UML Sequence Diagram
<img width="1039" height="1068" alt="image" src="https://github.com/user-attachments/assets/33dabeff-f4b5-4eee-a8f4-ccf5e269b49f" />

---
## Notes

* All requests must be sent as JSON with the appropriate HTTP method (`POST`, `GET`, `DELETE`).
* Responses are returned as JSON.
