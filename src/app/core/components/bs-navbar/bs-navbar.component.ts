import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  shoppingCartItemsCount: number;
  cart$;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
