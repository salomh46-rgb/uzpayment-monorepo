"""
UzPayment OFD (Fiscal Receipt) Automation Module v2.0
Implements Uzbekistan Soliq (State Tax Committee) OFD Fiscalization standard
including MXIK (IKPU) Commodity Codes, VAT (QQS 12%), Package Codes, and Commission receipts.
"""

from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any

@dataclass
class OfdItem:
    name: str                           # Tovar yoki xizmat nomi
    spic: str                           # MXIK (IKPU) 17 raqamli identifikatsiya kodi
    package_code: str                   # O'lchov birligi kodi (masalan, '796' - dona)
    price: int                          # Tiyinlarda (1 so'm = 100 tiyin)
    amount: int                         # Jami summa tiyinlarda (price * count)
    count: int = 1                      # Soni
    vat_percent: int = 12               # QQS stavkasi (12% yoki 0%)
    commission_tin: Optional[str] = None # Komitent STIR (marketpleyslar uchun)

@dataclass
class OfdFiscalReceipt:
    order_id: str
    items: List[OfdItem]
    received_cash: int = 0              # Naqd tiyinda
    received_card: int = 0              # Karta tiyinda
    client_phone: Optional[str] = None

    def calculate_total(self) -> int:
        return sum(item.amount for item in self.items)

    def calculate_total_vat(self) -> int:
        """Calculates total VAT in Tiyns (12% standard)"""
        total_vat = 0
        for item in self.items:
            if item.vat_percent > 0:
                # VAT = amount * 12 / 112
                total_vat += int(item.amount * item.vat_percent / (100 + item.vat_percent))
        return total_vat

    def to_payme_fiscal_detail(self) -> Dict[str, Any]:
        """
        Formats receipt into Payme JSON-RPC 'detail' structure for automated Soliq fiscalization.
        """
        receipt_items = []
        for item in self.items:
            vat_val = int(item.amount * item.vat_percent / (100 + item.vat_percent)) if item.vat_percent > 0 else 0
            receipt_items.append({
                "title": item.name,
                "price": item.price,
                "count": item.count,
                "code": item.spic,
                "units": int(item.package_code),
                "vat_percent": item.vat_percent,
                "package_code": item.package_code,
                "vat": vat_val
            })

        return {
            "receipt_type": 0, # Sotuv cheki
            "items": receipt_items
        }

    def to_click_ofd_payload(self) -> Dict[str, Any]:
        """
        Formats receipt into Click OFD API v2 structure.
        """
        return {
            "order_id": self.order_id,
            "total_amount": self.calculate_total(),
            "vat_amount": self.calculate_total_vat(),
            "items": [
                {
                    "name": item.name,
                    "ikpu": item.spic,
                    "package_code": item.package_code,
                    "price": item.price,
                    "quantity": item.count,
                    "vat_rate": item.vat_percent
                }
                for item in self.items
            ]
        }
