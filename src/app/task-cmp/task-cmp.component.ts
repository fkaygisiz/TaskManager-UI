import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from './Task';
import {DataService} from '../data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-cmp',
  templateUrl: './task-cmp.component.html',
  styleUrls: ['./task-cmp.component.css']
})
export class TaskCmpComponent implements OnInit, OnDestroy {
  public task: Task;
  private sub: any;

  postponed: boolean;
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  errorCode: number;

  constructor(private route: ActivatedRoute, private dataService: DataService, private location: Location) {
  }

  ngOnInit() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.dataService.getTaskInfo(id).subscribe(data => {
        // Read the result field from the JSON response.
        console.log(data);
        this.task = data;
        // this.dtTrigger.next();

      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClickSubmit() {
    this.dataService.updateTask(this.task).subscribe(response => {
      if (response.status === 200) {
        this.successMessage();
      } else {
        this.errorMessage(response.status);
      }
    });
  }

  private successMessage() {
    this.showSuccessMessage = true;
    this.showErrorMessage = false;
  }

  private errorMessage(status: number) {
    this.showSuccessMessage = false;
    this.showErrorMessage = true;
    this.errorCode = status;
  }

  postponedChanged() {
    if (this.postponed) {
      const date = new Date();
      date.setTime(date.getTime() + 60 * 2 * 1000); // 2 minutes later task can be seen
      this.task.postponedDate = this.dataService.formatDate(date);
    } else {
      this.task.postponedDate = '';
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
