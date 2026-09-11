# 💳 UzPayment — Universal Fintech SDK (Monorepo)

> **O'zbekistonning barcha to'lov tizimlari (Click, Payme, Uzum Bank, Paynet) uchun universal, xavfsiz va tezkor to'lov integratsiyasi SDK si.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](packages/uzpayment-python)
[![NodeJS](https://img.shields.io/badge/TypeScript-Node.js-green.svg)](packages/uzpayment-node)
[![Zero-Dependency](https://img.shields.io/badge/Node-Zero--Dependency-violet.svg)](packages/uzpayment-node)

---

## 📦 Paketlar (Packages)

| Paket | Til | Tavsif | Status |
|---|---|---|---|
| [`@jasper/uzpayment`](packages/uzpayment-node) | TypeScript / Node.js | Brauzer va server uchun yengil, zero-dependency to'lov shlyuzi. | 🟢 Ready |
| [`uzpayment-sdk`](packages/uzpayment-python) | Python 3.9+ | Django, FastAPI, Flask va Aiogram botlar uchun asinxron SDK. | 🟢 Ready |

---

## ⚡ Jasper Pillar 4: Fintech Standartlari

1. **Tiyin / So'm 100x konvertatsiyasi:** Barcha hisob-kitoblar avtomatik ravishda `toTiyin(amount)` va `fromTiyin(amount)` orqali amalga oshiriladi.
2. **Takroriy to'lov (Idempotency) himoyasi:** Bir xil tranzaksiya bir necha bor bajarilmasligi uchun qat'iy tekshiruv.
3. **Imzolarni tasdiqlash (HMAC / Auth):** Click va Payme webhook so'rovlari haqiqiyligini tekshirish.

---

## 🚀 O'rnatish

### Node.js / TypeScript:
```bash
npm install uzpayment
```

### Python:
```bash
pip install uzpayment-sdk
```

---
*Muallif: Javohirbek Asqarov (Jasper) — 2026*
