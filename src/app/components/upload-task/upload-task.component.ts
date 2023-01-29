import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FileUpload } from 'src/app/models/file-upload.model';

import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators'
import { TaskEvent } from '@firebase/storage';
import { UploadTask, UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

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
  snapshot?: UploadTask;
  downloadURL?: String;

  private basePath = '/uploads';


  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
      this.pushFileToStorage(this.file);
  }

  pushFileToStorage(file: File): Observable<number|undefined> {

    let newFile = file

    // if (file.name.endsWith('heic')) {
    //   let blob = file.slice(0, file.size, 'image/jpeg');
    //   newFile = new File([blob], `${file.name.slice(0,file.name.length-5)}.jpeg`, {type: 'image/jpeg'});
    // } else {
    //   newFile = file
    // };

    const filePath = `${this.basePath}/${newFile.name}`;
    console.log(filePath)
    const fileName = `${Date.now()}_${newFile.name}`;
    const storageRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, newFile);
    this.snapshot = this.task.task;

    this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {

          const fileUpload = new FileUpload(fileName, downloadURL, newFile);
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

  isActive(snapshot: UploadTask) {
    return snapshot.snapshot.state === 'running' && snapshot.snapshot.bytesTransferred < snapshot.snapshot.totalBytes;
  }

}
