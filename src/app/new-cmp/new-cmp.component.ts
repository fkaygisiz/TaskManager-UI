import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import 'rxjs/add/operator/map';
import {DataService} from '../data.service';
import {DataTableDirective} from 'angular-datatables';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Task} from '../task-cmp/Task';
import {Subscription} from 'rxjs/Subscription';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-new-cmp',
  templateUrl: './new-cmp.component.html',
  styleUrls: ['./new-cmp.component.css']
})
export class NewCmpComponent implements OnInit, OnDestroy {
  private serverUrl = 'http://localhost:8080/socket';
  private stompClient;
  tasks: Task[];

  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  private tasksSubscription: Subscription;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.initializeWebSocketConnection();
  }

  // Make the HTTP request:

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/new-task', (message) => {
        console.log(message);
        if (message.body) {
          console.log(message.body);
          that.addTaskToTable(JSON.parse(message.body));
        }
      });
    });
  }


  addTaskToTasks() {
    this.stompClient.send('/app/send/message', {}, 'fffff');
  }


  ngOnInit() {
    this.dtOptions = {
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Title',
        data: 'title'
      }, {
        title: 'Description',
        data: 'description'
      }, {
        title: 'Priority',
        data: 'priority'
      }, {
        title: 'Status',
        data: 'status'
      }, {
        title: 'Creation Date',
        data: 'createdAt'
      }, {
        title: 'Update Date',
        data: 'updatedAt'
      }, {
        title: 'Due Date',
        data: 'dueDate'
      }, {
        title: 'Resolution Date',
        data: 'resolvedAt'
      }, {
        title: 'Edit',
        data: 'id',
        render: (val) => {
          return '<a href="/tasks/' + val + '">Edit</a>';
        }
      }],
      'order': [[7, 'asc'], [3, 'asc']]
    };

    // this.tasksSubscription = this.dataService.getAllTasks().subscribe(data => {
    this.http.get('http://localhost:8080/tasks?random' + Math.random()).subscribe(  data => {
    // Read the result field from the JSON response.
      console.log(data);
      const allTasks = data as Task[];
      this.tasks = allTasks.filter(t => !t.postponedDate || (this.dataService.formatDate(new Date()) > t.postponedDate));
      this.addTasksToTable(this.tasks);

    }, error2 => {}, () => {
      this.dataService.getAllTasks(Math.random()).subscribe().unsubscribe();
    });
  }

  addTasksToTable(tasks: any) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.data().rows.add(tasks);
      dtInstance.draw();
    });
  }

  addTaskToTable(task: any) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.data().row.add(task);
      dtInstance.draw();
    });
  }
 ngOnDestroy() {
   this.tasksSubscription.unsubscribe();
 }
}
