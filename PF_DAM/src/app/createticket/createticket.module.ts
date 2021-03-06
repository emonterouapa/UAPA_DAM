import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateticketPageRoutingModule } from './createticket-routing.module';

import { CreateticketPage } from './createticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateticketPageRoutingModule
  ],
  declarations: [CreateticketPage]
})
export class CreateticketPageModule {}
