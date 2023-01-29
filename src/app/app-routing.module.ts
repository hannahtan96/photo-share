import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SlidesComponent } from './components/slides/slides.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'},
  {
    path: 'upload',
    component: UploaderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'slides',
    component: SlidesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
