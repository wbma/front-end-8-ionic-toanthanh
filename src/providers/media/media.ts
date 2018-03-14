import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  baseUrl = 'http://media.mw.metropolia.fi/wbma';
  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  onUploadPhoto(file: File, title: string) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    return this.http.post(this.baseUrl + '/media', formData, settings);
  }

  onGetPhoto(id: number) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.baseUrl + '/media/' + id, settings);
  }
}
