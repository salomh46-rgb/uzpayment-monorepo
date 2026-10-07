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

## ⚡ Jasper Pillar 4: Fintech Standartlari & v2.0 Imkoniyatlari

1. **Davlat Soliq Qo'mitasi (Soliq OFD) Fiskallashtirish:** 17 xonali MXIK / IKPU kodlari, 12% QQS (NDS), birlik/o'ram paket kodlari bilan Payme/Click cheklarini avtomat fiskallashtirish.
2. **Tiyin / So'm 100x konvertatsiyasi:** Barcha hisob-kitoblar avtomatik ravishda `toTiyin(amount)` va `fromTiyin(amount)` orqali amalga oshiriladi (ortiqcha yaxlitlash xatolarisiz).
3. **Takroriy to'lov (Idempotency) himoyasi:** Bir xil tranzaksiya bir necha bor bajarilmasligi uchun qat'iy tranzaksiya kaliti va holat nazorati.
4. **Imzolarni tasdiqlash (HMAC / Auth):** Click va Payme webhook so'rovlari haqiqiyligini xavfsiz tekshirish.

---

## 🚀 O'rnatish & Ishlatish

### Node.js / TypeScript:
```bash
npm install uzpayment
```

```typescript
import { UzPayment, OfdFiscalReceipt } from 'uzpayment';

const gateway = new UzPayment({
  payme: { merchantId: '...', secretKey: '...' }
});

// Payme Invoice havolasini olish
const payUrl = gateway.createPaymeInvoiceUrl({
  amount: 250000, // 250,000 so'm (avtomat 25,000,000 tiyin)
  orderId: 'ORD-777'
});

// Soliq OFD Fiskal chek ma'lumotlarini tayyorlash
const receipt: OfdFiscalReceipt = {
  orderId: 'ORD-777',
  items: [
    {
      name: 'Dasturiy ta\'minot litsenziyasi',
      spic: '08623001001000000', // 17 xonali MXIK
      packageCode: '796',
      price: 25000000, // tiyinda
      count: 1,
      vatPercent: 12
    }
  ]
};
const fiscalDetail = gateway.createPaymeFiscalDetail(receipt);
```

### Python:
```bash
pip install uzpayment-sdk
```

```python
from uzpayment import UzPayment, OfdFiscalReceipt, OfdItem

receipt = OfdFiscalReceipt(
    order_id="ORD-777",
    items=[
        OfdItem(
            name="Dasturiy ta'minot litsenziyasi",
            spic="08623001001000000",
            package_code="796",
            price=25000000, # tiyinda
            count=1,
            vat_percent=12
        )
    ]
)
fiscal_payload = receipt.to_payme_detail()
```

---
*Muallif: Javohirbek Asqarov (Jasper) — 2026*
