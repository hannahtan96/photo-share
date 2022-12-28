import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';


import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy]);

@Component({
  selector: 'corp-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlidesComponent implements OnInit {
  // slides$ = this.file
  slides$ = new BehaviorSubject<string[]>(['']);

  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index+1}`)
    );
  }
}
