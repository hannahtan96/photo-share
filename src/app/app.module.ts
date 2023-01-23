import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environments';

import { SlidesComponent } from './components/slides/slides.component';
import { SwiperModule } from 'swiper/angular';

import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { LoginComponent } from './login/login.component';

import { TokenInteceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInteceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
