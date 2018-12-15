import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the HistoricPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html',
})
export class HistoricPage {

  historic_info = {
    current_page: 1,
    total_pages: 1
  }

  historics = [];
  items = [];
  type = "ALL";
  none = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServiceProvider) {

  }

  getHistoric() {
    this.http.presentLoading();
    return this.http.getParam('client/historics','type='+this.type).subscribe((result: any) => {
      console.log('teste'+result);
      this.historic_info.current_page = result.current_page;
      this.historic_info.total_pages = result.last_page;
      this.historics = result.data;
      this.http.dismissLoading();
    }, error => {
      this.http.dismissLoading();
      console.log(error);
    });
  }

  filterHistoric(type: any) {
    this.getHistoricPerPage(this.historic_info.current_page, type);
  }

  setHistoricData() {
    console.log(this.historics);
    this.items = [];
    this.historics.length == 0? this.none = "Nenhum histórico para exibir":this.none = "";

    for (let key in this.historics) {
      let time_split = this.historics[key].created_at.split(" ");
      let aux = time_split[0].split("-");
      time_split[0] = aux[2] + "/" + aux[1] + "/" + aux[0]
      switch (this.historics[key].type) {
        case 'T':
          // troca de crédito por card

          this.items[key] = {
            title: "Troca de Card",
            content: [
              { msg: "Você trocou seus créditos por cards" },
              {
                items: [
                  //TODO colocar valor negativo
                  ["Valor", this.historics[key].amount],
                  ["Saldo Anterior", this.historics[key].amount_before],
                  ["Saldo Atual", this.historics[key].amount_after],
                ]
              },
            ],
            icon: "ios-card",
            time: time_split

          }
          break;

        case 'C':
          // compra de crédito

          this.items[key] = {
            title: "Compra de Crédito",
            content: [
              { msg: "Você trocou seus créditos por cards" },
              {
                items: [
                  ["Saldo Atual", this.historics[key].amount_after],
                  ["Valor da compra ", this.historics[key].amount],
                ]
              },
            ],
            icon: "ios-cash",
            time: time_split
          }
          break;

        case 'CP':
          //compra de cards em ponto de venda
          this.items[key] = {
            title: "Compra de Cards",
            content: [
              { msg: "Você trocou seus créditos por cards" },
              {
                items: [
                  ["Saldo Atual", this.historics[key].amount],
                ]
              },
            ],
            icon: "ios-cash",
            time: time_split
          }
          break;

        case 'U':
          // usou card para pagamento de estacionamento
          this.items[key] = {
            title: "Estacionou",
            //content:"Você estacionamento usando cards",
            content: [
              { msg: "Você trocou seus créditos por cards" },
              {
                items: [
                  ["Saldo Atual", this.historics[key].amount],
                  ["Cards", this.historics[key].total_cards],
                ]
              },
            ],
            icon: "ios-car",
            time: time_split
          }
          break;
      }
    }
    console.log('vands'+this.items);
  }
  ionViewDidLoad() {
    this.getHistoric().add(() => {
      this.setHistoricData();
    });
  }

  getHistoricPerPage(page, type: string) {
    this.http.presentLoading();
    return this.http.getParam('client/historics', 'page=' + page + "&type=" + type).subscribe((result: any) => {
      console.log(result);
      this.historic_info.current_page = result.current_page;
      this.historic_info.total_pages = result.last_page;
      this.historics = result.data;
      this.setHistoricData();
      this.http.dismissLoading();
    }, error => {
      this.http.dismissLoading();
      console.log(error);
    });
  }

  nextPage() {
    this.getHistoricPerPage(this.historic_info.current_page += 1, 'ALL');
  }

  previousPage() {
    this.getHistoricPerPage(this.historic_info.current_page -= 1, 'ALL');
  }


}
