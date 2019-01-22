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

import {
    HostnameProvider
} from '../../providers/hostname/hostname'

import { AlertController } from 'ionic-angular';


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
    mycontent = null
    user = null
    constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private storage: Storage,
        public actionSheetCtrl: ActionSheetController, public global: HostnameProvider, private alertCtrl: AlertController ) {
        // If we navigated to this page, we will have an item available as a nav param

        // this.storage.get( 'user' ).then( user => {
        //     console.log( user )
        // })
        // console.log('wooho')
        // this.token = window.localStorage.getItem('token')
        // console.log(this.token)
        // const headers = new HttpHeaders().set('Authorization', "Bearer " + this.token)

        // this.httpClient.get(this.global.hostname + 'invitations/user/1', {
        //     headers
        // }).subscribe(data => {
        //     console.log(data)
        //     this.invitations = data

        // })
        
        this.storage.get('user_token').then( data => {
            this.token = data.token
            console.log( this.token )
            this.user = data.user
            console.log( this.user )
            // this.token = window.localStorage.getItem( 'token' )
            // console.log( this.token )
           const headers = new HttpHeaders().set( 'Authorization', "Bearer " + this.token )

            this.httpClient.get( this.global.hostname + 'invitations/user/' + this.user.id, 
                { headers }).subscribe(data => {
                console.log(data)
                this.invitations = data

            })
        })

        

    }

    openPage( a ){
        console.log( a )
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
                    console.log(this.global.hostname + 'invitations/' + invite.id + '/user/' +  this.user.id)
                    this.httpClient.put(this.global.hostname + 'invitations/' + invite.id + '/user/' + this.user.id, {
                            confirm: false,
                            Event: invite.Event
                        },
                        this.httpOptions).subscribe(data => {
                        console.log(data)
                        this.invitations = data

                    })
                }
            }, {
                text: 'Accept',
                cssClass: 'confirmed',
                handler: () => {
                    console.log('2')
                    this.httpClient.put(this.global.hostname + 'invitations/' + invite.id + '/user/' + this.user.id, {
                            confirm: true,
                            Event: invite.Event
                        },
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
