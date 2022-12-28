import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';


import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy]);

@Component({
  selector: 'corp-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlidesComponent implements OnInit {
  slides$ = new BehaviorSubject<string[]>(['']);

  constructor() {}

  ngOnInit(): void {
      this.slides$.next(
        Array.from({ length: 600 }).map((el, index) => `Slide ${index+1}`)
      );
  }

}
