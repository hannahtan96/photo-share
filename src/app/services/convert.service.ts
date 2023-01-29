import { Injectable } from '@angular/core';
import  * as fs  from "fs";
import { promisify } from "util";
// @ts-ignore
import convert from 'heic-convert';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  async convertFile(file: any) {
    const inputBuffer = await promisify(fs.readFile)(file.url);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 1           // the jpeg compression quality, between 0 and 1
    });

    return outputBuffer;
  };

}
