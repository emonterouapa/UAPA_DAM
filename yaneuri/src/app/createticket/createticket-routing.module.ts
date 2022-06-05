import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateticketPage } from './createticket.page';

const routes: Routes = [
  {
    path: '',
    component: CreateticketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateticketPageRoutingModule {}
