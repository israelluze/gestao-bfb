import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main/atletas'},
  {path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [AuthGuardService]},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
