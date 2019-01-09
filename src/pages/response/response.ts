import {
    Component
} from '@angular/core';
import {
    NavController,
    NavParams
} from 'ionic-angular';
import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import {
    Storage
} from '@ionic/storage';

import {
    ActionSheetController
} from 'ionic-angular';
import {
    hasLifecycleHook
} from '@angular/compiler/src/lifecycle_reflector';
import { HostnameProvider } from '../../providers/hostname/hostname';

@Component({
    selector: 'Response',
    templateUrl: 'response.html'
})
export class Response {
    token = null;
    httpOptions = null
    invitation = null
    invitations = null
    presentActionSheet = null
    constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private storage: Storage,
        public actionSheetCtrl: ActionSheetController, public global: HostnameProvider ) {
        // If we navigated to this page, we will have an item available as a nav param

        // this.storage.get( 'user' ).then( user => {
        //     console.log( user )
        // })

        this.storage.get('token').then(data => {
            this.token = data
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.token
                })
            };
            this.httpClient.get( this.global.hostname + 'invitations/user/1', this.httpOptions ).subscribe(data => {
                console.log(data)
                this.invitations = data

            })
        })

    }


    respond_to_invite(invite) {
        console.log(invite)
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            })
        };
        this.actionSheetCtrl.create({
            title: 'Modify your album',
            buttons: [{
                text: 'Decline ',
                role: 'destructive',
                cssClass: 'not_confirmed',
                handler: () => {
                    console.log( '1' )
                    this.httpClient.put( this.global.hostname + 'invitations/' + invite.Event.id + '/user/' + 1, 
                    { confirm: false },
                    this.httpOptions).subscribe(data => {
                        console.log(data)
                        this.invitations = data

                    })
                }
            }, {
                text: 'Accept',
                cssClass: 'confirmed',
                handler: () => {
                    console.log( '2' )
                    this.httpClient.put('invitations/' + invite.Event.id + '/user/' + 1, 
                    { confirm: true },
                    this.httpOptions).subscribe(data => {
                        console.log(data)
                        this.invitations = data

                    })
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        }).present()
    }

}
