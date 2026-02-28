import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreejsComponent } from './threejs/threejs.component';

const routes: Routes = [
  {
    path: '',
    component: ThreejsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

