# Cravings - Development Roadmap & Class Planning

> **Start Date**: February 19, 2026
> **Deadline**: March 1, 2026
> **Available Days**: 10 Working Days
> **Daily Commitment**: Minimum 6-8 hours/day

---

## Current Status After Code Review

### What is DONE (No Work Needed)

| Module | Status | Details |
|--------|--------|---------|
| **Authentication System** | ✅ Complete | Register, Login, Logout, OTP, Forget Password all working |
| **JWT + Cookie Auth** | ✅ Complete | `parleG` cookie, `Protect`, `ManagerProtect`, `CustomerProtect`, `AdminProtect`, `PartnerProtect`, `OtpProtect` middleware — all in place |
| **User Profile CRUD** | ✅ Complete | Update profile, change photo (Cloudinary), reset password |
| **Restaurant Profile CRUD** | ✅ Complete | Update profile, change photo, reset password |
| **Restaurant Menu CRUD** | ✅ Complete | Add, edit, get menu items with multi-image upload |
| **Public APIs** | ✅ Complete | Get all restaurants, get restaurant menu, contact form |
| **Frontend Pages** | ✅ Complete | Home, About, Contact, Login, Register, OrderNow, RestaurantDisplayMenu |
| **Frontend Cart (localStorage)** | ✅ Partial | Add to cart, clear cart, quantity change on checkout page — but cart is **only in localStorage**, no backend persistence |
| **Checkout Page UI** | ✅ Partial | Full UI built with price summary, delivery address, payment method selector, promo code input — but **no backend API call** on "Place Order" |

### What is PENDING (Needs to be Built)

| Priority | Module | Current State |
|----------|--------|---------------|
| 🔴 **P0** | Order Model (Schema) | Does NOT exist — no `orderModel.js` |
| 🔴 **P0** | Order Controller + Routes | Does NOT exist — no order APIs |
| 🔴 **P0** | Connect Checkout → Create Order API | `handlePlaceOrder()` in CheckoutPage.jsx only shows a toast, no API call |
| 🔴 **P0** | Customer Order History | `UserOrders.jsx` is an **empty component** — just returns `<div>UserOrders</div>` |
| 🔴 **P0** | Restaurant Incoming Orders | `RestaurantOrders.jsx` is a **placeholder** — no data, no accept/reject |
| 🟠 **P1** | Rider Dashboard | `RiderDashboard.jsx` returns only `<div>RiderDashboard</div>` — completely empty |
| 🟠 **P1** | Rider Order Assignment & Delivery | No rider controller, no rider routes, no delivery flow |
| 🟠 **P1** | Payment Gateway (Razorpay) | No payment integration — checkout just shows success toast |
| 🟡 **P2** | Search & Filter on OrderNow page | Currently lists all restaurants without any search bar or filters |
| 🟡 **P2** | User Overview Dashboard | `UserOverview.jsx` is **empty** — returns empty fragment |
| 🟡 **P2** | User Transactions | `UserTransactions.jsx` is **empty** |
| 🟡 **P2** | Restaurant Overview (Real Data) | `RestaurantOverview.jsx` has **hardcoded zeros** — not connected to DB |
| 🟡 **P2** | Restaurant Earnings (Real Data) | `RestaurantEarnings.jsx` is a **placeholder** |
| 🟢 **P3** | User & Restaurant HelpDesk | Both are empty/placeholder components |
| 🟢 **P3** | Admin Dashboard | Returns only `<div>AdminDashboard</div>` — completely empty |

---

## 10-Day Class-by-Class Roadmap

---

### DAY 1 (Feb 19) — Order Model + Order Backend APIs

**Goal**: Build the entire Order backend so every other feature can depend on it.

#### Class 1: Order Model (`server/src/models/orderModel.js`)

**Topics to Learn/Revise**:
- Mongoose Schema design with nested objects & arrays
- Schema references (`ref` + `ObjectId`)
- Enum fields for order status
- Timestamps

**What to Build**:

```
Order Schema Fields:
├── customerID        → ObjectId ref "User" (required)
├── restaurantID      → ObjectId ref "User" (required)
├── riderID           → ObjectId ref "User" (default: null)
├── items[]           → Array of:
│   ├── menuItemID    → ObjectId ref "Menu"
│   ├── itemName      → String
│   ├── price         → Number
│   ├── quantity      → Number
│   └── image         → String (url)
├── deliveryAddress   → Object:
│   ├── address       → String
│   ├── city          → String
│   ├── pin           → String
│   └── geoLocation   → { lat, lon }
├── pricing           → Object:
│   ├── subtotal      → Number
│   ├── tax           → Number
│   ├── deliveryCharge→ Number
│   └── total         → Number
├── paymentMethod     → String enum ["credit-card","upi","wallet","cod"]
├── paymentStatus     → String enum ["pending","paid","failed","refunded"]
├── orderStatus       → String enum ["placed","confirmed","preparing","on-way","delivered","cancelled"]
├── paymentID         → String (from Razorpay/Stripe, default: null)
└── timestamps        → createdAt, updatedAt (auto)
```

