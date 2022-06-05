import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateticketPageRoutingModule } from './createticket-routing.module';

import { CreateticketPage } from './createticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateticketPageRoutingModule
  ],
  declarations: [CreateticketPage]
})
export class CreateticketPageModule {}
