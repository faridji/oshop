import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
   this.orders$ = this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid));
  }

}
