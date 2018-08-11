import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {

  categories$;
  @Input('category') category: string;

  constructor(categoriesService: CategoryService) { 
    this.categories$ = categoriesService.getAll();
  }
}
