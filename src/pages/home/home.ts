import {
    Component
} from '@angular/core';
import {
    NavController
} from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    
    constructor(public navCtrl: NavController, private http: HTTP ) {
        this.http.post( 'http://localhost:5000/register', { email: 'lllouis@yahoo.com', password: 'pass' }, {} ).then( data => {
            console.log( data )
        }).catch( err => {
            console.log( err )
        })
    }

}
