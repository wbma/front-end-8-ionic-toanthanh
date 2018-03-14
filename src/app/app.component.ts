import { Component, ViewChild } from '@angular/core';
import {MenuController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {AuthService} from "../services/auth.service";
import {FileUploadPage} from "../pages/file-upload/file-upload";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage: any = SignInPage;
  signUpPage = SignUpPage;
  homePage = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private auth: AuthService, private menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sign In', component: SignInPage },
      { title: 'Sign Up', component: SignUpPage }
    ];
    this.isAuthenticated();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated().subscribe(
      response => {
        console.log(response);
        this.auth.getCurrentUserName();
        this.auth.authenticated = true;
        this.rootPage = FileUploadPage;
      },
      err => {
        console.log(err);
        this.auth.authenticated = false;
        this.rootPage = SignInPage;
      }
    );
  }

  onSignOut() {
    this.auth.signOut();
    this.menuCtrl.close();
    this.auth.authenticated = false;
    this.rootPage = SignInPage;
    this.nav.setRoot(SignInPage);
  }
}
