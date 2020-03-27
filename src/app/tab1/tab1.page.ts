import { Component } from '@angular/core';
import { Insumo } from '../models/insumos';
import { insumosService } from '../services/insumos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  insumos: Insumo[] = [];
  search: string;

  constructor(private insumosService: insumosService, private router: Router,
    private alert: AlertController) {
    this.clearSearch();
  }

  operation(pos: number, ev: {detail: { side }}) {
    const side = ev.detail.side;
    if (side === 'end') {
      //this.insumosService.changeStatus(pos);
      this.showAlert(pos);
    }//else {
     //this.showAlert(pos);
   // }
  }

  async showAlert(pos: number) {
    const al = await this.alert.create({
      header: 'Confirmar',
      message: '¿Seguro que desea eliminar?',
      buttons: [{
        text: 'No',
        handler: () => {}
      }, {
        text: 'Si',
        handler: () => {
          this.insumosService.deleteInsumo(pos);
        }
      }]
    });
    await al.present();
  }

  changeStatus(pos: number) {
    this.insumosService.changeStatus(pos);
  }
  newInsumo(): void {
    this.router.navigate(['/new-insumo']);
  }
  private clearSearch(): void {
    this.insumos = this.insumosService.getInsumos();
  }

  filter(): void {
    this.clearSearch();

    if (this.search && this.search.trim()) {
      this.insumos = this.insumos.filter( (insumo) => {
        return ((insumo.name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1)
        || (insumo.cantidad.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1));
      });
    }
  }

}