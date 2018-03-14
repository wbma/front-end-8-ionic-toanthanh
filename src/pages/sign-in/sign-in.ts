import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SignUpPage} from "../sign-up/sign-up";
import {FileUploadPage} from "../file-upload/file-upload";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  constructor(private navCtrl: NavController, private auth: AuthService,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  onSignIn(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in ...'
    });
    loading.present();
    const userName = form.value.userName;
    const password = form.value.password;
    this.auth.signIn(userName, password).subscribe(
      response => {
        loading.dismiss();
        const token = response['token'];
        console.log(token);
        localStorage.setItem('token', token);
        this.navCtrl.setRoot(FileUploadPage);
        this.auth.authenticated = true;
      },
      err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sign In',
          message: err['error'].message,
          buttons : ['Ok']
        });
        alert.present();
        this.auth.authenticated = false;
        console.log(err);
      }
    );
  }

  onNavigateToSignUp() {
    this.navCtrl.setRoot(SignUpPage);
  }

}
