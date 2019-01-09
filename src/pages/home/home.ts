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

import { HostnameProvider } from '../../providers/hostname/hostname'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    
   
    constructor( public navCtrl: NavController, public httpClient: HttpClient, private storage: Storage, public global: HostnameProvider ) {

        console.log( this.global.hostname )
        this.httpClient.post( this.global.hostname + '/login', {

            email: 'lllouis@yahoo.com',
            password: 'pass'
        }, {}).subscribe( data => {
            console.log( data)
            // console.log( this.global.hostname )
            this.storage.set( 'token', data[0] )
            this.storage.set( 'user', data[1] )
            this.navCtrl.push(Response)
        })

    }
    public login = {
        email: "",
        password: ""
    }
    logForm() {

        this.httpClient.post( this.global.hostname + '/login', {

            email: this.login.email,
            password: this.login.password
        }, {}).subscribe(data => {
            console.log(data)
            this.storage.set( 'token', data )
            
            this.navCtrl.push(Response)
            alert( 'a' )
            alert( data )
        })
    }

}
