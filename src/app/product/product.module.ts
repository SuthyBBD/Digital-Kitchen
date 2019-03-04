import { NgModule } from '@angular/core';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductListItemComponent} from './product-list-item/product-list-item.component';
import {ProductComponent} from './product.component';
import {CommonModule} from '@angular/common';
import {ProductService} from './services/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {RouterModule} from '@angular/router';
import {productRoutes} from './product.routes';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    HttpClientModule
  ],
  providers: [ProductService]
})
export class ProductModule {}
