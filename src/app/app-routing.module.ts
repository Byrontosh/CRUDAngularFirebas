import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoComponent } from './components/auto/auto.component';

const routes: Routes = [
  { path: 'auto', component: AutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
