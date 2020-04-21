import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Symptom } from '../models/symptom'; 
import { AlertController } from '@ionic/angular';
import { SintomasService } from '../api/sintomas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  public symptom: Symptom
  public tos = "Nunca"
  public fiebre = 'Nunca'
  public garganta = "Nunca"
  public mucosidad = 'Nunca'
  public estornudos = "Nunca"
  public dolorCuerpo = "Nunca"
  public dificultadRespirar = "Nunca"

  constructor(
    private sintomasService: SintomasService,
    public alertController: AlertController,
    private router: Router
  ) { 
    this.symptom = new Symptom()
  }

  calculateFiebre(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.fiebre = result[0]
    this.symptom.fiebre = result[1]
  }

  calculateDR(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.dificultadRespirar = result[0]
    this.symptom.dificultad_respiratoria = result[1]

  }

  calculateTos(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.tos = result[0]
    this.symptom.tos = result[1]
  }

  calculateDC(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.dolorCuerpo = result[0]
    this.symptom.dolor_cuerpo = result[1]
  }
  
  calculateMucosidad(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.mucosidad = result[0]
    this.symptom.mucosidad = result[1]
  }

  calculateEstornudos(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.estornudos = result[0]
    this.symptom.estornudos = result[1]
  }
  
  calculateDG(event){
    let value = event.detail.value
    let result = this.calculate(value)
    this.garganta = result[0]
    this.symptom.garganta = result[1]
  }
  
  calculate(value){
    let val = []
    if(value == 0) {
      val.push('Nunca')
      val.push(0)
    } else if (value == 1){
      val.push('Rara vez')
      val.push(0.30)
    } else if (value == 2){
      val.push('Algunas veces')
      val.push(0.60)
    } else if (value == 3){
      val.push('Siempre')
      val.push(1)
    }
    
    return val
  }

  onSubmit(RegisterForm: any) {
    this.sintomasService.register(this.symptom).subscribe(
      response => {
        this.presentAlert('Probabilidad de contagio', `<ion-grid>
        <ion-row>
          <ion-col>COVID-19</ion-col>
          <ion-col>`+(response.resultado.coronavirus * 100)+`%</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Influenza</ion-col>
          <ion-col>`+(response.resultado.influenza * 100)+`%</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Gripe</ion-col>
          <ion-col>`+(response.resultado.gripe * 100)+`%</ion-col>
        </ion-row>`)
      },
      error => {
        let message = 'Se produjo un error por favor inténtelo mas tarde' + JSON.stringify(error)
        
        if(error.status != 0){
          message = ''
          error.error.errors.forEach(element => {
            message += '<li>' + element + '</li><br />'  
          });
        }
        this.presentAlert('Error', message)
      }
    ); 
  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
