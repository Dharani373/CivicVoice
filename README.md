# 🚀 CivicVoice - Hyperlocal Civic Complaint & Resolution Platform

CivicVoice is a full-stack MERN application that enables citizens to report local civic issues while providing authorities with a centralized dashboard to manage and resolve complaints efficiently.

The platform supports secure authentication, image uploads, geolocation, complaint management, real-time updates using Socket.IO, and an analytics dashboard for administrators.

---

## 📌 Features

### 👤 Citizen

- Secure Signup & Login using JWT Authentication
- Report civic complaints
- Upload complaint images (Cloudinary)
- Automatic location detection using Geolocation API
- Reverse Geocoding to convert coordinates into readable addresses
- View all community complaints
- View personal complaints
- Upvote complaints
- Real-time complaint status updates
- Responsive user interface

### 👨‍💼 Administrator

- Secure Admin Login
- Dashboard with platform statistics
- View all reported complaints
- Search complaints
- Filter by category and status
- Complaint details modal
- Update complaint status
- Analytics dashboard
- Real-time complaint management

---

## ⚡ Real-Time Features

Socket.IO has been integrated to provide live updates.

- New complaints appear instantly on the Admin Dashboard.
- Complaint status changes are reflected instantly for all connected users.
- No manual refresh required.

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Chart.js
- Socket.IO Client
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- Multer
- Cloudinary

### APIs

- Browser Geolocation API
- Reverse Geocoding API
- Cloudinary Image Storage

---

## 🏗 System Architecture

```
Citizen
     │
     ▼
 React Frontend
     │
 Axios + Socket.IO
     │
     ▼
Express.js Server
     │
 ├── JWT Authentication
 ├── Report Management
 ├── Admin APIs
 ├── Socket.IO
 │
 ▼
MongoDB Database

Cloudinary ← Image Uploads

Reverse Geocoding API ← Location Conversion
```
## 📷 Screenshots

| Feature | Screenshot |
|---|---|
| **Citizen Dashboard** | <img src="docs/screenshots/citizen%20dashboard.png" alt="Citizen Dashboard" width="600"> |
| **Report Complaint - Details** | <img src="docs/screenshots/report%20details%20modal.png" alt="Report Complaint Details" width="600"> |
| **Report Complaint - Location** | <img src="docs/screenshots/report%20issue%20locatio.png" alt="Report Complaint Location" width="600"> |
| **Report Complaint - Photo Upload** | <img src="docs/screenshots/report%20issue%20image.png" alt="Report Complaint Photo Upload" width="600"> |
| **Report Complaint - Review** | <img src="docs/screenshots/report%20issue%20photo.png" alt="Report Complaint Review" width="600"> |
| **My Complaints** | <img src="docs/screenshots/my%20complaints.png" alt="My Complaints" width="600"> |
| **Admin Dashboard** | <img src="docs/screenshots/admin%20dashboard.png" alt="Admin Dashboard" width="600"> |
| **Admin Complaint Details** | <img src="docs/screenshots/admin%20complaint%20details.png" alt="Admin Complaint Details" width="600"> |

## 📂 Project Structure

```
CivicVoice
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── styles
│   └── socket.js
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── utils
│
└── README.md
```

---

## 🔐 Authentication

The application uses JSON Web Tokens (JWT).

Protected routes include:

- Report Complaint
- My Complaints
- Upvote Complaint
- Admin Dashboard
- Complaint Status Update

Role-based authorization ensures only administrators can access administrative features.

---

## 📊 Admin Features

- Complaint Statistics
- Total Users
- Open Complaints
- In Progress Complaints
- Resolved Complaints
- Complaint Search
- Complaint Filters
- Complaint Details
- Status Management
- Analytics Charts

---

## 🌍 Location Services

Each complaint stores:

- Latitude
- Longitude
- City
- State
- Complete Address

using Browser Geolocation and Reverse Geocoding APIs.

---

## ☁️ Image Uploads

Images are uploaded securely to Cloudinary.

Uploaded complaint images are stored remotely and linked with each report.

---


## 👨‍💻 Author

**K. R. Dharani**
