import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  items = [
    {
      name: 'Posso adquirir créditos para qualquer vaga Zona Azul? As regras são as mesmas?',
      description: 'Sim! O crédito adquirido através de um aplicativo credenciado para o ZONA AZUL DIGITAL da cidade de Salvador permite a utilização das vagas de estacionamento rotativo Zona Azul. A regularização do veículo ocorrerá através de ativação de crédito para a vaga. As regras de utilização, tempo de permanência, são as mesmas já sinalizadas nas áreas de estacionamento Zona Azul. Verifique a sinalização do local.',
    },
    {
      name:'O custo será o mesmo que um cartão Zona Azul de papel e valerá pelo mesmo tempo?',
      description:'Sim! O crédito ativado permitirá ao veículo estacionar na mesma vaga durante o tempo de validade do Crédito. O veículo deve ser retirado da vaga após o término de tempo permitido, caso contrário, será considerado como estacionado de forma irregular e ficará sujeito à aplicação de penalidade (multa grave - 5 pontos) e medida administrativa (guinchamento), exatamente como acontecia com o cartão Zona Azul de papel.'
    },
    {
      name:'E a Zona Azul dos bolsões como Piatã e de áreas especiais, mudam?',
      description:'Não. As regras continuam as mesmas já utilizadas com as cartelas (papel) do Zona Azul. Em algumas áreas consideradas Áreas Especiais, o tempo de validade do Cartão é diferente e está indicado.'
    },
    {
      name:'Como o agente vai fiscalizar sem nenhum cartão de papel no carro? Como ele saberá que eu estou usando um Aplicativo?',
      description:'Para fiscalizar os veículos estacionados em área Zona Azul, o agente de trânsito utilizará um aplicativo próprio. Ao digitar a placa do veículo, o aplicativo irá informar se o veículo está regular ou não, desta forma é importante ficar atento ao horário em que o crédito expira.'
    },
    {
      name:'Tenho mais de um carro. Posso cadastrar mais de uma placa no aplicativo da Zona Azul Digital?',
      description:'Sim. Nos aplicativos é possível cadastrar quantas placas de veículos desejar, mas só poderá ativar no máximo 2 veículos ao mesmo tempo.'
    },
    {
      name:'O que é preciso para usar a Zona Azul Digital?',
      description:'A partir de seu celular, baixe um dos aplicativos disponíveis para utilizar a Zona Azul Digital. Acesse aqui e veja as empresas credenciadas pela TRANSALVADOR. Você terá que cadastrar login e senha, para tanto, o aplicativo pedirá seu CPF ou CNPJ e alguns dados pessoais.'
    },
    {
      name:'O cartão Zona Azul de papel continua valendo?',
      description:'O Cartão Zona Azul em papel continuará valendo até 01/11/2019. A partir desta data para pagar a tarifa ao estacionar em uma vaga de Zona Azul, o usuário deverá utilizar aplicativos credenciados pela TRANSALVADOR que operam em aparelhos móveis (celulares, smartphones, tablets).'
    }
    
    
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
