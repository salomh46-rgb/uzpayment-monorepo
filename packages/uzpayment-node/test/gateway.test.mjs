import test from 'node:test';
import assert from 'node:assert';
import { UzPayment } from '../dist/index.js';

test('UzPayment Node SDK - Click Invoice URL generation', () => {
  const gateway = new UzPayment({
    click: {
      serviceId: '12345',
      merchantId: '67890',
      secretKey: 'my_secret_key'
    }
  });

  const url = gateway.createClickInvoiceUrl({
    amount: 150000,
    orderId: 'ORD-001',
    returnUrl: 'https://mysite.uz/success'
  });

  assert.ok(url.includes('service_id=12345'));
  assert.ok(url.includes('amount=150000'));
  assert.ok(url.includes('transaction_param=ORD-001'));
});

test('UzPayment Node SDK - Payme Invoice URL (Base64 encoding with Tiyin 100x)', () => {
  const gateway = new UzPayment({
    payme: {
      merchantId: 'payme_merchant_1',
      secretKey: 'payme_secret'
    }
  });

  const url = gateway.createPaymeInvoiceUrl({
    amount: 250000, // 250,000 UZS
    orderId: 'ORD-777'
  });

  assert.ok(url.startsWith('https://checkout.paycom.uz/'));
  const base64Part = url.replace('https://checkout.paycom.uz/', '');
  const decoded = Buffer.from(base64Part, 'base64').toString('utf-8');
  assert.ok(decoded.includes('m=payme_merchant_1'));
  assert.ok(decoded.includes('a=25000000')); // 250,000 * 100
  assert.ok(decoded.includes('ac.order_id=ORD-777'));
});

test('UzPayment Node SDK - Soliq OFD Fiscal receipt payload structure', () => {
  const gateway = new UzPayment({});
  const receipt = {
    orderId: 'ORD-555',
    items: [
      {
        name: 'Dasturiy ta\'minot litsenziyasi',
        spic: '08623001001000000',
        packageCode: '796',
        price: 50000000,
        count: 1,
        vatPercent: 12
      }
    ]
  };

  const paymeDetail = gateway.createPaymeFiscalDetail(receipt);
  assert.strictEqual(paymeDetail.receipt_type, 0);
  assert.strictEqual(paymeDetail.items.length, 1);
  assert.strictEqual(paymeDetail.items[0].code, '08623001001000000');
  assert.strictEqual(paymeDetail.items[0].units, 796);
  assert.ok(paymeDetail.items[0].vat > 0);
});
