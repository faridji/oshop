import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: any;
  
  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService) { 
    }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filterProducts();
      })
    });
  }

  private filterProducts() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category == this.category) : 
    this.products;
  }
}
