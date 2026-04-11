# 🏙️ CivicVoice — Hyperlocal Civic Complaint & Resolution Platform

CivicVoice is a **full-stack MERN web application** that empowers citizens to report local civic issues such as potholes, garbage dumps, broken streetlights, water leakage, and road damage with **photos, GPS location, and real-time status tracking**.

The platform promotes **public accountability, transparent issue resolution, and community-driven prioritization** through upvotes, live notifications, and map-based issue visibility.

> 🚀 Built as a **production-ready scalable MVP** using **React, Tailwind CSS, Node.js, Express, MongoDB, Socket.io, Leaflet, and Cloudinary**.

---

## 🌟 Key Highlights

- 📍 **Map + Feed Hybrid Homepage**
- 📸 **Image-based issue reporting**
- 📌 **GPS auto-detect + manual pin support**
- 👍 **Duplicate prevention via upvotes**
- 🔔 **Real-time status notifications**
- 📊 **Admin analytics dashboard**
- 📡 **Geospatial issue search**
- 🌙 **Dark mode ready**
- 📱 **Mobile-first responsive UI**
- ⚡ **Optimistic UI updates**

---

## 🧠 Problem Statement

Citizens often struggle to report local civic issues efficiently, and once reported, the complaint process lacks transparency.

CivicVoice solves this by offering:

- quick issue reporting in under **30 seconds**
- transparent status progression
- real-time public updates
- issue prioritization through community upvotes
- admin accountability dashboard
- location-based issue visibility

---

## 🎯 Core Features

### 👤 Citizen Features
- JWT Authentication (Signup / Login / Logout)
- Report issue with:
  - title
  - description
  - category
  - images
  - GPS / map pin
- Infinite issue feed
- Filter by:
  - category
  - status
  - radius
  - nearby issues
- Upvote issues
- Real-time comments
- User dashboard
- Notification center
- Status timeline tracking

### 🛠️ Admin Features
- Admin dashboard
- Role-based access control
- Update issue status workflow
- Public admin response
- Resolution analytics
- Resolution time charts
- Jurisdiction-based issue management

---

## 🗺️ Map Features
- Interactive map using **Leaflet.js**
- Issue markers
- Marker clustering
- Radius-based issue fetching
- Click pin → issue preview card
- Nearby issue search using geospatial queries

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Leaflet.js
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Socket.io
- Multer
- Cloudinary
- Nodemailer

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Media → Cloudinary

---

## 📂 Project Structure

```
civicvoice/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── routes/
│   │   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── utils/
│   └── server.js
│
├── README.md
└── .gitignore
