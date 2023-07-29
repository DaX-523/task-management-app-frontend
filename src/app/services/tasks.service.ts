import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  model = 'task';
  renderForm = false;

  constructor(private http: HttpClient) { }

  getTasks(params: String) {
    return this.http.get(`${BASE_URL}/${this.model}s/?sortBy=${params}`)
  }

  createNewTask(body: any) {
    return this.http.post(`${BASE_URL}/${this.model}`, body)
  }

  editTask(body: any, taskId: string) {
    return this.http.put(`${BASE_URL}/${this.model}/${taskId}`, body)
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${BASE_URL}/${this.model}/${taskId}`)
  }

  downloadTasksList() {
    return this.http.get(`${BASE_URL}/download`, { responseType: 'blob' })
  }

  shownewForm(): void {
    this.renderForm = !this.renderForm;
  }
}

// http://localhost:8080/task/64c34daa1bf8500f44c82483