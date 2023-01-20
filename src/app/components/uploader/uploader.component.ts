import { Component } from '@angular/core';

@Component({
  selector: 'corp-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  isHovering: boolean=false;
  files: any = [];
  count: number = 0;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i=0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.count ++;
    }
  }


}