**Checklist**:
- [ ] Create `server/src/models/orderModel.js`
- [ ] Define schema with all fields, proper types, enums, defaults
- [ ] Add Mongoose `timestamps: true`
- [ ] Export the model

---

#### Class 2: Order Controller (`server/src/controllers/orderController.js`)

**Topics to Learn/Revise**:
- Express async controller pattern (try/catch with `next(error)`)
- Mongoose `.create()`, `.find()`, `.findById()`, `.populate()`
- Query filtering & sorting

**What to Build**:

| Function | Method | Purpose |
|----------|--------|---------|
| `createOrder` | POST | Customer places a new order from cart data |
| `getCustomerOrders` | GET | Customer fetches their order history |
| `getRestaurantOrders` | GET | Restaurant fetches all incoming orders |
| `getSingleOrder` | GET | Get detailed info of one order |
| `updateOrderStatus` | PATCH | Restaurant/Rider updates order status |
| `cancelOrder` | PATCH | Customer cancels an order (only if status is "placed") |
| `assignRider` | PATCH | Assign a rider to an order |
| `getRiderOrders` | GET | Rider fetches assigned orders |

**Checklist**:
- [ ] Create `server/src/controllers/orderController.js`
- [ ] Implement `createOrder` — accept cart items, calculate totals, create order with status "placed"
- [ ] Implement `getCustomerOrders` — filter by `customerID`, sort newest first, populate restaurant info
- [ ] Implement `getRestaurantOrders` — filter by `restaurantID`, sort newest first
- [ ] Implement `getSingleOrder` — findById with full populate
- [ ] Implement `updateOrderStatus` — validate status transitions
- [ ] Implement `cancelOrder` — only allow if status is "placed"
- [ ] Implement `assignRider` — set riderID on order
- [ ] Implement `getRiderOrders` — filter by `riderID`

---

#### Class 3: Order Router (`server/src/routers/orderRouter.js`)

**Topics to Learn/Revise**:
- Express Router setup
- Chaining middleware (Protect → RoleProtect → Controller)

**What to Build**:

```
POST   /order/create              → Protect + CustomerProtect → createOrder
GET    /order/my-orders           → Protect + CustomerProtect → getCustomerOrders
GET    /order/:id                 → Protect → getSingleOrder
PATCH  /order/cancel/:id          → Protect + CustomerProtect → cancelOrder
GET    /order/restaurant-orders   → Protect + ManagerProtect → getRestaurantOrders
PATCH  /order/update-status/:id   → Protect + ManagerProtect → updateOrderStatus
PATCH  /order/assign-rider/:id    → Protect + ManagerProtect → assignRider
GET    /order/rider-orders        → Protect + PartnerProtect → getRiderOrders
```

**Checklist**:
- [ ] Create `server/src/routers/orderRouter.js`
- [ ] Wire all routes with proper middleware chain
- [ ] Register router in `server/index.js` → `app.use("/order", OrderRouter)`
- [ ] Test all endpoints with Postman/Thunder Client

---

### DAY 2 (Feb 20) — Connect Frontend Checkout → Order API + Customer Order History

**Goal**: The customer can actually place orders and see their order history.

#### Class 4: Connect Checkout Page to Backend

**Topics to Learn/Revise**:
- Axios POST requests with JSON body
- Handling loading states and error responses
- localStorage cleanup after order placement

**What to Build**:

**File**: `client/src/pages/CheckoutPage.jsx`

Update `handlePlaceOrder()`:
1. Build order payload from cart state (items, pricing, address from user, payment method)
2. Call `POST /order/create` with the payload
3. On success → clear localStorage cart → navigate to user dashboard orders tab
4. On error → show toast with error message

**Checklist**:
- [ ] Update `handlePlaceOrder()` in `CheckoutPage.jsx` to call API
- [ ] Build proper payload shape matching order schema
- [ ] Handle success: clear cart, toast, navigate
- [ ] Handle error: toast with server message
- [ ] Test full flow: Browse → Add to Cart → Checkout → Place Order

---

#### Class 5: Customer Order History UI (`UserOrders.jsx`)

**Topics to Learn/Revise**:
- `useEffect` for data fetching on mount
- Rendering lists with status badges (colored pills)
- Date formatting with `new Date().toLocaleDateString()`

**What to Build**:

**File**: `client/src/components/userDashboard/UserOrders.jsx`

