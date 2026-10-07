import * as crypto from 'crypto';

export interface PaymeConfig {
  merchantId: string;
  secretKey: string;
  testMode?: boolean;
}

export interface ClickConfig {
  serviceId: string;
  merchantId: string;
  secretKey: string;
}

export interface UzumConfig {
  terminalId: string;
  secretKey: string;
}

export interface PaynetConfig {
  serviceId: string;
  secretKey: string;
}

export interface UzPaymentOptions {
  payme?: PaymeConfig;
  click?: ClickConfig;
  uzum?: UzumConfig;
  paynet?: PaynetConfig;
}

export interface CreateInvoiceOptions {
  amount: number; // in UZS
  orderId: string;
  returnUrl?: string;
  description?: string;
}

export interface OfdItem {
  name: string;        // Tovar yoki xizmat nomi
  spic: string;        // MXIK / IKPU 17-xonali identifikatsiya kodi
  packageCode: string; // O'lchov birligi kodi (masalan, '796')
  price: number;       // Tiyinlarda (1 UZS = 100 tiyin)
  count?: number;      // Soni (default: 1)
  vatPercent?: number; // QQS (12 yoki 0)
}

export interface OfdFiscalReceipt {
  orderId: string;
  items: OfdItem[];
  clientPhone?: string;
}

export class UzPayment {
  private config: UzPaymentOptions;

  constructor(config: UzPaymentOptions) {
    this.config = config;
  }

  /**
   * Generates a Click checkout URL
   */
  public createClickInvoiceUrl(options: CreateInvoiceOptions): string {
    if (!this.config.click) {
      throw new Error('UzPayment: Click configuration is required to generate Click invoice URL.');
    }
    const { serviceId, merchantId } = this.config.click;
    const returnUrl = options.returnUrl ? `&return_url=${encodeURIComponent(options.returnUrl)}` : '';
    return `https://my.click.uz/services/pay?service_id=${serviceId}&merchant_id=${merchantId}&amount=${options.amount}&transaction_param=${options.orderId}${returnUrl}`;
  }

  /**
   * Generates a Payme (Paycom) checkout URL with Base64 encoded payload
   */
  public createPaymeInvoiceUrl(options: CreateInvoiceOptions): string {
    if (!this.config.payme) {
      throw new Error('UzPayment: Payme configuration is required to generate Payme invoice URL.');
    }
    const { merchantId } = this.config.payme;
    const amountInTiyin = Math.round(options.amount * 100);
    const params = `m=${merchantId};ac.order_id=${options.orderId};a=${amountInTiyin}`;
    const base64Params = Buffer.from(params).toString('base64');
    return `https://checkout.paycom.uz/${base64Params}`;
  }

  /**
   * Generates an Uzum Bank payment URL
   */
  public createUzumInvoiceUrl(options: CreateInvoiceOptions): string {
    if (!this.config.uzum) {
      throw new Error('UzPayment: Uzum configuration is required to generate Uzum invoice URL.');
    }
    const { terminalId } = this.config.uzum;
    const amountInTiyin = Math.round(options.amount * 100);
    return `https://www.uzumbank.uz/open-service?serviceId=${terminalId}&amount=${amountInTiyin}&orderId=${options.orderId}`;
  }

  /**
   * Verifies Click MD5 Prepare/Complete Signature
   */
  public verifyClickSignature(params: {
    clickTransId: string;
    serviceId: string;
    secretKey?: string;
    merchantTransId: string;
    amount: string | number;
    action: string | number;
    signTime: string;
    signString: string;
  }): boolean {
    const secret = params.secretKey || this.config.click?.secretKey;
    if (!secret) throw new Error('Click secret key is required for signature verification.');

    const raw = `${params.clickTransId}${params.serviceId}${secret}${params.merchantTransId}${params.amount}${params.action}${params.signTime}`;
    const hash = crypto.createHash('md5').update(raw).digest('hex');
    return hash.toLowerCase() === params.signString.toLowerCase();
  }

  /**
   * Verifies Payme Basic Auth header
   */
  public verifyPaymeAuth(authHeader: string): boolean {
    if (!this.config.payme) throw new Error('Payme config required for authentication.');
    if (!authHeader || !authHeader.startsWith('Basic ')) return false;

    const credentials = Buffer.from(authHeader.replace('Basic ', ''), 'base64').toString('utf-8');
    const [login, key] = credentials.split(':');
    return login === 'Paycom' && key === this.config.payme.secretKey;
  }

  /**
   * Generates Soliq OFD Fiscal receipt payload for Payme JSON-RPC
   */
  public createPaymeFiscalDetail(receipt: OfdFiscalReceipt) {
    return {
      receipt_type: 0,
      items: receipt.items.map(item => {
        const count = item.count || 1;
        const total = item.price * count;
        const vat = (item.vatPercent && item.vatPercent > 0) ? Math.round(total * item.vatPercent / (100 + item.vatPercent)) : 0;
        return {
          title: item.name,
          price: item.price,
          count: count,
          code: item.spic,
          units: Number(item.packageCode),
          vat_percent: item.vatPercent || 12,
          package_code: item.packageCode,
          vat: vat
        };
      })
    };
  }
}

export default UzPayment;
