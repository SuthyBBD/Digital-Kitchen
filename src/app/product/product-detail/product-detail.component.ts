import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../model/product.model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  product: Product;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getProduct(params['productId']);
    });
  }

  getProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
      });
  }

}
