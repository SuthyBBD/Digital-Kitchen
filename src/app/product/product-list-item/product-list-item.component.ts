import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() Product: any;
  constructor() { }

  ngOnInit() {
  }

}
