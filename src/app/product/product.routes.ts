import {ProductComponent} from './product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';

export const productRoutes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
    children: [
      {path: '', component: ProductListComponent},
      {path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard]}
    ]
  }];
