import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Purchase} from './purchase.model';

@Injectable()
export class PurchaseService {

  constructor(private http: HttpClient) {}

  public createPurchase(purchase: Purchase): Observable<any> {
    return this.http.post('/api/v1/purchases', purchase);
  }

  public getUserPurchases(): Observable<any> {
    return this.http.get('/api/v1/bookings/manage');
  }
}
