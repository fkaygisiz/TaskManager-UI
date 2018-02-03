import {Injectable} from '@angular/core';
import {Task} from './task-cmp/Task';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {

  private url = 'http://localhost:8080/tasks/';

  constructor(private http: HttpClient) {
  }

  public getTaskInfo(id: string) {
    return this.http.get<Task>(this.url + id);
  }

  public updateTask(task: Task): Observable<HttpResponse<Task>> {
    return this.http.put<Task>(this.url + task.id, task, {headers: {'Content-Type': 'application/json'}, observe: 'response'});
  }

  public getAllTasks(number: number) {
    return this.http.get<Task[]>(this.url + '?random' + number);
  }

  public formatDate(date: Date) {// "yyyy-MM-dd'T'HH:mm:ss"
    const d = this.convertDateToUTC(date);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
      + 'T' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
  }

  public convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(),
      date.getUTCMinutes(), date.getUTCSeconds());
  }
}
