import 'rxjs/add/operator/take';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  showActions;
  modalRef: BsModalRef;
  product = {
    title: '',
    price: 0.0,
    category: '',
    imageUrl: ''
  };
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService,
    private modalService: BsModalService) { 
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // if(!confirm('Are you sure you want to delete this product?')) return;
    // this.productService.delete(this.id);
    // this.router.navigate(['/admin/products']);
  }
  
  deleteProduct() {
    this.productService.delete(this.id);
    this.modalRef.hide();
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
