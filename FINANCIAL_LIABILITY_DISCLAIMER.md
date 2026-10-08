# 💳 MOLIYAVIY JAVOBGARLIKNI CHEKLASH VA OZOD BO'LISH BAYONOTI
# 🛡️ FINANCIAL LIABILITY DISCLAIMER & INDEMNITY AGREEMENT

**Loyihaning nomi:** uzpayment-monorepo (Universal Fintech Payment SDK for Uzbekistan)  
**Qamrab olingan paketlar:** `uzpayment-node` (TypeScript/Node.js), `uzpayment-python` (Python)  
**Qo'llab-quvvatlanadigan provayderlar:** Click, Payme (Paycom), Uzum Bank, Paynet  
**Muallif va Arxitektor:** Javohirbek Asqarov (Jasper)  
**Litsenziya:** MIT License  
**Kuchga kirish sanasi:** 2026-yil 1-yanvar  
**Yurisdiksiya:** O'zbekiston Respublikasi (Toshkent shahri)  

---

## 🇺🇿 O'ZBEK TILI (RASMIY HUQUQIY MATN)

### 1. ASOSIY QOIDALAR VA DASTURIY TA'MINOTNING MAQOMI
1.1. Ushbu Moliyaviy javobgarlikni cheklash bayonoti (keyingi o'rinlarda — **"Bayonot"**) `uzpayment-monorepo` dasturiy kutubxonalari, SDK, modullari va manba kodlaridan (keyingi o'rinlarda — **"SDK"**) foydalanuvchi har qanday dasturchi, integrator, korxona, tashkilot yoki yakka tartibdagi tadbirkor (keyingi o'rinlarda — **"Integrator"** yoki **"Foydalanuvchi"**) hamda ushbu SDK muallifi Javohirbek Asqarov (keyingi o'rinlarda — **"Muallif"**) o'rtasidagi munosabatlarni tartibga soladi.  
1.2. Integrator SDK kodini yuklab olgan, loyihasiga `npm install`, `pip install`, git clone orqali ulagan yoki undan foydalangan paytdan boshlab ushbu Bayonot shartlariga to'liq va so'zsiz rozi bo'lgan hisoblanadi.  
1.3. SDK MIT litsenziyasi shartlari asosida va O'zbekiston Respublikasi Fuqarolik Kodeksining tegishli normalariga muvofiq, ochiq va bepul asosda "AS IS" ("QANDAY BO'LSA SHUNDAY") taqdim etiladi.

---

### 2. KAFOLATLARNING MUTLAQ MAVJUD EMASLIGI ("AS IS" & "AS AVAILABLE")
2.1. Muallif ushbu SDK bo'yicha hech qanday to'g'ridan-to'g'ri, bilvosita yoki qonunda ko'zda tutilgan kafolatlarni bermaydi, jumladan:
- SDK ning xatosiz, uzluksiz yoki nuqsonsiz ishlashi kafolatlanmaydi;
- SDK har qanday tijoriy talabga yoki xavfsizlik standartlariga 100% javob berishi kafolatlanmaydi;
- SDK ning barcha versiyalari uchinchi tomon to'lov tizimlarining bo'lajak API o'zgarishlari bilan mutanosib bo'lishi kafolatlanmaydi.

---

### 3. TIYIN VA SO'M KONVERTATSIYASI HAMDA ARIFMETIK XATOLIKLAR
3.1. O'zbekiston to'lov tizimlarida hisob-kitob birliklari turlicha amalga oshiriladi (xususan, Payme tizimi summalar tiyinda — 1 UZS = 100 tiyin formatida uzatilishini talab qiladi; Click va boshqa tizimlar esa so'm yoki tiyinda o'ziga xos talablarga ega).  
3.2. Integrator o'zining tijoriy backend tizimida va ma'lumotlar bazasida:
- Tiyin va so'm o'rtasidagi arifmetik ko'paytirish/bo'lish amallarini;
- Suzuvchi nuqtali sonlar (floating-point arithmetic) yaxlitlash xatolarini;
- Valyuta kurslari va qo'shimcha komissiyalarni to'g'ri hisoblanishini  
**mustaqil ravishda loyihalash, sinovdan o'tkazish (testing/QA) va tekshirishga TO'LIQ VA SHAXSAN MAS'ULDIR.**  
3.3. Dasturdagi konvertatsiya xatosi sababli xaridordan kam yoki ko'p pul yechib olinganligi yoki hisob-kitobda tafovut chiqqanligi uchun Muallif mutlaqo javobgar emas.

---

