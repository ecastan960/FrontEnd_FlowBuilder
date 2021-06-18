import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import { any } from 'lodash';
import { SidebarComponent } from '../frontend/pages/sidebar/sidebar.component';
import { ModelResponse } from '../models/model-respose';
import { ThisReceiver } from '@angular/compiler';
import { FormComponent } from '../frontend/pages/form/form.component';
declare var require: any;
const joint = require('../../../node_modules/jointjs/dist/joint.js');

@Injectable({
  providedIn: 'root'
})
export class CellsService {
    pageActive = false;
    cell: any[] = []
    graph = new joint.dia.Graph;
    standard = joint.shapes.standard;
    output = {};
    size: number = 0;
    outputCx = {};
    outPorts = ['out1'];
    question = 'Pregunta';
    element:any = {};
    info:any[] = [];
    pages:ModelResponse[] = [];
    page:ModelResponse = {
        type: "",
        id: "",
        question: {
            type: "",
            content: ""
        },
        answers: [
            {
                phrase: "",
                target: ""
            }
        ] 
    };
    answers: any[]=[];

    constructor(private firestore: AngularFirestore) { }

    iniciarPagina(){
        let paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
            width: 900,
            height: 600,
            gridSize: 1,
            model: this.graph,
            restrictTranslate: {
                x: 5,
                y: 10,
                width: 1500,
                height: 1200
            }
        });
        let escala = 1;
        

        paper.on('blank:mousewheel', function(evt:any, x:any, y:any, delta:any) { 
            if (delta < 0 && escala > 0.7) {
                escala -= 0.1
                paper.scale(`${escala}`);
            } else {
                escala += 0.1
                paper.scale(`${escala}`);
            }
        });
        let boundaryTool = new joint.elementTools.Boundary({
        padding: 20,
        rotate: true,
        useModelGeometry: true,
        });
        
        let removeButton = new joint.elementTools.Remove();
        
        let toolsView = new joint.dia.ToolsView({
            tools: [
                boundaryTool,
                removeButton
            ]
        });
        this.element = paper.on('element:pointerdblclick', (elementView:any) => {
        let currentElement = elementView.model;
        let tools = currentElement.findView(paper);
        tools.addTools(toolsView);
        tools.showTools();
        this.pageActive = true;
        this.element = currentElement;
        // console.log(this.action.action);
        return currentElement
        });
    }

    agregarPregunta(){
        let qtion = new joint.shapes.devs.Model({
        position: { x: 10, y: 90 },
        size: { width: 200, height: 70 },
        attrs: { rect: { fill: 'white' }, text: { text:` ${this.question}`, fill: 'black' } },
        inPorts: ['in'],
        outPorts: [],
        ports: {
            groups: {
                'in': {
                    attrs: {
                        '.port-body': {
                            fill: 'white'
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
        this.graph.addCell(qtion)
        qtion.changeInGroup({ position: 'top' });
        qtion.changeOutGroup({ position: 'bottom' });
        this.page = {type: "pregunta",id: qtion.id};
        this.pages.push(this.page)
    }

    nuevoProyecto(){
        let start = new joint.shapes.devs.Model({
        position: { x: 10, y: 10 },
        size: { width: 200, height: 50 },
        attrs: { rect: { fill: 'green' }, text: { text:`Start`, fill: 'black' } },
        inPorts: [],
        outPorts: [],
        ports: {
            groups: {
                'in': {
                    attrs: {
                        '.port-body': {
                            fill: 'white'
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
        this.graph.addCell(start)
        start.changeInGroup({ position: 'top' });
        start.changeOutGroup({ position: 'bottom' });
        this.page = {type: "start",id: start.id};
        this.pages.push(this.page)
    }

    nuevoMensaje(){
        let mess = new joint.shapes.devs.Model({
        position: { x: 10, y: 180 },
        size: { width: 200, height: 70 },
        attrs: { rect: { fill: '#33ECFF' }, text: { text:`Mensaje`, fill: 'black' } },
        inPorts: ['in'],
        outPorts: [],
        ports: {
            groups: {
                'in': {
                    attrs: {
                        '.port-body': {
                            fill: 'white'
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
        this.graph.addCell(mess)
        mess.changeInGroup({ position: 'top' });
        mess.changeOutGroup({ position: 'bottom' });
        this.page = {type: "message",id: mess.id};
        this.pages.push(this.page)
    }

    finProyecto(){
        let end = new joint.shapes.devs.Model({
        position: { x: 10, y: 450 },
        size: { width: 200, height: 50 },
        attrs: { rect: { fill: 'black' }, text: { text:`End`, fill: 'white' } },
        inPorts: this.outPorts,
        outPorts: [],
        ports: {
            groups: {
                'in': {
                    attrs: {
                        '.port-body': {
                            fill: 'white'
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
        this.graph.addCell(end)
        end.changeInGroup({ position: 'top' });
        end.changeOutGroup({ position: 'bottom' });
        this.info.push(end.toJSON());
        this.page = {type: "end",id: end.id};
        this.pages.push(this.page)
    }

    agregarCelula(celula: any): Promise<any> {
        return this.firestore.collection('jointjs1').doc('proyecto1').set(celula);
    }

    getCelula(): Observable<any> {
        return this.firestore.collection('jointjs1').snapshotChanges();
    }

    
    guardarProyecto(){
        console.log(this.pages);
    
        let jsonObject = this.graph.toJSON(); // este objeto es el que guarda la grafica
        let temp = {};

        for ( let i = 0; i < this.pages.length; i++) {
            this.pages[i].answers = [];
            this.answers = [];
            for (let j = 0; j < jsonObject.cells.length; j++){
                if (jsonObject.cells[j]['type'] == 'link') {
                    if (jsonObject.cells[j]['source']['id'] == this.pages[i]['id']) {
                        temp = {"phrase":jsonObject.cells[j]['source']['port'],"target":jsonObject.cells[j]['target']['id']};
                        this.answers.push(temp);
                    }
                } else 
                {
                    if (jsonObject.cells[j]['id'] == this.pages[i]['id']) {
                        this.pages[i].question = {'type':'text','content':jsonObject.cells[j]['attrs']['text']['text']};
                    }
                }
            }
            this.pages[i].answers = this.answers;
        }
        console.log(this.pages);
        this.outputCx = JSON.stringify(this.pages) // esta es el json que alimenta a cx
        console.log(this.outputCx);
        }
}
