import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricoticketPage } from './historicoticket.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoticketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoticketPageRoutingModule {}
