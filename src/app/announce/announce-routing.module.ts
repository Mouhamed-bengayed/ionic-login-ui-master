import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnounceComponent } from './announce.component';

const routes: Routes = [
  {
    path: '',
    component: AnnounceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnounceComponentRoutingModule {}
