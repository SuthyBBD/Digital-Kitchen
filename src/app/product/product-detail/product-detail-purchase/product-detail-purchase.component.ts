import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-product-detail-purchase',
  templateUrl: './product-detail-purchase.component.html',
  styleUrls: ['./product-detail-purchase.component.scss']
})
export class ProductDetailPurchaseComponent implements OnInit {

  @Input() product: Product;
  stockCount = [];
  quantity = 1;
  quantityString = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  constructor() {
  }

  ngOnInit() {
    this.populateStockCountArray();
  }

  populateStockCountArray() {
    const end = this.product.stockCount;
    for (let i = 1; i <= end; i++) {
      this.stockCount.push(i);
    }
  }

  selectQuantity(num: number) {
    this.quantity = num;
  }


}
