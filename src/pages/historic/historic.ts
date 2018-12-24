import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';

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
  type = "CES";
  none = null;
  //type u - utilizou
  //type cet - compra ou estorno (trans)
  //type ces - compra ou estorno (sysz)

  constructor(public navCtrl: NavController, public keyboard: Keyboard, public datePicker: DatePicker, public navParams: NavParams, public http: HttpServiceProvider) {

  }

  data_inicial: any;
  data_final: any;

  openDatepicker(type) {
    this.keyboard.hide();
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        if (type == 1) {
          this.data_inicial = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
        } else if (type == 2) {
          this.data_final = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }


  getHistoric() {
    this.http.presentLoading();
    return this.http.getParam('client/historics', 'date_of_the_day=' + this.data_inicial +
      '&date_until_the_day=' + this.data_final + '&type='+ this.type).subscribe((result: any) => {
        console.log('teste' + result);
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
      switch (this.type) {
        case "CES":
          this.items[key] = {
            title: this.historics[key].description,
            content: [
              { msg: "Código de comprovante: " ,
                msg1 : this.historics[key].code
              },
              {
                items: [
                  //TODO colocar valor negativo
                  ["Valor", (+this.historics[key].grossAmount).toFixed(2)]
                ]
              },
            ],
            icon: "ios-card",
            time: time_split

          }
          break;

        case "U":
        this.items[key] = {
          title: "Placa "+this.historics[key].ticket_Placa,
          content: [
            { msg: "Código de autenticação da Transalvador: " ,
              msg1 : this.historics[key].ticket_comprovante
            },
            {
              items: [
                //TODO colocar valor negativo
                ["Valor", "R$ "+(+this.historics[key].amount).toFixed(2)],
                ["Logradouro", this.historics[key].logradouro_tarifa.logradouro.log_nome],
                ["Regra", (this.historics[key].time)/12+" Hs"],
              ]
            },
          ],
          icon: "ios-card",
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
    return this.http.getParam('client/historics', 'page=' + page + '&date_of_the_day=' + this.data_inicial +
      '&date_until_the_day=' + this.data_final + '&type=' + this.type).subscribe((result: any) => {
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
    this.getHistoricPerPage(this.historic_info.current_page += 1, this.type);
  }

  previousPage() {
    this.getHistoricPerPage(this.historic_info.current_page -= 1, this.type);
  }


}
