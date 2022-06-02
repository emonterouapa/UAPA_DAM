import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoticketPageRoutingModule } from './historicoticket-routing.module';

import { HistoricoticketPage } from './historicoticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoticketPageRoutingModule
  ],
  declarations: [HistoricoticketPage]
})
export class HistoricoticketPageModule {}
