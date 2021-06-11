import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {DragDropModule,moveItemInArray} from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { CellsService } from './services/cells.service';
import { PaperComponent } from './frontend/pages/paper/paper.component';
import { FrontendModule } from './frontend/frontend.module';
import { SidebarComponent } from './frontend/pages/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    DragDropModule,
    FrontendModule,
    ReactiveFormsModule
  ],
  providers: [CellsService, PaperComponent, SidebarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
