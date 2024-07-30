import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovementPage } from './movement.page';

const routes: Routes = [
  {
    path: '',
    component: MovementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementPageRoutingModule {}