```
UserOrders Component:
├── Fetch orders on mount → GET /order/my-orders
├── Loading state
├── Order list with:
│   ├── Order ID (last 8 chars)
│   ├── Restaurant name
│   ├── Items summary (name × qty)
│   ├── Total amount
│   ├── Order status badge (color-coded)
│   │   ├── placed     → yellow
│   │   ├── confirmed  → blue
│   │   ├── preparing  → orange
│   │   ├── on-way     → purple
│   │   ├── delivered  → green
│   │   └── cancelled  → red
│   ├── Date & time
│   └── Cancel button (only if status === "placed")
└── Empty state if no orders
```

**Checklist**:
- [ ] Rewrite `UserOrders.jsx` with real data fetching
- [ ] Create order card component with all details
- [ ] Add status badge with color coding
- [ ] Add cancel order functionality (calls `PATCH /order/cancel/:id`)
- [ ] Handle loading and empty states
- [ ] Test: Place order → See it in order history → Cancel it

---

### DAY 3 (Feb 21) — Restaurant Order Management

**Goal**: Restaurant manager can see incoming orders and update their status.

#### Class 6: Restaurant Orders UI (`RestaurantOrders.jsx`)

**Topics to Learn/Revise**:
- Tab-based filtering (All / New / Preparing / Completed)
- Status update dropdowns or buttons
- Real-time UX (refresh on status change)

**What to Build**:

**File**: `client/src/components/restaurantDashboard/RestaurantOrders.jsx`

```
RestaurantOrders Component:
├── Fetch orders on mount → GET /order/restaurant-orders
├── Filter tabs: All | New (placed) | Confirmed | Preparing | On-Way | Delivered
├── Each Order Card:
│   ├── Order ID
│   ├── Customer name
│   ├── Items list with quantities
│   ├── Total amount
│   ├── Current status badge
│   ├── Order time
│   ├── Delivery address
│   └── Action buttons:
│       ├── Accept Order (placed → confirmed)
│       ├── Start Preparing (confirmed → preparing)
│       ├── Mark Ready / Assign Rider (preparing → on-way)
│       └── Reject/Cancel Order
└── Empty state per tab
```

**Checklist**:
- [ ] Rewrite `RestaurantOrders.jsx` with complete UI
- [ ] Fetch orders from `GET /order/restaurant-orders`
- [ ] Implement tab filtering by order status
- [ ] Add action buttons for each status transition
- [ ] Each button calls `PATCH /order/update-status/:id` with new status
- [ ] Refresh order list after status update
- [ ] Test: Customer places order → Restaurant sees it → Accepts → Prepares → Marks ready

---

#### Class 7: Restaurant Overview & Earnings (Real Data)

**Topics to Learn/Revise**:
- Aggregation queries (or simple JS calculation from orders)
- Dashboard stat cards

**What to Build**:

Create a new backend endpoint or compute on frontend.

**Option A (Simpler — frontend calculation)**:
- Fetch all restaurant orders
- Calculate: Total Orders, Active Orders, Total Earnings, Delivered count
- Display in the existing stat cards in `RestaurantOverview.jsx`

**Option B (Better — backend endpoint)**:
- Create `GET /order/restaurant-stats` endpoint
- Returns: totalOrders, activeOrders, totalEarnings, todayOrders, weeklyEarnings

**Also update** `RestaurantEarnings.jsx`:
- Display list of delivered orders with amounts
- Show daily/weekly totals

**Checklist**:
- [ ] Add stats API or calculate on frontend from orders data
- [ ] Update `RestaurantOverview.jsx` — replace hardcoded "0" with real numbers
- [ ] Update `RestaurantEarnings.jsx` — show earnings from delivered orders
- [ ] Add "Recent Orders" section in overview with last 5 orders
- [ ] Test: Complete a few orders → Check overview stats update

---

### DAY 4 (Feb 22) — Rider Dashboard + Delivery Flow

**Goal**: Build the complete rider experience — dashboard, order acceptance, delivery updates.

#### Class 8: Rider Controller + Router (Backend)

**Topics to Learn/Revise**:
- Reusing existing middleware (`Protect`, `PartnerProtect`)
- Query filtering with multiple conditions

**What to Build**:

**File**: `server/src/controllers/riderController.js`

| Function | Purpose |
|----------|---------|
| `getAvailableOrders` | Get orders with status "preparing" that have no rider assigned (riderID is null) |
| `acceptOrder` | Rider accepts a delivery — sets riderID and status to "on-way" |
| `completeDelivery` | Rider marks order as "delivered" |
| `getRiderDeliveries` | Get all orders assigned to this rider |

**File**: `server/src/routers/riderRouter.js`

```
GET    /rider/available-orders     → Protect + PartnerProtect → getAvailableOrders
PATCH  /rider/accept-order/:id     → Protect + PartnerProtect → acceptOrder
PATCH  /rider/complete-delivery/:id→ Protect + PartnerProtect → completeDelivery
GET    /rider/my-deliveries        → Protect + PartnerProtect → getRiderDeliveries
```

