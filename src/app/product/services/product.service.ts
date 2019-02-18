import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  private products: Product[] = [{
    id: '1',
    brand: 'BuyFresh',
    name: 'Dijon Mustard',
    description: 'Mustardy Mustard',
    retailPrice: '250',
    dkPrice: '180',
    image: 'blahblah',
    createdDate: 'whenever',
    active: true,
    stockCount: 6
  },
    {
      id: '2',
      brand: 'PizzaCo',
      name: 'Pizza',
      description: 'Pizzary Pizza',
      retailPrice: '120',
      dkPrice: '50',
      image: 'blahblah',
      createdDate: 'whenever',
      active: true,
      stockCount: 6
    },
    {
      id: '3',
      brand: 'Fudy',
      name: 'Fud',
      description: 'Fudily Fud',
      retailPrice: '250',
      dkPrice: '180',
      image: 'blahblah',
      createdDate: 'whenever',
      active: true,
      stockCount: 6
    },
    {
      id: '4',
      brand: 'Rozos Hot Dogs',
      name: 'Hot Dog',
      description: 'Hottily Dog',
      retailPrice: '250',
      dkPrice: '180',
      image: 'blahblah',
      createdDate: 'whenever',
      active: true,
      stockCount: 6
    }];

  public getProductById(productId: string): Observable<Product> {

    return new Observable<Product>((observer) => {
      setTimeout(() => {
        const currentProduct = this.products.find((product) => {
          return product.id === productId;
        });
        observer.next(currentProduct);
      }, 500);
    });
  }

  public getProducts(): any {
    return new Observable<Product[]>((observer) => {
      setTimeout(() => {
        observer.next(this.products);
      }, 1000);
    });
  }
}
