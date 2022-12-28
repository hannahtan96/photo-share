import { Component } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'corp-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  isHovering: boolean=false;
  files: any = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i=0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }


}
