#  Haru no Yorokobi — Restaurant Tablet Ordering & Staff Dashboard System

Haru no Yorokobi is a **full-stack, tablet-based restaurant ordering system** that simulates a real in-restaurant POS workflow.  
Customers place orders on a tablet at their table, select payment methods, and staff manage orders through a live dashboard.

This project follows **production-style frontend–backend separation**, snapshot-based order modeling, and real-world POS logic.

---

##  Features

### Customer (Tablet Interface)
- Tablet-optimized UI (iPad-style layout)
- Browse menu by category (Ramen, Sushi, Bento, etc.)
- Add/remove items from cart
- Table selection per order
- Multiple payment methods:
  - QR / UPI
  - Card
  - Cash
- Order confirmation screen with backend-generated Order ID

### Staff Dashboard
- Live order feed (auto-refresh)
- Displays:
  - Table number
  - Order ID
  - Ordered items with quantities
  - Total bill amount
  - Payment method & payment status
- Order lifecycle management:
  - NEW → ONGOING → COMPLETED
- Visual distinction between **PAID** and **UNPAID** orders
- Scrollable dashboard for high order volume

---

##  System Architecture

```
Customer Tablet (React)
        ↓ REST API
Backend Server (Node + Express)
        ↓
In-memory Order Store
        ↓
Staff Dashboard (React)
```

### Design Principles Used
- Snapshot-based order storage (menu changes don’t affect old orders)
- Backend as single source of truth
- Stateless frontend routing
- Clear separation of concerns

---

##  Project Folder Structure

```
Haru-no-Yorokobi/
├── backend/                # Node.js + Express API
│   ├── routes/
│   │   ├── menu.js         # Menu data API
│   │   └── orders.js       # Order creation & status updates
│   ├── uploads/
│   │   └── images/         # Static assets (QR codes, etc.)
│   ├── data/               # Menu JSON data
│   └── server.js           # Express server entry point
│
├── frontend/               # React + Vite client
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Menu.jsx            # Customer ordering screen
│   │   │   ├── Payment.jsx         # Payment method selection
│   │   │   ├── Confirmation.jsx    # Order confirmation
│   │   │   └── Dashboard.jsx       # Staff dashboard
│   │   ├── components/
│   │   │   └── IpadFrame.jsx        # Tablet layout wrapper
│   │   ├── styles/                 # Global & Tailwind styles
│   │   └── main.jsx
│   └── vite.config.js
│
├── .gitignore              
├── package.json
└── README.md
```

---

##  Order Flow (End-to-End)

1. Customer selects items from menu
2. Cart is converted into **item snapshots** (name, price, qty)
3. Customer selects table number
4. Payment method chosen (QR / Card / Cash)
5. Order sent to backend:
   - Payment status determined
   - Order ID generated server-side
6. Staff dashboard fetches and displays order
7. Staff updates order status (ONGOING → COMPLETED)

---

##  Payment Logic

| Method | Payment Status |
|------|---------------|
| QR   | PAID          |
| Card | PAID          |
| Cash | UNPAID        |

Payment status is stored independently from order lifecycle status.

---

##  Order Lifecycle

```
NEW → ONGOING → COMPLETED
```

This allows staff to manage kitchen flow realistically.

---

##  Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- REST APIs

### Data Handling
- Snapshot-based order modeling
- In-memory order storage (can be extended to DB)

---

##  Running the Project Locally

```bash
simply double click run_server.bat 
```
### Backend
```bash
cd backend
npm install
node server.js
```

Backend runs on:
```
http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

##  Future Improvements

- Persist orders to a database (MongoDB / SQLite / Firebase)
- Staff authentication / PIN-based access
- Kitchen-only condensed dashboard
- WebSocket-based real-time updates
- Analytics (order time, revenue, table usage)

---

##  Why This Project Matters

This project is **not a mock UI**.  
It demonstrates:
- Real POS data modeling
- Frontend–backend contract design
- Payment and fulfillment separation
- Scalable UI patterns
- Debugging of real-world integration issues

---

##  License

This project is for educational and demonstration purposes.

---

**Built with care as a realistic restaurant POS system.**
