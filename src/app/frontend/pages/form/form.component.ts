import { Component, OnInit } from '@angular/core';
import { CellsService } from '../../../services/cells.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  mensaje:string = '';
  salidas:number = 1;
  outputs:string[] = [];

  constructor(private _cell: CellsService) { }

  ngOnInit(): void {

  }

  actualizar(){

    this._cell.element.attr(['text'],{text:`${this.mensaje}`})
    
    this._cell.element.addOutPort(`test`)
    this._cell.element.removeOutPort(`test`)
    console.log(this.outputs);
    console.log(this._cell.element.attributes.outPorts);
  }

  agregarSalidas(){
    this.outputs = this._cell.element.attributes.outPorts;
    
    if (this.outputs.length < 4) {
      this.salidas += 1;
      this._cell.element.addOutPort(`out${this.salidas}`)
      this.outputs = this._cell.element.attributes.outPorts;
      console.log(this.outputs);
    }
  }

  eliminarSalidas(){
    
    if (this.outputs.length > 1) {
      this._cell.element.removeOutPort(`out${this.salidas}`)
      this.salidas -= 1;
      this.outputs.pop();
      console.log(this.outputs);
      console.log(this._cell.element.attributes.outPorts);
    }
    
  }
}