### 4. UCHINCHI TOMON TO'LOV SHLYUZLARI VA PROTSESSING MARKAZLARI
4.1. SDK faqat dasturiy ko'prik (wrapper/client) bo'lib, to'lovlarni o'zi qabul qilmaydi va pul mablag'larini saqlamaydi.  
4.2. Muallif quyidagi uchinchi tomonlarning faoliyati, uzilishlari va xatoliklari uchun hech qanday javobgarlikni o'z zimmasiga olmaydi:
- Payme (Paycom), Click (OOO «CLICK»), Uzum Bank (JSC «Uzum Bank»), Paynet (OOO «UZPAYNET») shlyuzlari;
- Banklararo protsessing markazlari: UZCARD (YAPTI) va HUMO (MBPM);
- O'zbekiston Respublikasi Markaziy Banki va tijorat banklarining kliring tizimlari;
- Serverlar o'rtasidagi tarmoq kechikishlari, timeoutlar, HTTP 500/502/504 xatoliklari va aloqa uzilishlari.

---

### 5. IDEMPOTENSIYA, TAKRORIY TRANZAKSIYALAR VA XAVFSIZLIK
5.1. **IDEMPOTENSIYA VA BAZA HOLATI:** Integrator har bir to'lov so'rovi (PerformTransaction, CheckPerformTransaction, CheckOrder, CreateTransaction, CancelTransaction) uchun o'z ma'lumotlar bazasida qat'iy tranzaksiyalar qulfi (DB Transaction Locking) va idempotensiya kalitlarini joriy etishga majburdir.  
5.2. Tarmoq takrorlanishi (network retry), veb-huklarning (webhook) ikki marta kelishi natijasida mijozdan mablag'larning ikki marta yechilishi (double charging) yoki buyurtmaning asossiz bekor bo'lishi xavfi to'liq Integratorning arxitekturaviy mas'uliyatiga kiradi.  
5.3. Secret key, Merchant ID, xususiy API kalitlari va parollarning xavfsiz saqlanishi, server xavfsizligi va SSL sertifikatlari Integrator zimmasidadir.

---

### 6. FISKALIZATSIYA, OFD VA SOLIQ TALABLARI
6.1. O'zbekiston Respublikasi Davlat soliq qo'mitasining talablariga binoan, to'lovlar fiskallashtirilishi, MXIK (IKPU) kodlari, QQS stavkalari to'g'ri ko'rsatilishi va fiskal cheklar shakllantirilishi shart.  
6.2. SDK orqali yuborilgan fiskal ma'lumotlarning noto'g'riligi, soliq jarimalari yoki OFD serverlarining nosozligi sababli yuzaga keladigan har qanday moliyaviy sanksiyalar uchun Integrator javobgardir.

---