**Checklist**:
- [ ] Create `server/src/controllers/riderController.js`
- [ ] Create `server/src/routers/riderRouter.js`
- [ ] Register in `server/index.js` → `app.use("/rider", RiderRouter)`
- [ ] Implement all 4 functions
- [ ] Test with Postman

---

#### Class 9: Rider Dashboard Frontend

**Topics to Learn/Revise**:
- Sidebar component creation (follow UserSideBar/RestaurantSideBar pattern)
- Conditional rendering based on active tab

**What to Build**:

**File**: `client/src/pages/dashboards/RiderDashboard.jsx`

Build similar to UserDashboard and RestaurantDashboard with:

```
RiderDashboard Layout:
├── RiderSideBar (new component)
│   ├── Overview
│   ├── Available Orders
│   ├── My Deliveries
│   ├── Profile
│   └── Help Desk
├── RiderOverview (new component)
│   ├── Today's deliveries count
│   ├── Total deliveries
│   ├── Active delivery (currently on-way)
│   └── Earnings
├── RiderAvailableOrders (new component)
│   ├── List of orders with status "preparing" and no rider
│   ├── Restaurant name, items, delivery address
│   └── "Accept Delivery" button
├── RiderMyDeliveries (new component)
│   ├── Active delivery (on-way) with "Mark Delivered" button
│   ├── Completed deliveries history
│   └── Status badges
└── RiderProfile → Reuse pattern from UserProfile
```

**New Files to Create**:
```
client/src/components/riderDashboard/
├── RiderSideBar.jsx
├── RiderOverview.jsx
├── RiderAvailableOrders.jsx
├── RiderMyDeliveries.jsx
└── RiderProfile.jsx
```

**Checklist**:
- [ ] Create `client/src/components/riderDashboard/` folder
- [ ] Create `RiderSideBar.jsx` (copy pattern from RestaurantSideBar, change menu items)
- [ ] Create `RiderOverview.jsx` with stat cards
- [ ] Create `RiderAvailableOrders.jsx` — fetch from `/rider/available-orders`, accept button
- [ ] Create `RiderMyDeliveries.jsx` — fetch from `/rider/my-deliveries`, mark delivered button
- [ ] Create `RiderProfile.jsx` (can reuse UserProfile pattern)
- [ ] Update `RiderDashboard.jsx` to use sidebar + tab switching
- [ ] Test: Restaurant marks order ready → Rider sees it → Accepts → Delivers

---

### DAY 5 (Feb 23) — Full Order Flow Testing + Fix Issues

**Goal**: Test the complete end-to-end flow and fix any bugs.

#### Class 10: End-to-End Order Flow Testing

**The Complete Flow to Test**:

```
Step 1: Customer browses restaurants           → OrderNow page
Step 2: Customer views menu & adds to cart     → RestaurantDisplayMenu page
Step 3: Customer goes to checkout              → CheckoutPage
Step 4: Customer places order                  → POST /order/create
Step 5: Restaurant sees new order              → RestaurantOrders (status: "placed")
Step 6: Restaurant accepts order               → PATCH status → "confirmed"
Step 7: Restaurant starts preparing            → PATCH status → "preparing"
Step 8: Rider sees available order             → RiderAvailableOrders
Step 9: Rider accepts delivery                 → PATCH /rider/accept-order
Step 10: Customer sees "on-way" status         → UserOrders
Step 11: Rider completes delivery              → PATCH /rider/complete-delivery
Step 12: Order status → "delivered"            → All dashboards update
```

**Checklist**:
- [ ] Test complete flow with 3 different user accounts (customer, manager, partner)
- [ ] Fix any API errors found
- [ ] Fix any frontend bugs
- [ ] Verify status transitions work correctly
- [ ] Verify data shows correctly on all dashboards
- [ ] Fix cancel order flow
- [ ] Ensure cart clears properly after order
- [ ] Ensure order appears immediately after placement

---

### DAY 6 (Feb 24) — Search & Filter Functionality

**Goal**: Add search and filtering to the OrderNow page and restaurant menu.

#### Class 11: Search & Filter Backend

**Topics to Learn/Revise**:
- MongoDB text search / regex search
- Query string parameters in Express (`req.query`)
- Mongoose `.find()` with dynamic filter objects

**What to Build**:

**Update** `server/src/controllers/publicControlller.js`:

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `searchRestaurants` | `GET /public/search-restaurants?q=&cuisine=&city=` | Search by name, cuisine, city |
| `searchMenuItems` | `GET /public/search-menu?q=&type=&minPrice=&maxPrice=` | Search menu items across all restaurants |

