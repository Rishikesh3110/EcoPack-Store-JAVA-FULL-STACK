# 🌿 EcoPack Store

A modern full-stack e-commerce web application for eco-friendly packaging products, built using **React**, **Spring Boot**, and **MySQL**. The application allows users to browse sustainable packaging products, manage a shopping cart, and place orders, while providing administrators with product management capabilities.

---

## 📌 Project Overview

EcoPack Store is designed to promote sustainable and environmentally friendly packaging solutions through an intuitive online shopping experience.

The project demonstrates full-stack web development by integrating a React frontend with a Spring Boot REST API and a MySQL database.

---

## ✨ Features

### 👤 User Features
- Browse eco-friendly products
- Search products by name
- Filter products by category
- View product details
- Add products to cart
- Update cart items
- Remove products from cart
- Checkout process
- Order confirmation

### 🛠 Admin Features
- Add new products
- Edit existing products
- Delete products
- Manage product inventory

---

## 🛒 Product Categories

- 🛍 Eco Bags
- 📦 Paper Food Boxes
- 🍃 Compostable Garbage Bags
- 🍽 Bamboo & Eco-Friendly Utensils
- 📮 Eco Courier Covers

---

## 🏗 Tech Stack

### Frontend
- React.js
- Vite
- Bootstrap
- React Router
- Axios

### Backend
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

### Database
- MySQL

---

## 📂 Project Structure

```
EcoPack-Store
│
├── frontend/        # React Application
│
├── MiniCart/        # Spring Boot Backend
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17 or above
- Node.js
- npm
- MySQL
- Spring Tool Suite (STS) or IntelliJ IDEA
- VS Code

---

## ⚙ Backend Setup

1. Open the `MiniCart` project in Spring Tool Suite.

2. Configure your MySQL credentials in:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/minicart
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

3. Run the Spring Boot application.

Backend runs on:

```
http://localhost:8080
```

---

## 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🗄 Database

Create a MySQL database:

```sql
CREATE DATABASE minicart;
```

Update your database configuration inside:

```
application.properties
```

---

## 📸 Application Modules

- Home Page
- Product Listing
- Search & Category Filter
- Product Management
- Shopping Cart
- Checkout
- Responsive Navigation

---

## 🎯 Learning Outcomes

This project demonstrates:

- Full Stack Web Development
- REST API Development
- CRUD Operations
- React Component Architecture
- Database Integration
- Client-Server Communication
- State Management
- Responsive UI Design

---

## 🔮 Future Enhancements

- User Authentication
- JWT Security
- Payment Gateway Integration
- Wishlist
- Product Reviews
- Order Tracking
- Email Notifications
- Admin Analytics Dashboard

---

## 👨‍💻 Developed By

**Rishikesh Ganta**

B.Tech - Artificial Intelligence & Machine Learning

---

## 📜 License

This project is developed for educational purposes and learning full-stack web development using React, Spring Boot, and MySQL.
