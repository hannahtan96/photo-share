import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from './components/slides/slides.component';
import { UploaderComponent } from './components/uploader/uploader.component';

const routes: Routes = [
  {
    path: '',
    component: UploaderComponent
  },
  {
    path: 'slides',
    component: SlidesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