**Checklist**:
- [ ] Add `searchRestaurants` function — supports query params: `q` (name search), `cuisine`, `city`
- [ ] Add `searchMenuItems` function — supports query params: `q` (item name), `type` (veg/non-veg), `minPrice`, `maxPrice`
- [ ] Use MongoDB `$regex` with case-insensitive flag for text search
- [ ] Add new routes in `publicRouter.js`
- [ ] Test with Postman

---

#### Class 12: Search & Filter Frontend

**Topics to Learn/Revise**:
- Controlled form inputs for search
- Debouncing search input (wait 300ms after user stops typing)
- Dynamic query string building
- Conditional rendering based on search results

**What to Build**:

**Update** `client/src/pages/OrderNow.jsx`:

```
Updated OrderNow Page:
├── Search Bar (top section)
│   ├── Text input for restaurant/food name
│   ├── Cuisine filter dropdown (Indian, Chinese, Italian, etc.)
│   ├── City filter dropdown
│   └── Search button + Clear filters button
├── Results Section
│   ├── Result count
│   ├── Restaurant cards grid (existing design)
│   └── "No results found" state
└── Loading state during search
```

**Checklist**:
- [ ] Add search bar UI to `OrderNow.jsx`
- [ ] Add cuisine filter dropdown
- [ ] Add city filter input
- [ ] Wire search to `GET /public/search-restaurants?q=&cuisine=&city=`
- [ ] Show filtered results
- [ ] Add clear filters button to reset
- [ ] Handle empty search results gracefully
- [ ] Test: Search by restaurant name, filter by cuisine, combine filters

---

### DAY 7 (Feb 25) — Payment Gateway Integration (Razorpay)

**Goal**: Integrate Razorpay payment gateway for real payments.

#### Class 13: Razorpay Backend Setup

**Topics to Learn/Revise**:
- Razorpay Node.js SDK
- Creating Razorpay orders
- Verifying payment signatures (crypto + HMAC)
- Webhook handling

