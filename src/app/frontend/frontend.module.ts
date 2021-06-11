import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { Routes } from '@angular/router';


import { FormComponent } from './pages/form/form.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { PaperComponent } from './pages/paper/paper.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = []; 

@NgModule({
  declarations: [
    FormComponent,
    NavbarComponent,
    PaperComponent,
    SidebarComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    FormsModule
  ]
})
export class FrontendModule { }
