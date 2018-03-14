import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  imagePath: string;
  ready = false;
  title: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private media: MediaProvider) {
  }

  ngOnInit() {
    const fileId = this.navParams.get('id');
    this.media.onGetPhoto(fileId).subscribe(
      response => {
        this.imagePath = this.media.baseUrl + '/uploads/' + response['filename'];
        this.ready = true;
        this.title = response['title'];
      }
    );
  }

}
