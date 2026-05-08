# Multi-Vendor Marketplace 🛒

A full-stack **Multi-Vendor eCommerce Marketplace** built with **React, Redux Toolkit, Django REST Framework, PostgreSQL, Razorpay, and Tailwind CSS**.

This platform allows customers to browse products, add items to cart, place orders, and make secure payments, while vendors can manage products and update order statuses from their own dashboard.

---

# 🚀 Features

## 👤 Authentication & Authorization

* JWT Authentication
* User Registration & Login
* Vendor Registration
* Role-based Access Control
* Protected Routes

---

# 🏪 Vendor Features

* Vendor Dashboard
* Automatic Vendor Profile Creation
* Add Products
* Edit Products
* Delete Products
* View Vendor Orders
* Update Order Status

  * Pending
  * Processing
  * Shipped
  * Delivered
  * Cancelled

---

# 🛍️ Customer Features

* Browse Products
* Product Detail Page
* Add to Cart
* Increase / Decrease Quantity
* Remove from Cart
* Clear Cart
* Checkout System
* View Orders
* Live Order Status Tracking

---

# 💳 Payment Integration

Integrated with:

* Razorpay Payment Gateway

Features:

* Create Payment Orders
* Verify Payment Signature
* Secure Checkout Flow

---

# ☁️ Image Uploads

Integrated with:

* Cloudinary

Used for:

* Product Image Hosting
* Optimized Image Delivery

---

# 🎨 Frontend Features

* Modern Responsive UI
* Tailwind CSS Styling
* React Hot Toast Notifications
* Mobile Responsive Navbar
* Vendor/User Conditional Navigation
* Clean Dashboard Layouts

---

# 🧠 Tech Stack

## Frontend

* React
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React Icons
* Vite

---

## Backend

* Django
* Django REST Framework
* Simple JWT
* PostgreSQL
* Cloudinary
* Razorpay

---

# 🗄️ Database

Production Ready:

* PostgreSQL (Neon)

Development:

* SQLite

---

# 🌐 Deployment

## Frontend

* Vercel

## Backend

* Render

---

# 📂 Project Structure

```bash
multivendor_marketplace/
│
├── backend/
│   ├── accounts/
│   ├── vendors/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── config/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── features/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1. Clone Repository

```bash
git clone <your_repo_url>
cd multivendor_marketplace
```

---

## 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Create `.env`

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_postgresql_url

CLOUDINARY_URL=your_cloudinary_url

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret
```

---

## 5. Run Migrations

```bash
python manage.py migrate
```

---

## 6. Start Backend

```bash
python manage.py runserver
```

Backend runs on:

```bash
http://localhost:8000
```

---

# ⚛️ Frontend Setup

## 1. Navigate to Frontend

```bash
cd frontend
```

---

## 2. Install Packages

```bash
npm install
```

---

## 3. Create `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 4. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🚀 Production Deployment

## Backend (Render)

### Build Command

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

### Start Command

```bash
gunicorn config.wsgi
```

---

## Frontend (Vercel)

### Build Command

```bash
npm run build
```

### Output Directory

```bash
dist
```

---

# 📸 Screens Included

* Authentication Pages
* Home Page
* Product Cards
* Product Details
* Cart Page
* Orders Page
* Vendor Dashboard
* Vendor Orders
* Add/Edit Product

---

# 🔥 Future Improvements

* Wishlist
* Product Reviews & Ratings
* Search & Filtering
* Coupons & Discounts
* Real-time Notifications
* Admin Dashboard
* Analytics
* Chat System
* AI Product Recommendations

---

# 📄 License

This project is open source and available under the MIT License.

---

# 👨‍💻 Developer

Built with ❤️ using React & Django REST Framework.