### 7. JAVOBGARLIKNING CHEKLANISHI VA ZERO-LIABILITY ($0)
7.1. **MUTLAQ JAVOBGARSIZLIK ($0 DOLLAR / 0 SO'M):** Amaldagi qonunchilik yo'l qo'ygan eng yuqori darajada, SDK Muallifi (Javohirbek Asqarov) hech qanday sharoitda quyidagilar uchun javobgar bo'lmaydi:
- Integratorning har qanday to'g'ridan-to'g'ri, bilvosita, tasodifiy, jazo tariqasidagi yoki oqibatli zararlari;
- Boy berilgan foyda (lost profits), kutilgan daromadning yo'qolishi;
- Savdo yoki biznes to'xtab qolishi (business interruption);
- Noqonuniy tranzaksiyalar, firibgarlik yoki bank jarimalari;
- Integratorning mijozlari, hamkorlari yoki soliq organlari oldidagi har qanday majburiyatlari.  
7.2. Har qanday da'vo bo'yicha Muallifning umumiy va maksimal kompensatsiya javobgarligi **0 (nol) so'm / 0 AQSh dollarini** tashkil etadi.

---

### 8. ZARARNI QOPLASH MAJBURIYATI (INDEMNIFICATION)
8.1. Integrator SDK dan foydalanishi yoki uni o'z tizimiga tatbiq etishi oqibatida yuzaga kelgan har qanday uchinchi tomon da'volari, arizalari, tekshiruvlari, jarimalari va sud xarajatlaridan (shu jumladan advokatlik to'lovlaridan) Muallifni to'liq himoya qilish va zararlarni qoplab berish (indemnify and hold harmless) majburiyatini o'z zimmasiga oladi.

---

### 9. QO'LLANILADIGAN HUQUQ VA YURISDIKSIYA
9.1. Ushbu Bayonot va undan kelib chiqadigan barcha munosabatlar O'zbekiston Respublikasi moddiy huquqiga muvofiq tartibga solinadi.  
9.2. Har qanday nizolar tomonlar o'rtasida tinch yo'l bilan hal etilmagan taqdirda, ular faqat O'zbekiston Respublikasi, **Toshkent shahri sudlarida** ko'rib chiqiladi.

---
---

## 🇬🇧 ENGLISH TRANSLATION (LEGALLY ENFORCEABLE TERMS)

### 1. RECITALS & SOFTWARE STATUS
1.1. This Financial Liability Disclaimer and Indemnity Agreement (hereinafter the **"Disclaimer"**) governs the terms and conditions under which any developer, enterprise, integrator, or software entity (hereinafter the **"Integrator"** or **"User"**) utilizes the `uzpayment-monorepo` software development kits, libraries, modules, and source code (hereinafter the **"SDK"**), authored and published by Javohirbek Asqarov (Jasper) (hereinafter the **"Author"**).  
1.2. Installing, importing, compiling, deploying, or utilizing the SDK in whole or in part constitutes immediate, full, and irrevocable assent to this Disclaimer.  
1.3. The SDK is provided free of charge under the open-source MIT License strictly on an "AS IS" and "AS AVAILABLE" basis, pursuant to the provisions of the Civil Code of the Republic of Uzbekistan.

---

### 2. ABSOLUTE DISCLAIMER OF WARRANTIES
2.1. The Author makes no representations or warranties of any kind, whether express, implied, statutory, or otherwise, regarding the SDK.  
2.2. Specifically, the Author disclaims all warranties of merchantability, fitness for a particular purpose, operational continuity, data integrity, and non-infringement. Uptime, zero-defect processing, and forward-compatibility with future payment gateway API revisions are explicitly disclaimed.

---

### 3. TIYIN/SO'M CONVERSIONS & ARITHMETIC VARIANCE
3.1. Uzbek national payment gateways operate on disparate currency base requirements (e.g., Payme protocol mandates monetary units expressed strictly in tiyins: 1 UZS = 100 tiyins, whereas Click and alternative aggregators employ diverging payload schemas).  
3.2. The Integrator maintains exclusive and non-delegable responsibility to:
- Properly multiply, divide, and scale currency units between fractional tiyins and base soums;
- Prevent floating-point mathematical rounding discrepancies within their runtime environments;
- Implement robust integration test suites and sandbox validation runs prior to production deployment.  
3.3. Under no circumstances shall the Author be liable for overcharging, undercharging, billing discrepancies, or monetary loss resulting from currency conversion calculations.

---

### 4. THIRD-PARTY GATEWAY & PROCESSING OUTAGES
4.1. The SDK serves strictly as an algorithmic translation client and does not clear, hold, custody, or settle any financial funds.  
4.2. The Author assumes zero liability for downtime, outages, packet latency, timeout events, HTTP 5xx failures, or transactional misdirections caused by third-party systems, including:
- Payme (Paycom), Click, Uzum Bank, Paynet payment processors;
- National interbank processing nodes: UZCARD and HUMO;
- Commercial banking infrastructures and clearing systems governed by the Central Bank of Uzbekistan.

---

### 5. IDEMPOTENCY, DUPLICATE BILLING & REPLAY ATTACKS
5.1. The Integrator is strictly obligated to engineer distributed database locks, transactional idempotency tokens, and unique state checks across their webhook handlers (covering CheckOrder, PerformTransaction, CancelTransaction, etc.).  
5.2. Network retries, duplicated callback deliveries, double charging, replay vulnerabilities, or race conditions are architectural risks solely borne by the Integrator.

---

### 6. FISCAL COMPLIANCE, OFD & TAX PENALTIES
6.1. Integrators are solely responsible for ensuring statutory tax compliance under State Tax Committee regulations, including valid MXIK (IKPU) classification codes, VAT calculation, and State Fiscal Data Operator (OFD) receipts.  
6.2. The Author bears zero responsibility for tax audits, fiscal penalties, or misreported commercial receipts.

---

### 7. LIMITATION OF LIABILITY & ZERO-LIABILITY CLAUSE ($0)
7.1. **EXPRESS MONETARY LIABILITY EXCLUSION ($0 USD / 0 UZS):** To the fullest extent permitted by applicable law, in no event shall the Author (Javohirbek Asqarov) be liable for any direct, indirect, incidental, special, punitive, exemplary, or consequential damages, including:
- Loss of profits, lost revenue, lost anticipated savings;
- Business interruption or goodwill impairment;
- Regulatory fines, chargebacks, or banking penalties;
- Software defects or data loss.  
7.2. The Author's maximum aggregate financial liability under all legal causes of action (contract, negligence, tort, strict liability, or restitution) shall not exceed **$0 (Zero United States Dollars / Zero Uzbek Soums)**.

---

### 8. INDEMNIFICATION
8.1. The Integrator agrees to defend, indemnify, and hold harmless the Author from and against any and all claims, liabilities, losses, damages, assessments, and expenses (including legal and attorney fees) arising from the Integrator's implementation, misuse, or deployment of the SDK.

---

### 9. GOVERNING LAW & FORUM SELECTION
9.1. This Disclaimer and all associated legal obligations are governed by the substantive laws of the Republic of Uzbekistan.  
9.2. Any dispute arising out of or related to the SDK shall be resolved exclusively by the courts of competent jurisdiction located in **Tashkent City, Republic of Uzbekistan**.

---

**Muallif va Litsenziar / Author & Licensor:**  
Javohirbek Asqarov (Jasper)  
Email/Aloqa: Loyiha GitHub ombori orqali (`uzpayment-monorepo`)  
Toshkent shahri, O'zbekiston Respublikasi  
