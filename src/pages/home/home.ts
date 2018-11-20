import {
    Component
} from '@angular/core';
import {
    NavController
} from 'ionic-angular';
declare var http;
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    
    constructor(public navCtrl: NavController, public httpClient: HttpClient ) {
        
        
    }

    sayHello(){
        this.httpClient.post( 'http://localhost:5000/register', { email: 'lllouis@yahoo.com', password: 'pass' }, {} ).subscribe( data => {
            console.log( data )
        })
    }

}
