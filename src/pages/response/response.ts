import {
    Component
} from '@angular/core';
import {
    NavController,
    NavParams
} from 'ionic-angular';
import {
    HttpClient, HttpHeaders
} from '@angular/common/http';
import {
    Storage
} from '@ionic/storage';

@Component({
    selector: 'Response',
    templateUrl: 'response.html'
})
export class Response {
    token = null;
    httpOptions = null 

    constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private storage: Storage) {
        // If we navigated to this page, we will have an item available as a nav param
        
        this.storage.get('token').then(data => {
            this.token = data
            this.httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'Authorization': "Bearer " + this.token
                })
              };
            this.httpClient.get('http://localhost:5000/event/user/1', this.httpOptions ).subscribe(data => {
                console.log(data)
                

            })
        })

    }




}
