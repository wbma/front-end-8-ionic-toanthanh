import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {HomePage} from "../home/home";

/**
 * Generated class for the FileUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-file-upload',
  templateUrl: 'file-upload.html',
})
export class FileUploadPage {
  file: File;
  title: string;
  fileId: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private media: MediaProvider) {
  }

  setFile(evt: any) {
    this.file = evt.target.files[0];
    console.log(this.file);
  }

  onUploadPhoto() {
    this.media.onUploadPhoto(this.file, this.title).subscribe(
      (data: any) => {
        console.log(data);
        this.fileId = +data['file_id'];
        this.navCtrl.push(HomePage, {
          id: this.fileId
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        alert('Upload Photo failed');
      }
    );
  }

  onSubmit() {
    this.onUploadPhoto();
  }

}
