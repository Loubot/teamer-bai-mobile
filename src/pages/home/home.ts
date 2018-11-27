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
import { ListPage } from '../list/list'


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public httpClient: HttpClient) {


    }
    todo = {}
    logForm() {

        this.httpClient.post('http://localhost:5000/login', {
            email: 'lllouis@yahoo.com',
            password: 'pass'
        }, {}).subscribe(data => {
            this.navCtrl.push( ListPage )
        })
    }

}
