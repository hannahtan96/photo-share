import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { map } from 'rxjs/operators';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy } from 'swiper';


SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy]);

@Component({
  selector: 'corp-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlidesComponent implements OnInit {

  fileUploads: any[] = [];
  count: number = 1;
  private basePath = '/uploads';

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {

    this.db.database.ref(this.basePath).on('value', (snap) => {
      this.count = snap.numChildren();
    });
  }

  // getCount() {
  //   this.db.database.ref(this.basePath).on('value', (snap) => {
  //     this.count = snap.numChildren();
  //   })
  // }

  getFiles(numberItems: number) {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems))
  }

  async ngOnInit() {
    console.log(this.count)
    this.getFiles(this.count).snapshotChanges().pipe(
      map(changes => changes.map(c => (c.payload.val()))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log(this.fileUploads);
    });
  };
}

