import { Component, OnInit } from '@angular/core';
import { Task } from '../types/tasks';
import { TasksService } from '../services/tasks.service';
import { Store } from '@ngrx/store';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { RefreshList } from '../task.actions';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],

})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  sortTypes: String[] = ['DueDate', 'Priority', 'Status'];
  renderForm = false;
  sortBy: String = "";

  constructor(
    private tasksService: TasksService,
    private store: Store<{ reloadState: boolean }>,
    private dialog: MatDialog
  ) {
    store.select('reloadState')
      .subscribe((data: any) => {
        if (data.reloadState) {
          this.fetchTasks()
        }
      })
  }


  ngOnInit(): void {
    this.fetchTasks()
  }


  fetchTasks(): void {
    this.tasksService.getTasks(this.sortBy)
      .subscribe((task: any) => {
        this.tasks = task.tasks
        this.tasks.map(task => task.duedate = task.duedate.slice(0, 10))
        this.store.dispatch(RefreshList({ reloadState: false }))
      })

  }

  openDialog(task: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px'
    dialogConfig.data = {
      data: task,
    }
    const dialogRef = this.dialog.open(UpdateTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId)
      .subscribe(data => {
        this.store.dispatch(RefreshList({ reloadState: true }))
      })
  }

  download() {
    this.tasksService.downloadTasksList().
      subscribe(data => {
        this.downLoadFile(data, 'text/csv')
      })
  }

  shownewForm(): void {
    this.renderForm = !this.renderForm;
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }




}

