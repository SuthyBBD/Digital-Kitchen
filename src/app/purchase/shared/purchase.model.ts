import {Product} from '../../product/model/product.model';

export class Purchase {

  static readonly DATE_FORMAT = 'Y/MM/DD';

  _id: string;
  totalPrice: number;
  paymentToken: any;
  createdAt: string;
  product: Product;
}
