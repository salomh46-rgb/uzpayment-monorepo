import pytest
from uzpayment import UzPayment, ClickConfig, PaymeConfig, PaymentProviderType

def test_uzpayment_initialization():
    payme_cfg = PaymeConfig(merchant_id="test_merchant", secret_key="test_secret")
    click_cfg = ClickConfig(service_id="test_service", merchant_id="test_merchant", secret_key="test_secret")
    
    manager = UzPayment(payme=payme_cfg, click=click_cfg)
    assert manager.payme is not None
    assert manager.click is not None

def test_uzpayment_generate_click_url():
    click_cfg = ClickConfig(service_id="12345", merchant_id="67890", secret_key="sec")
    manager = UzPayment(click=click_cfg)
    
    url = manager.get_payment_url(
        provider=PaymentProviderType.CLICK,
        amount=500000,
        order_id="ord_test_01"
    )
    assert "my.click.uz" in url
    assert "service_id=12345" in url

def test_uzpayment_generate_payme_url():
    payme_cfg = PaymeConfig(merchant_id="merchant_99", secret_key="sec")
    manager = UzPayment(payme=payme_cfg)
    
    url = manager.get_payment_url(
        provider=PaymentProviderType.PAYME,
        amount=450000,
        order_id="ord_test_02"
    )
    assert "checkout.paycom.uz" in url
