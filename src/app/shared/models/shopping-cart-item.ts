
export class ShoppingCartItem {
    $key: string;
    imageUrl: string;
    quantity: number;
    price: number;
    title: string;
    
    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this,init);
    }
    
    get totalPrice() {
        return this.price * this.quantity;
    }
}