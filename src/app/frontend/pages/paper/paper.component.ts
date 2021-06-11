import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import { CellsService } from 'src/app/services/cells.service';
// import * as joint from 'jointjs/dist/joint';
declare var require: any;
const joint = require('../../../../../node_modules/jointjs/dist/joint.js');

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  cell: any[] = []
  graph = new joint.dia.Graph;
  standard = joint.shapes.standard;
  output = {};
  size: number = 0;
  outputCx = {};
  constructor(private _cell: CellsService ) { }

  ngOnInit() {
    this._cell.iniciarPagina();
  }

}