**Prerequisites**:
- Create Razorpay account (https://razorpay.com)
- Get API Key ID and Key Secret from Razorpay Dashboard → Settings → API Keys
- Use **Test Mode** keys for development

**What to Build**:

1. **Install**: `npm install razorpay` in server folder

2. **Config File**: `server/src/config/razorpay.js`
   - Initialize Razorpay instance with key_id and key_secret from `.env`

3. **Payment Controller**: `server/src/controllers/paymentController.js`

| Function | Purpose |
|----------|---------|
| `createPaymentOrder` | Create a Razorpay order with amount, currency, receipt |
| `verifyPayment` | Verify payment signature after customer pays |
| `getPaymentDetails` | Fetch payment details by paymentID |

4. **Payment Router**: `server/src/routers/paymentRouter.js`

```
POST   /payment/create-order     → Protect + CustomerProtect → createPaymentOrder
POST   /payment/verify            → Protect + CustomerProtect → verifyPayment
GET    /payment/:id               → Protect → getPaymentDetails
```

5. **Update `.env`**:
```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

**Checklist**:
- [ ] Install `razorpay` package
- [ ] Create `server/src/config/razorpay.js`
- [ ] Create `server/src/controllers/paymentController.js`
- [ ] `createPaymentOrder` → calls `razorpayInstance.orders.create({ amount, currency, receipt })`
- [ ] `verifyPayment` → validates `razorpay_signature` using HMAC SHA256
- [ ] On successful verification → update order's `paymentStatus` to "paid" and `paymentID`
- [ ] Create `server/src/routers/paymentRouter.js`
- [ ] Register in `index.js` → `app.use("/payment", PaymentRouter)`
- [ ] Test with Postman

---

#### Class 14: Razorpay Frontend Integration

**Topics to Learn/Revise**:
- Loading Razorpay checkout script dynamically
- Razorpay Checkout options object
- Handling payment success/failure callbacks

**What to Build**:

**Update** `client/src/pages/CheckoutPage.jsx`:

```
Updated handlePlaceOrder() Flow:
1. Call POST /order/create → get order back with _id
2. Call POST /payment/create-order → get razorpayOrderId, amount, key
3. Open Razorpay Checkout popup with options:
   ├── key: RAZORPAY_KEY_ID
   ├── amount: amount from backend
   ├── order_id: razorpayOrderId
   ├── prefill: { name, email, contact } from user
   └── handler: (response) => verify payment
4. On payment success → Call POST /payment/verify with:
   ├── razorpay_order_id
   ├── razorpay_payment_id
   └── razorpay_signature
5. On verification success → Navigate to order success page
6. On payment failure → Show error toast

For COD:
- Skip Razorpay popup
- Create order with paymentMethod "cod" and paymentStatus "pending"
```

**Checklist**:
- [ ] Load Razorpay script in `index.html`: `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`
- [ ] Update `handlePlaceOrder()` to handle online payment vs COD
- [ ] Implement Razorpay popup opening with proper options
- [ ] Handle success callback → verify payment → navigate
- [ ] Handle failure callback → show error
- [ ] Keep COD option working without Razorpay
- [ ] Test with Razorpay test cards (4111 1111 1111 1111)

---

### DAY 8 (Feb 26) — User Dashboard Completion + Transaction History

**Goal**: Complete all remaining user dashboard components.

#### Class 15: User Overview Dashboard

**Topics to Learn/Revise**:
- Stat card components
- Data aggregation on frontend

**What to Build**:

**File**: `client/src/components/userDashboard/UserOverview.jsx`

```
UserOverview Component:
├── Stat Cards Row:
│   ├── Total Orders (count from orders API)
│   ├── Active Orders (placed/confirmed/preparing/on-way)
│   ├── Total Spent (sum of all delivered orders)
│   └── Cancelled Orders count
├── Recent Orders (last 5 orders)
│   ├── Order ID, Restaurant, Amount, Status, Date
│   └── Link to full orders tab
└── Quick Actions
    ├── "Order Now" button → Navigate to /order-now
    └── "View All Orders" button → Switch to orders tab
```

**Checklist**:
- [ ] Fetch orders in `UserOverview.jsx`
- [ ] Calculate stats from orders data
- [ ] Build stat cards UI
- [ ] Show last 5 recent orders
- [ ] Add quick action buttons

---

#### Class 16: User Transactions + Payment History

**Topics to Learn/Revise**:
- Filtering data by date ranges
- Table component for transaction lists

**What to Build**:

**File**: `client/src/components/userDashboard/UserTransactions.jsx`

```
UserTransactions Component:
├── Transaction List:
│   ├── Order ID
│   ├── Payment Method (UPI / Card / COD)
│   ├── Amount
│   ├── Payment Status (paid / pending / failed / refunded)
│   ├── Date & Time
│   └── Restaurant Name
├── Summary:
│   ├── Total Spent (all time)
│   ├── This Month Spent
│   └── Average Order Value
└── Filters:
    ├── By date range
    └── By payment status
```

**Checklist**:
- [ ] Update `UserTransactions.jsx` with real order data (transactions come from orders with payment info)
- [ ] Build transaction table/cards
- [ ] Add summary section
- [ ] Add basic date filtering
- [ ] Test with multiple orders

---

#### Class 17: User & Restaurant HelpDesk

**What to Build**:

Simple help desk that submits to the existing Contact/support system.

**File**: `client/src/components/userDashboard/UserHelpDesk.jsx`
**File**: `client/src/components/restaurantDashboard/RestaurantHelpDesk.jsx`

```
HelpDesk Component:
├── Submit Support Ticket form:
│   ├── Subject dropdown (Order Issue, Payment Issue, Account Issue, Other)
│   ├── Order ID (optional, dropdown of recent orders)
│   ├── Message textarea
│   └── Submit button → POST /public/new-contact
└── Support Info:
    ├── Email: support@cravings.com
    ├── Phone: +91-XXXXXXXXXX
    └── Hours: 24/7
```

**Checklist**:
- [ ] Update `UserHelpDesk.jsx` with form UI
- [ ] Update `RestaurantHelpDesk.jsx` with form UI
- [ ] Wire form submission to contact API
- [ ] Test form submission

---

### DAY 9 (Feb 27) — Polish, Edge Cases & Order Status Updates

**Goal**: Handle edge cases, improve UX, add real-time-like updates.

#### Class 18: Order Status Polling + Notifications

**Topics to Learn/Revise**:
- `setInterval` for polling
- Toast notifications on status change
- Comparing previous vs new data

**What to Build**:

Add auto-refresh to order status on customer side:
- Poll `GET /order/my-orders` every 30 seconds when user is on orders tab
- Compare order statuses — if any changed, show a toast notification
- Clean up interval on component unmount

**Checklist**:
- [ ] Add polling in `UserOrders.jsx` with `setInterval` (30 sec)
- [ ] Detect status changes and show toast
- [ ] Clean up interval with `useEffect` cleanup function
- [ ] Add "Refresh" button for manual refresh

---

#### Class 19: Edge Cases & Validation

**What to Fix/Add**:

```
Edge Cases to Handle:
├── Cart with unavailable items → Check item availability before order
├── Empty cart navigation to checkout → Already handled, verify
├── Order from closed restaurant → Add validation
├── Double order submission → Disable button after first click (already done with isProcessing)
├── Payment timeout → Handle Razorpay timeout event
├── Session expired during checkout → Redirect to login
├── Rider accepting already-accepted order → Backend validation
├── Multiple riders accepting same order → Backend race condition handling
├── Cancel order after restaurant accepted → Show appropriate message
└── Price mismatch (cart price vs current menu price) → Verify prices on backend
```

**Checklist**:
- [ ] Add price verification in `createOrder` controller (fetch current prices from Menu model)
- [ ] Add availability check in `createOrder` controller
- [ ] Handle rider race condition (check if riderID already assigned before accepting)
- [ ] Add proper error messages for all edge cases
- [ ] Test all edge cases manually

---

### DAY 10 (Feb 28) — Final Testing + Admin Dashboard (Basic) + Deployment Prep

#### Class 20: Admin Dashboard (Basic)

**Topics to Learn/Revise**:
- Platform-wide data aggregation
- Admin role checking

**What to Build (Minimum Viable)**:

**File**: `client/src/pages/dashboards/AdminDashboard.jsx`

```
AdminDashboard (Basic):
├── Auth check (role === "admin")
├── Platform Stats:
│   ├── Total Users (all roles count)
│   ├── Total Restaurants
│   ├── Total Orders
│   ├── Total Revenue (sum of all delivered orders)
│   └── Total Riders
├── Recent Orders Table (latest 10 orders across platform)
└── User List (basic table)
```

**Backend needed** (Optional — if time permits):
- `GET /admin/stats` → returns platform-wide counts
- `GET /admin/all-orders` → returns all orders with pagination
- `GET /admin/all-users` → returns all users

**Checklist**:
- [ ] Create basic admin controller + router (if time permits)
- [ ] Build `AdminDashboard.jsx` with stats
- [ ] Test with admin account

---

#### Class 21: Final Testing & Bug Fixes

**Complete Test Matrix**:

| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Customer registers | Account created, redirect to login | ☐ |
| Customer logs in | JWT cookie set, redirect to dashboard | ☐ |
| Customer browses restaurants | All restaurants displayed | ☐ |
| Customer searches restaurant | Filtered results shown | ☐ |
| Customer views menu | Menu items with add to cart | ☐ |
| Customer adds to cart | Item added, count updates | ☐ |
| Customer checks out (COD) | Order created, status "placed" | ☐ |
| Customer checks out (Razorpay) | Payment popup, order created after payment | ☐ |
| Customer views orders | All orders with correct status | ☐ |
| Customer cancels order | Status changes to "cancelled" | ☐ |
| Restaurant sees new order | Order appears in orders tab | ☐ |
| Restaurant accepts order | Status → "confirmed" | ☐ |
| Restaurant prepares order | Status → "preparing" | ☐ |
| Rider sees available order | Order appears in available list | ☐ |
| Rider accepts delivery | Status → "on-way", rider assigned | ☐ |
| Rider completes delivery | Status → "delivered" | ☐ |
| Customer sees delivered order | Status updated on customer side | ☐ |
| Restaurant earnings update | Delivered order counted in earnings | ☐ |
| Search works | Correct restaurants/items returned | ☐ |
| Password reset works | Password changed successfully | ☐ |
| Profile update works | All fields saved correctly | ☐ |

**Checklist**:
- [ ] Run through entire test matrix
- [ ] Fix all found bugs
- [ ] Clean up console.log statements
- [ ] Verify all error messages are user-friendly
- [ ] Check mobile responsiveness (basic)

---

### BUFFER DAY — March 1 (Deadline Day)

Use this day for:
- Any remaining bug fixes
- Code cleanup
- Final testing
- Deployment preparation

---

## File Creation Summary

### New Backend Files to Create

```
server/src/
├── models/
│   └── orderModel.js              ← DAY 1
├── controllers/
│   ├── orderController.js         ← DAY 1
│   ├── riderController.js         ← DAY 4
│   └── paymentController.js       ← DAY 7
├── routers/
│   ├── orderRouter.js             ← DAY 1
│   ├── riderRouter.js             ← DAY 4
│   └── paymentRouter.js           ← DAY 7
└── config/
    └── razorpay.js                ← DAY 7
```

### New Frontend Files to Create

```
client/src/components/
├── riderDashboard/                ← DAY 4
│   ├── RiderSideBar.jsx
│   ├── RiderOverview.jsx
│   ├── RiderAvailableOrders.jsx
│   ├── RiderMyDeliveries.jsx
│   └── RiderProfile.jsx
```

### Existing Files to Modify

```
server/
├── index.js                       ← Register new routers (DAY 1, 4, 7)

client/src/
├── pages/
│   ├── CheckoutPage.jsx           ← Connect to order API + Razorpay (DAY 2, 7)
│   ├── OrderNow.jsx               ← Add search & filter (DAY 6)
│   └── dashboards/
│       ├── RiderDashboard.jsx     ← Full rebuild (DAY 4)
│       └── AdminDashboard.jsx     ← Basic build (DAY 10)
├── components/
│   ├── userDashboard/
│   │   ├── UserOverview.jsx       ← Add real data (DAY 8)
│   │   ├── UserOrders.jsx         ← Full rebuild (DAY 2)
│   │   ├── UserTransactions.jsx   ← Full rebuild (DAY 8)
│   │   └── UserHelpDesk.jsx       ← Add form UI (DAY 8)
│   └── restaurantDashboard/
│       ├── RestaurantOverview.jsx  ← Connect real data (DAY 3)
│       ├── RestaurantOrders.jsx    ← Full rebuild (DAY 3)
│       ├── RestaurantEarnings.jsx  ← Add real data (DAY 3)
│       └── RestaurantHelpDesk.jsx  ← Add form UI (DAY 8)
```

### NPM Packages to Install

```
Server:
└── razorpay                       ← DAY 7

Client:
└── (no new packages needed — axios, react-icons already installed)
```

---

## Visual Flow Diagram

```
                    ┌─────────────────────────────────────────┐
                    │           CUSTOMER FLOW                  │
                    ├─────────────────────────────────────────┤
                    │  Browse Restaurants → View Menu          │
                    │       ↓                                  │
                    │  Add to Cart (localStorage)              │
                    │       ↓                                  │
                    │  Checkout Page                           │
                    │       ↓                                  │
                    │  Choose Payment (Razorpay / COD)         │
                    │       ↓                                  │
                    │  Place Order → POST /order/create        │
                    │       ↓                                  │
                    │  Order Status: "placed"                  │
                    │       ↓                                  │
                    │  Track in UserOrders                     │
                    └──────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────────┐
                    │        RESTAURANT FLOW                   │
                    ├─────────────────────────────────────────┤
                    │  See new order in RestaurantOrders       │
                    │       ↓                                  │
                    │  Accept → status: "confirmed"            │
                    │       ↓                                  │
                    │  Start Preparing → status: "preparing"   │
                    │       ↓                                  │
                    │  Ready for Pickup                        │
                    └──────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────────┐
                    │          RIDER FLOW                      │
                    ├─────────────────────────────────────────┤
                    │  See available orders (status=preparing) │
                    │       ↓                                  │
                    │  Accept Delivery → status: "on-way"      │
                    │       ↓                                  │
                    │  Deliver to Customer                     │
                    │       ↓                                  │
                    │  Mark Delivered → status: "delivered"     │
                    └─────────────────────────────────────────┘
```

---

## Daily Summary Quick Reference

| Day | Date | Focus | Key Deliverable |
|-----|------|-------|-----------------|
| **1** | Feb 19 | Order Backend | Order Model + Controller + Router working |
| **2** | Feb 20 | Customer Order Flow | Checkout creates real order + Order history page |
| **3** | Feb 21 | Restaurant Orders | Restaurant sees & manages orders + earnings |
| **4** | Feb 22 | Rider System | Full rider dashboard + delivery flow |
| **5** | Feb 23 | E2E Testing | Complete flow tested, bugs fixed |
| **6** | Feb 24 | Search & Filter | Restaurant search + menu filters working |
| **7** | Feb 25 | Payment Gateway | Razorpay integrated for online payments |
| **8** | Feb 26 | Dashboard Polish | User overview, transactions, help desk done |
| **9** | Feb 27 | Edge Cases | Validation, polling, error handling |
| **10** | Feb 28 | Final Testing | Admin dashboard (basic), full test, cleanup |
| Buffer | Mar 1 | DEADLINE | Bug fixes, final submission |

---

## Key Technical Concepts Per Day

| Day | Concepts You'll Practice |
|-----|-------------------------|
| 1 | Mongoose Schema Design, Express Controllers, REST API Design, Middleware Chaining |
| 2 | Axios POST Requests, React State Management, useEffect Data Fetching, Conditional Rendering |
| 3 | Tab-based UI Filtering, Status Badge Components, PATCH API for Updates |
| 4 | New Feature Module Creation, Reusing Component Patterns, Role-based UI |
| 5 | Integration Testing, Debugging API Flows, Cross-role Data Flow |
| 6 | MongoDB Text Search / Regex, Query Parameters, Dynamic Filtering, Debounced Search |
| 7 | Third-party Payment SDK, HMAC Signature Verification, Dynamic Script Loading |
| 8 | Dashboard Stats Calculation, Data Aggregation, Form Components |
| 9 | Polling with setInterval, Race Condition Handling, Input Validation |
| 10 | Platform-wide Aggregation, Final QA, Code Cleanup |

---

> **TIP**: Start each day by reading the specific class section, understand what needs to be built, then code. Commit your code at the end of each day. Don't skip testing — a working flow is worth more than a half-built feature.

---

**Document Created**: February 19, 2026
**Author**: Development Roadmap for Cravings Platform
