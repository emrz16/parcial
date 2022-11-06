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
      let actual = this.cantidadActualTiposCafe(this.tiposCafe, c.tipo.toLocaleLowerCase());
      if(actual == 0){
        this.tiposCafe.push(new CafeTipo(c.tipo.toLocaleLowerCase(), 1));
      }
    }
  }

  cantidadActualTiposCafe(cafeTipo:CafeTipo[], tipo:string){
      for(var c of cafeTipo){
        if(c.tipo.toLocaleLowerCase() == tipo){
          c.cantidad = c.cantidad +1;
          return c.cantidad;
        }
      }
      return 0;
  }

}
