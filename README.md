# finconnect-hackathon-pos

A React-based Point of Sale (POS) card reader system that mocks card payment functionality.

## Features

- Mock POS card reader interface
- Three input fields: Card Number, Merchant ID, and Amount
- "Tap Card" button to process payments
- Sends POST request to `http://localhost:3000/pos/authorize` with card details

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## API

When the "Tap Card" button is clicked, the application sends a POST request to:

**Endpoint:** `http://localhost:3000/pos/authorize`

**Body:**
```json
{
  "cardNumber": "string",
  "merchantId": "string",
  "amount": number
}
```

## Technologies

- React 19
- Vite
- ESLint
