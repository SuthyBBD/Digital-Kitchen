import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProductById(productId: string): Observable<any> {
      return this.http.get('/api/v1/products/' + productId);
  }

  public getProducts(): any {
    return this.http.get('/api/v1/products');
  }
}
