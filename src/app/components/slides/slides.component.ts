import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Autoplay, Lazy } from 'swiper';
import { UploadTaskComponent } from '../upload-task/upload-task.component';


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

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {}

  getCount() {
    return this.db.database.ref(this.basePath).on('value', (snap) => {
      return snap.numChildren();
      // console.log(this.count)
    })
  }

  getFiles(numberItems: number) {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems))
  }

  ngOnInit() {
    this.getFiles(1000).snapshotChanges().pipe(
        map(changes => changes.map(c => (c.payload.val()))
        )
      ).subscribe(fileUploads => {
        this.fileUploads = fileUploads;
    });
  };
}

