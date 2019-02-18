import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    const product$ = this.productService.getProducts();
    product$.subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (err) => {

      },
      () => {

      });
  }

}
