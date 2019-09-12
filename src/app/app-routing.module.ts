import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ChoicesComponent } from './choices/choices.component';


const routes: Routes = [{
  path: ':level',
  component: BoardComponent
},{
  path: '',
  component: ChoicesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
