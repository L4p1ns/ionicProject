import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email: '',
    password: '',
    displayName: ''
  }

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider) {
  }


  goback() {
    this.navCtrl.setRoot('LoginPage');

  }
  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('Veillez remplir tous les champs');
      toaster.present();
    }
    else if (this.newuser.password.length < 6) {
      toaster.setMessage('Le mot de passe doit suppérieur a 6 caractere');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Chargement en cours...'
      });    
    loader.present();
    this.userservice.adduser(this.newuser).then((res: any) => {
      loader.dismiss();
      if (res.success)
        this.navCtrl.push('ProfilepicPage');
      else
        alert('Erreur' + res);
    })
  }
  }
}
