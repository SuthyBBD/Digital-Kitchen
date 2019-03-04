import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: any;
  savings: number;
  constructor() { }

  ngOnInit() {
    this.savings = Math.round((this.product.dkPrice / this.product.retailPrice) * 100);
  }

}
