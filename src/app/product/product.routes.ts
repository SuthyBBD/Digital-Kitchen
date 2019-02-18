import {ProductComponent} from './product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {Routes} from '@angular/router';

export const productRoutes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
    children: [
      {path: '', component: ProductListComponent},
      {path: ':productId', component: ProductDetailComponent}
    ]
  }];
