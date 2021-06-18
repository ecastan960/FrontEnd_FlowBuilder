import { Component, OnInit } from '@angular/core';
import { CellsService } from 'src/app/services/cells.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cell: any[] = []



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

  LoadPage(){
    this._cell.getCelula().subscribe(data => {
      this.cell = [];
      data.forEach((element:any) => {
        this.cell.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      } );
      const size = this.cell[0]['cells'].length;

      for (let i = 0; i < size ; i++) {
        this._cell.graph.addCells([this.cell[0]['cells'][i]])
      };  
  });
}

}
