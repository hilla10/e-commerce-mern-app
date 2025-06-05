# 🛒 Full-Stack E-Commerce App (MERN + Stripe)

A full-featured, responsive e-commerce web app built with the MERN stack. This project includes a customer-facing frontend, an admin dashboard for managing products/orders, and secure Stripe payment integration.

🚀 **Live Demo**  
- 🛍️ Customer Frontend: [https://e-commerce-mern-app-frontend.vercel.app](https://e-commerce-mern-app-frontend.vercel.app)  
- 🛠️ Admin Dashboard: [https://e-commerce-mern-app-admin.vercel.app](https://e-commerce-mern-app-admin.vercel.app)

---

## 🔐 Admin Access

Use the following credentials to log in as an admin:

- **Email**: `admin@forever.com`  
- **Password**: `admin@123`

---

## 📚 Features

### 🧑 Customer Features
- User registration & login
- Product browsing & filtering
- Shopping cart & quantity management
- Checkout process with Stripe integration
- View order history

### 🛠️ Admin Features
- Secure login
- Dashboard with order and product stats
- Product CRUD (create, update, delete)
- Order status management

---

## 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt
- cloudinary
- Stripe API (for secure payment)

---

## 💳 Payment Integration

- **Stripe** is used for handling payment processing.
- Customers can enter their card details securely via the Stripe Checkout interface.
- Test Card: `4242 4242 4242 4242` with any future expiration and CVC

---


---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hilla10/e-commerce-mern-app.git
cd e-commerce-mern-app

```
### 2. Backen Setup

```
cd server
npm install
npm run dev

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

```
### 3.  Client Setup (User Frontend)

```
cd ../frontend
npm install
npm run dev

```
### 4. Admin Setup

```
cd ../admin
npm install
npm run dev

```
🧠 What I Learned

- Building and deploying a full-stack app using the MERN stack

- Working with third-party APIs like Stripe

- Implementing authentication and route protection

- Admin dashboard design and role-based access

- Deploying frontend apps to Vercel and backend with cloud database

![Homepage]

📌 Disclaimer
- This project is created for educational and portfolio purposes. All product data and images are placeholders. Stripe is used in test mode.

👨‍💻 Author
Hailemichael Negusse
GitHub: [hilla10](https://github.com/hilla10)

This project is open-source and available under the MIT License













