import { Component, OnInit } from '@angular/core';
import { CellsService } from 'src/app/services/cells.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {



  constructor(private _cell: CellsService ) { 

  }

  ngOnInit(): void {
  }

  nuevaPregunta():any{
    this._cell.agregarPregunta();
  }

  llamarElement():any{
    console.log(this._cell.element.id);
  }

  nuevoProyecto(){
    this._cell.nuevoProyecto();
  }

  nuevoMensaje(){
    this._cell.nuevoMensaje();
  }

  finProyecto(){
    this._cell.finProyecto();
  }

  guardarProyecto(){
    this._cell.guardarProyecto();
  }

}
