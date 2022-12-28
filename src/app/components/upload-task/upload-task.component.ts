import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FileUpload } from 'src/app/models/file-upload.model';

import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators'

@Component({
  selector: 'corp-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input()
  file!: File;
  task?: AngularFireUploadTask;
  percentage?: Observable<number|undefined>;
  snapshot?: any;
  downloadURL?: String;


  private basePath = '/uploads';

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
      this.pushFileToStorage(this.file);
  }

  pushFileToStorage(file: File): Observable<number|undefined> {
    const filePath = `${this.basePath}/${file.name}`;
    const fileName = `${Date.now()}_${this.file.name}`;
    const storageRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, file);

    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          const fileUpload = new FileUpload(fileName, downloadURL, file);
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    this.percentage = this.task.percentageChanges();
    return this.percentage
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  isActive(snapshot: any ) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
