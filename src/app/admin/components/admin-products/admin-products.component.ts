import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent{

  products: Product[];
  items: Product[] = [];
  itemCount: number;
  tableResources: DataTableResource<Product>;

  constructor(private productService: ProductService) { 
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]){
    this.tableResources = new DataTableResource(products);
      this.tableResources.query( { offset: 0})
        .then( items => this.items = items);
      this.tableResources.count()
        .then(counts => this.itemCount = counts);
  }

  reloadItems(params) {
    if(!this.tableResources) return;
    this.tableResources.query(params)
      .then(itmes => this.items = itmes);
  }

  filter(query: string){
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.initializeTable(filteredProducts);
  }

}
