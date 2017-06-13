import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.credentials.email == '' || this.credentials.password == '') {
      toaster.setMessage('Veillez vous authentifier SVP');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Authentification en cours...'
      });
      loader.present();
      this.authservice.login(this.credentials).then((res: any) => {
        loader.dismiss();
        if (!res.code)
          this.navCtrl.setRoot('TabsPage');
        else
          //alert(res);
          toaster.setMessage('Erreur de connexion');
        toaster.present();
      })
    }

  }
  signup() {
    this.navCtrl.push('SignupPage');
  }

}
