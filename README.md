# Turf Finder - Full-Stack Turf Booking App


Turf Finder is a complete, full-stack MERN application that allows users to discover, book, and pay for sports turfs in their desired location. It features a real-time availability calendar, a secure payment gateway with Razorpay, and robust backend logic to ensure a seamless and reliable booking experience.

---

## ✨ Key Features

*   **Advanced Turf Search:** Users can search for turfs by location and apply multiple filters for price, turf type (indoor/outdoor), and amenities.
*   **Real-Time Availability:** A dynamic calendar on each turf's detail page shows available and booked slots in real-time, preventing booking conflicts.
*   **Secure Payments:** End-to-end payment integration using **Razorpay**, with backend order creation and cryptographic signature verification for transaction integrity.
*   **Secure User Authentication:** Role-based user and admin access using **JWT (JSON Web Tokens)**, with password hashing via **bcrypt**.
*   **Atomic Bookings:** The backend is engineered to prevent race conditions and double-bookings, ensuring that a slot can only be booked once, even with simultaneous requests.
*   **Admin Dashboard (Future Scope):** A dedicated interface for turf owners to manage their turf details, view bookings, and analyze revenue.
*   **User Profiles (Future Scope):** A section for users to view their past and upcoming bookings.

---

## 📸 Screenshots

| Homepage with Filters | Turf Details & Calendar |
| :------------------: | :-------------------: |
| ![Homepage]((https://github.com/manideepguru/Turf-Booking-App/blob/main/screenshots/Homepage.png)) | ![Details Page](https://placehold.co/600x400/png?text=Details%20Page%20Screenshot) |



---

## 🛠️ Tech Stack

This project is a monorepo containing both the frontend and backend.

#### **Frontend:**

*   **React.js:** A powerful JavaScript library for building user interfaces.
*   **Vite:** A lightning-fast frontend build tool.
*   **React Router:** For client-side routing and navigation.
*   **Axios:** For making HTTP requests to the backend API.
*   **React Calendar:** For the interactive booking calendar.
*   **React Toastify:** For user-friendly notifications.

#### **Backend:**

*   **Node.js:** A JavaScript runtime for building the server.
*   **Express.js:** A web framework for creating the RESTful API.
*   **MongoDB:** A NoSQL database for storing user, turf, and booking data.
*   **Mongoose:** An ODM for modeling and interacting with MongoDB.
*   **JSON Web Token (JWT):** For secure, stateless authentication.
*   **Bcrypt.js:** For hashing user passwords.
*   **Razorpay SDK:** For server-side payment order creation and verification.
*   **CORS:** For enabling cross-origin requests.
*   **Dotenv:** For managing environment variables.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

*   Node.js (v18 or later)
*   npm
*   MongoDB (local installation or a free Atlas account)
*   Git

### **Installation & Setup**

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/turf-booking-app.git
    cd turf-booking-app
    ```

2.  **Setup the Backend:**
    *   Navigate to the backend folder:
        ```sh
        cd backend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your own keys.
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_jwt_key
        RAZORPAY_KEY_ID=your_razorpay_test_key_id
        RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
        ```
    *   Start the backend server:
        ```sh
        npm run dev
        ```
    The server will be running on `http://localhost:5001`.

3.  **Setup the Frontend:**
    *   Open a new terminal and navigate to the frontend folder:
        ```sh
        cd frontend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Start the frontend development server:
        ```sh
        npm run dev
        ```
    The application will be running on `http://localhost:5173`.

---

## 👤 Contact

Manideep Guru - [Your LinkedIn URL] - [your.email@example.com]

Project Link: [https://github.com/your-username/turf-booking-app](https://github.com/your-username/turf-booking-app)
