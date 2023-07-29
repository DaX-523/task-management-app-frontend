import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-history-logs',
  templateUrl: './history-logs.component.html',
  styleUrls: ['./history-logs.component.scss']
})
export class HistoryLogsComponent implements OnInit {
  history: any = [];
  constructor(
    private tasksService: TasksService
  ) { }
  ngOnInit(): void {
    this.tasksService.getHistoryLogs()
      .subscribe((data: any) => {
        this.history = data.history;
        console.log(this.history)
      })
  }
}
