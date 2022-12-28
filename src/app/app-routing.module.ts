import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from './components/slides/slides.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

const routes: Routes = [
  {
    path: 'upload',
    component: UploadFormComponent
  },
  {
    path: '',
    component: SlidesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
