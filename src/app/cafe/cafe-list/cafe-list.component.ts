import { Component, OnInit } from '@angular/core';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';
import { CafeTipo } from 'src/app/cafe-tipo';
@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css']
})
export class CafeListComponent implements OnInit {
  cafes!:Cafe[];
  tiposCafe:CafeTipo[] = [];
  constructor(private cafeService:CafeService) { }

  ngOnInit(): void {
    this.getCafes();
  }

  getCafes(){
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
      this.getTiposCafe();
    });
  }

  getTiposCafe(){
    for(var c of this.cafes){
      let tipoCustom = c.tipo.toLocaleLowerCase().split(" ")[c.tipo.split(" ").length -1];
      let actual = this.cantidadActualTiposCafe(this.tiposCafe, tipoCustom);
      if(actual == 0){
        this.tiposCafe.push(new CafeTipo(tipoCustom, 1));
      }
    }
  }

  cantidadActualTiposCafe(cafeTipo:CafeTipo[], tipo:string){
      for(var c of cafeTipo){
        let tipoCustom = c.tipo.toLocaleLowerCase().split(" ")[c.tipo.split(" ").length -1];
        if(tipoCustom == tipo){
          c.cantidad = c.cantidad +1;
          return c.cantidad;
        }
      }
      return 0;
  }

}
