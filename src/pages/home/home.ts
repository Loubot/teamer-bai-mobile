import {
    Component
} from '@angular/core';
import {
    NavController
} from 'ionic-angular';
declare var http;
import {
    HttpClient
} from '@angular/common/http';
import {
    Response
} from '../response/response'

import {
    Storage
} from '@ionic/storage';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor( public navCtrl: NavController, public httpClient: HttpClient, private storage: Storage ) {
        this.httpClient.post('http://localhost:5000/login', {
            email: 'lllouis@yahoo.com',
            password: 'pass'
        }, {}).subscribe(data => {
            // console.log(data)
            this.storage.set( 'token', data )
            
            this.navCtrl.push(Response)
        })

    }
    login = {};
    logForm() {
        this.httpClient.post('http://localhost:5000/login', {
            email: this.login.email,
            password: this.login.password
        }, {}).subscribe(data => {
            console.log(data)
            this.storage.set( 'token', data )
            
            this.navCtrl.push(Response)
        })
    }

}
