import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TextEqualityValidatorModule } from "ngx-text-equality-validator";


/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  passwordForm: FormGroup
  valid = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder ) {
    this.passwordForm = this.fb.group({
      password: [""],
      repeatPassword: [""]
    });
    console.log( this.passwordForm.dirty )
  }

  onSubmit() {
    this.valid = ( this.passwordForm.value.password === this.passwordForm.value.repeatPassword )
    console.log( this.passwordForm.dirty )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

}
