from uzpayment.ofd import OfdItem, OfdFiscalReceipt

def test_ofd_receipt_calculation():
    item1 = OfdItem(
        name="Stomatologik tozalash (Air-Flow)",
        spic="08623001001000000",
        package_code="796",
        price=45000000, # 450,000 UZS in Tiyns
        amount=45000000,
        count=1,
        vat_percent=12
    )

    item2 = OfdItem(
        name="Tish pastasi va cho'tka to'plami",
        spic="03314002001000000",
        package_code="796",
        price=5000000, # 50,000 UZS in Tiyns
        amount=5000000,
        count=1,
        vat_percent=12
    )

    receipt = OfdFiscalReceipt(
        order_id="ORD-99812",
        items=[item1, item2],
        client_phone="+998901234567"
    )

    # 1. Total Amount Check
    assert receipt.calculate_total() == 50000000 # 500,000 UZS

    # 2. Total VAT 12% calculation (amount * 12 / 112)
    total_vat = receipt.calculate_total_vat()
    assert total_vat > 0
    assert total_vat == int(50000000 * 12 / 112)

    # 3. Payme JSON-RPC payload format
    payme_payload = receipt.to_payme_fiscal_detail()
    assert payme_payload["receipt_type"] == 0
    assert len(payme_payload["items"]) == 2
    assert payme_payload["items"][0]["code"] == "08623001001000000"

    # 4. Click OFD payload format
    click_payload = receipt.to_click_ofd_payload()
    assert click_payload["order_id"] == "ORD-99812"
    assert click_payload["total_amount"] == 50000000
    assert len(click_payload["items"]) == 2
