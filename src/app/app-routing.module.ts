import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'shoping-cart',
    loadChildren: () =>
      import('./pages/shoping-cart/shoping-cart.module').then(
        (m) => m.ShopingCartPageModule
      ),
  },
  {
    path: 'product-item',
    loadChildren: () =>
      import('./pages/product-item/product-item.module').then(
        (m) => m.ProductItemPageModule
      ),
  },
  {
    path: 'product-list',
    loadChildren: () =>
      import('./pages/product-list/product-list.module').then(
        (m) => m.ProductListPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
