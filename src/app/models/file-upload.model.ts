export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(name: string, url: string, file: File) {
    this.name = name;
    this.url = url;
    this.file = file;
  }
}
