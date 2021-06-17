import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { CellsService } from '../../../services/cells.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // message:string = '';
  activeWindow = this._cell.pageActive;
  numberOutputs:number = 1;
  id = '';
  currentData = this.fb.group({
    answers: this.fb.array([]),
    message: ['']
  })
  updateData = [];
  updateAnswer = false;
  firstTry = true;



  constructor(public _cell: CellsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.activeWindow); 

  }

  get message(){
    return this.currentData.get('message')
  }

  get answers(){
    return this.currentData.get('answers') as FormArray;
  }

  actualizar(){

    this._cell.element.attr(['text'],{text:`${this.message}`})
    
    
    // this._cell.element.addOutPort(`test`)
    // this._cell.element.removeOutPort(`test`)
    // console.log(this.outputs);
    // console.log(this._cell.element.attributes.outPorts);
  }

  addAnswer(){
    this.updateAnswer = true;
    console.log('********');
      console.log(this.answers.value.length);
    if (this._cell.element.attributes.outPorts.length > 0 && this.firstTry) {
      for (let i = 0; i < this._cell.element.attributes.outPorts.length; i++) {
        this.answers.push(this.fb.control(`${this._cell.element.attributes.outPorts[i]}`));
      }
      this.firstTry = false;
    } else {
      console.log('--------');
      console.log(this.answers.value.length);
      this.id = this._cell.element.id;
    // console.log(this._cell.pageActive); 
    // console.log(this._cell.element.attributes);
    // console.log(this.id);
      if (this._cell.element){
        if (this.answers.value.length < 4) {
          this.answers.push(this.fb.control(''));
        }
      }
    }
    

    

    // this.outputs = this._cell.element.attributes.outPorts;
    
    // if (this.outputs.length < 4) {
    //   this.numberOutputs += 1;
    //   this.outputs.push(`out${this.numberOutputs}`)
    //   // this._cell.element.addOutPort(`out${this.salidas}`)
    //   // this.outputs = this._cell.element.attributes.outPorts;
    //   console.log(this.outputs);
    // }
  }
  
  // test(){
  //     console.log(this._cell.element.attributes.outPorts);
  //     if (this._cell.element.attributes.outPorts.length > 0) {
  //       for (let i = 0; i < this._cell.element.attributes.outPorts.length; i++){
  //         this.answers.push(this.fb.control(`${this._cell.element.attributes.outPorts[i]}`));
  //       }
  //     }
  // }


  removeAnswer(){
    this.answers.removeAt(this.answers.length - 1)
    // this.numberOutputs = -1;

    
    // if (this.outputs.length > 1) {
    //   this._cell.element.removeOutPort(`out${this.numberOutputs}`)
    //   this.numberOutputs -= 1;
    //   this.outputs.pop();
    //   console.log(this.outputs);
    //   console.log(this._cell.element.attributes.outPorts);
    // }
    
  }

  resetAnswers(){
    if (this.answers.value.length > 0) {
      for (let i = this.answers.value.length; i > 0  ; i--){
        this.answers.removeAt(i - 1);
      }
    }
  }

  update() {
    // console.log('___-_____');
    // console.log(this.answers.value);
    // console.log(this._cell.element.attributes.outPorts);
    if (this.answers.length < this._cell.element.attributes.outPorts.length) {
      for (let i = this._cell.element.attributes.outPorts.length;
        i >  this.answers.length; i--) {
          this._cell.element.removeOutPort(`${this._cell.element.attributes.outPorts[i-1]}`)
        }
    } else {
      for (let i = 0; i < this.answers.value.length; i++) {
        if (this.answers.value[i] != '' && this.answers.value[i] != this._cell.element.attributes.outPorts[i]){
          this._cell.element.addOutPort(`${this.answers.value[i]}`)
        }
      }
    }

    // this.numberOutputs = 1;
    this._cell.element.attr(['text'],{text:`${this.message?.value}`})
    console.log(this._cell.pages.length);
    console.log(this._cell.pages[0].id);
    
    this.message?.setValue('')
    this._cell.pageActive = false
    this.updateAnswer = false;
    this.firstTry = true;
    this.resetAnswers();
    console.log('/////////');
    console.log(this._cell.element.attributes.outPorts);
  }
}
