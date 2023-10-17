import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AnnounceComponentRoutingModule } from './announce-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnounceComponentRoutingModule
  ],
  declarations: []
})
export class AnnounceComponentModule {}
