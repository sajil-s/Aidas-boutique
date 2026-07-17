
AIDAS Boutique

A full-stack e-commerce site I built for a fashion/boutique store — customers can browse products, add stuff to their cart, checkout, and pay online. There's also a full admin dashboard for managing products, orders, and customers.

Built with the MERN stack (MongoDB, Express, React, Node).

Live links


Frontend: https://aidas-boutique.vercel.app




What it does

For customers:


Register/login with JWT auth (stored in HTTP-only cookies, not localStorage)
Browse and search products, filter by category
Product detail pages with size/color variants
Cart and checkout flow
Razorpay for payments
Order history so you can track past orders


For admins:


Separate admin login
Add/edit/delete products, upload images straight to Cloudinary
Manage categories
View and update order status
Basic dashboard with sales/order numbers


Tech stack

Frontend: React + Vite, Tailwind CSS, React Router, Axios, react-hot-toast

Backend: Node/Express, MongoDB with Mongoose, JWT for auth, Multer for handling uploads

Other services: Cloudinary (images), Razorpay (payments), MongoDB Atlas (database hosting), Vercel (frontend hosting), Render (backend hosting)

Project structure

aidas-boutique/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── README.md

Running it locally

Clone it first:

bashgit clone https://github.com/sajil-s/Aidas-boutique.git

Install both frontend and backend deps:

bashcd frontend
npm install

cd ../backend
npm install

You'll need a .env file in backend/:

envPORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development

And one in frontend/:

envVITE_API_URL=http://localhost:8000/api

Then just run npm run dev in both folders (separate terminals).

Deployment

Frontend is deployed on Vercel, backend on Render, database on MongoDB Atlas. Nothing fancy — just made sure CLIENT_URL on the backend and VITE_API_URL on the frontend point to the right places once both were live, and that CORS was actually configured to allow the deployed frontend URL (spent way too long debugging a CORS error that turned out to be a trailing slash mismatch).

Security notes


Passwords are hashed, never stored in plain text
JWTs live in HTTP-only cookies so they're not accessible via JS
Admin routes are protected separately from regular user routes
All Mongo ObjectIds get validated before queries run, to avoid crashy 500s from bad IDs


Screenshots

<img width="1893" height="930" alt="image" src="https://github.com/user-attachments/assets/c51df3df-b5e3-4f77-9a22-affb9ab0ebe1" />

About

Built by Sajil — this was a personal project to practice building a complete e-commerce flow end to end, from auth to payments to an admin panel. Feedback welcome.

GitHub: https://github.com/sajil-s









