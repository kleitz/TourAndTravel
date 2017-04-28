import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FilterTransportPage} from '../filter-transport/filter-transport';
import {TransportService} from '../../providers/transport-service';
import {IteneraryService} from '../../providers/itenerary-service';

@Component({
  selector: 'page-list-transport',
  templateUrl: 'list-transport.html',
   providers: [TransportService,IteneraryService]
})
export class ListTransportPage {
  listtransports: Array<any>;
  transport: Array<any>;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public ite : IteneraryService,
  public tra : TransportService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListTransportPage');
  }

   ionViewWillEnter() {
    this.tra.listTransport().subscribe(data=>{
            this.listtransports=data;
            this.transport=this.listtransports;
            console.log(this.listtransports);
            },err => {
                    console.log(err);
                },
                () => console.log('Transport Search Complete')
            );
  }

  listTransport(){
      this.transport=this.listtransports;
    }

getItems(searchbar) {
          // Reset items back to all of the items
          this.transport;
          // set q to the value of the searchbar
          var q = searchbar.target.value;
          // if the value is an empty string don't filter the items
          if (q.trim() == '') {
            this.listTransport();
            return;
          }

          this.transport = this.transport.filter((v) => {

            if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
              }
              return false;
            })

        }


    setSelectedTransport(trans){
     console.log(trans);
     var data = JSON.stringify({trans});
     console.log(data);
     this.ite.setTransport(data);
     this.navCtrl.pop();
    }

     filtertransTapped(event) {
    this.navCtrl.push(FilterTransportPage);
  }

  
}
