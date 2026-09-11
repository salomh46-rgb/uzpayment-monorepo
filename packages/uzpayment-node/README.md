# 💳 uzpayment-sdk

> Universal, zero-dependency Multi-Provider Payment Gateway SDK for Uzbekistan (Click, Payme, Uzum Bank, Paynet).

[![npm version](https://img.shields.io/npm/v/uzpayment-sdk.svg?style=flat-square)](https://www.npmjs.com/package/uzpayment-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 📦 Installation

```bash
npm install uzpayment-sdk
```
or with Yarn:
```bash
yarn add uzpayment-sdk
```
or with pnpm:
```bash
pnpm add uzpayment-sdk
```

---

## 🚀 Quickstart

```typescript
import { UzPayment } from 'uzpayment-sdk';

const payment = new UzPayment({
  click: {
    serviceId: '12345',
    merchantId: '67890',
    secretKey: 'YOUR_CLICK_SECRET',
  },
  payme: {
    merchantId: '64f1234567890abcdef',
    secretKey: 'YOUR_PAYME_SECRET',
  }
});

// 1. Create Click Checkout URL
const clickUrl = payment.createClickInvoiceUrl({
  amount: 150000, // 150,000 UZS
  orderId: 'ORDER_9842',
  returnUrl: 'https://myshop.uz/success'
});
console.log('Click URL:', clickUrl);

// 2. Create Payme Checkout URL
const paymeUrl = payment.createPaymeInvoiceUrl({
  amount: 150000,
  orderId: 'ORDER_9842'
});
console.log('Payme URL:', paymeUrl);
```

---

## 🔒 Webhook Verification

### Verify Click Signature:
```typescript
const isValid = payment.verifyClickSignature({
  clickTransId: req.body.click_trans_id,
  serviceId: req.body.service_id,
  merchantTransId: req.body.merchant_trans_id,
  amount: req.body.amount,
  action: req.body.action,
  signTime: req.body.sign_time,
  signString: req.body.sign_string,
});

if (!isValid) {
  return res.json({ error: -1, error_note: 'Sign check failed' });
}
```

### Verify Payme Basic Auth:
```typescript
const isPayme = payment.verifyPaymeAuth(req.headers.authorization);
if (!isPayme) {
  return res.status(401).json({
    error: { code: -32504, message: 'Insufficient privileges' }
  });
}
```

---

## 👨‍💻 Author

**Javohirbek Asqarov (Jasper)**
- GitHub: [@salomh46-rgb](https://github.com/salomh46-rgb)
- Telegram: [@Dr_eviluz](https://t.me/Dr_eviluz)
- Email: [salomh46@gmail.com](mailto:salomh46@gmail.com)

---

## 📄 License
MIT © [Javohirbek Asqarov](LICENSE)
