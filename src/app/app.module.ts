import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { TaskCmpComponent } from './task-cmp/task-cmp.component';
import {FormsModule} from '@angular/forms';
import {DataService} from './data.service';
import { TasklistComponent } from './tasklist/tasklist.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskCmpComponent,
    TasklistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'tasks/:id',
        component: TaskCmpComponent
      },
      {
        path: '',
        component: TasklistComponent
      }
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
