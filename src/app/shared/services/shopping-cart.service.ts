import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items))
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.object('/shopping-carts/' + cartId + "/items").remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) 
      return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCart();
    let items$ = this.getItem(cartId, product.$key);

    items$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0 ) + change;
      if (quantity === 0) items$.remove();
      else items$.update( { 
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,  
        quantity: quantity });
    })
  }
}
