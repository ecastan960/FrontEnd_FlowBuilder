import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import { AngularFirestore } from '@angular/fire/firestore';
import { CellsService } from 'src/app/services/cells.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
declare var require:any;
const joint = require('../../node_modules/jointjs/dist/joint.js');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jointjsV3';
  cell: any[] = []
  graph = new joint.dia.Graph;
  standard = joint.shapes.standard;
  output = {};
  size: number = 0;
  outputCx = {};


  constructor(firestore: AngularFirestore,
    private _cell: CellsService,
    ) { }
  
  ngOnInit() {
    
    let paper = new joint.dia.Paper({
      el: document.getElementById('paper'),
          width: 2000,
          height: 600,
          gridSize: 1,
          model: this.graph,
          restrictTranslate: {
              x: 50,
              y: 50,
              width: 1900,
              height: 500
          }
    });

    

    // paper.on('blank:mousewheel', function() {
    
    //     paper.drawBackground({
    //         color: 'blue'
    //     })
    // });
    
  }

agregarPagina(){
  let rect = new joint.shapes.devs.Model({
    position: { x: 100, y: 30 },
    size: { width: 100, height: 50 },
    attrs: { rect: { fill: 'blue' }, text: { text: 'Quiere saber sobre celulares o portatiles', fill: 'white' } },
    inPorts: ['in1','in2'],
    outPorts: ['out1','out2'],
    ports: {
        groups: {
            'in': {
                attrs: {
                    '.port-body': {
                        fill: '#16A085'
                    }
                }
            },
            'out': {
                attrs: {
                    '.port-body': {
                        fill: '#E74C3C'
                    }
                }
            }
        }
    }
  });
  this.graph.addCell(rect)
  
}

guardarPagina(){
  let jsonObject = this.graph.toJSON();
  this._cell.agregarCelula(jsonObject);
  let infoCx:any[] = [];
  let element = {};
  for (let i = 0; i < jsonObject.cells.length; i++) {
    if (jsonObject.cells[i]['type'] == 'link')
    {
      element = {
        type: jsonObject.cells[i]['type'],
        id: jsonObject.cells[i]['id'],
        source: jsonObject.cells[i]['source']['id'],
        target: jsonObject.cells[i]['target']['id'],
        z: jsonObject.cells[i]['z'],
      }
    }
    else {
      element = {
        type: jsonObject.cells[i]['type'],
        id: jsonObject.cells[i]['id'],
        text: jsonObject.cells[i]['attrs']['text']['text'],
        z: jsonObject.cells[i]['z'],
      }
    }
    
    infoCx.push(element)
  }
  console.log(infoCx);
  this.outputCx = JSON.stringify(infoCx);
  console.log(this.outputCx);

  // console.log(jsonObject);
  // console.log(jsonObject.cells.length);
  // const output = JSON.stringify(jsonObject);
  // console.log(output);
}

  cargarPagina(){
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
        this.graph.addCells([this.cell[0]['cells'][i]])
      };  

      // this.graph.addCells([this.cell[0]['cells'][0],this.cell[0]['cells'][1],this.cell[0]['cells'][2],this.cell[0]['cells'][3],this.cell[0]['cells'][4]])
  });
}
}
