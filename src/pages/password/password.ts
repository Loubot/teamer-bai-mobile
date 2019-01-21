import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams
} from 'ionic-angular';

import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';

import {
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import {
    TextEqualityValidatorModule
} from "ngx-text-equality-validator";
import {
    Storage
} from '@ionic/storage';

import {
    HostnameProvider
} from '../../providers/hostname/hostname'


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
    user = null
    token = null
    httpOptions = null
    constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private storage: Storage, public httpClient: HttpClient,
                public global: HostnameProvider ) {
        this.passwordForm = this.fb.group({
            password: [""],
            repeatPassword: [""]
        });
        this.storage.get('user_token').then(data => {
            this.user = data.user
            this.token = data.token
        })
    }

    onSubmit() {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            })
        };
        this.valid = (this.passwordForm.value.password === this.passwordForm.value.repeatPassword)
        if (this.valid) {
            this.httpClient.put(this.global.hostname + 'update-password', {
                email: this.user.email,
                password: this.passwordForm.value.password
            },
            this.httpOptions).subscribe(data => {
            console.log(data)

        })
        }
        console.log(this.passwordForm.dirty)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PasswordPage');
    }

}
