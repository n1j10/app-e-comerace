# E-commerce API (Express + MongoDB + QiCard)

Clean sample backend for an e-commerce app using Express.js, MongoDB (Mongoose), and QiCard integration scaffolding.

## Features
- Express REST API with modular clean architecture.
- MongoDB models for users, categories, products, carts, orders, and payments.
- JWT-based sample auth flow.
- QiCard payment checkout + webhook endpoints with real integration-ready structure.
- Validation, centralized error handling, and unified API response shape.

## Setup
1. Install dependencies:
   - `npm install`
2. Create and configure environment:
   - `.env` already created.
   - Update `JWT_SECRET` and QiCard credentials before production use.
3. Run development server:
   - `npm run dev`

## Scripts
- `npm run dev` - run with nodemon.
- `npm start` - run in normal mode.
- `npm run lint` - run ESLint.
- `npm run seed` - insert sample categories/products.

## API Endpoints
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/categories`
- `POST /api/categories` (requires Bearer token)
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (requires Bearer token)
- `GET /api/cart` (requires Bearer token)
- `POST /api/cart/items` (requires Bearer token)
- `PATCH /api/cart/items/:itemId` (requires Bearer token)
- `DELETE /api/cart/items/:itemId` (requires Bearer token)
- `POST /api/orders` (requires Bearer token)
- `GET /api/orders` (requires Bearer token)
- `GET /api/orders/:id` (requires Bearer token)
- `POST /api/payments/qicard/checkout` (requires Bearer token)
- `POST /api/payments/qicard/webhook`

## Example cURL
Register:

`curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Rami\",\"email\":\"rami@example.com\",\"password\":\"123456\"}"`

Login:

`curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"rami@example.com\",\"password\":\"123456\"}"`

Create checkout:

`curl -X POST http://localhost:5000/api/payments/qicard/checkout -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d "{\"orderId\":\"<ORDER_ID>\",\"amount\":10000,\"currency\":\"IQD\",\"customer\":{\"name\":\"Rami\",\"email\":\"rami@example.com\",\"phone\":\"\"}}"`

## QiCard Notes
- The integration client is in `src/modules/payments/qicard.client.js`.
- If QiCard credentials are missing in `.env`, checkout returns a deterministic sample response.
- Replace the placeholder webhook verification strategy with QiCard's official signing algorithm once available.
- Integration docs reference: [QiCard Getting Started](https://developers-gate.qi.iq/docs/category/getting-started).
