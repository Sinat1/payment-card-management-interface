export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'noname';

export interface Card {
    id: string;
    brand: CardBrand;
    last4: string;
    isDefault: boolean;
}