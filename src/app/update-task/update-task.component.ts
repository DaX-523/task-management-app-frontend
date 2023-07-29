import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../types/tasks';
import { Store } from '@ngrx/store';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { TasksService } from '../services/tasks.service';
import { RefreshList } from '../task.actions';
import { MY_FORMATS } from '../helpers/dateFormat';


@Component({
  selector: 'update-task-dialog',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class UpdateTaskComponent {
  priorities: String[] = ['Low', 'Medium', 'High'];
  statuses: String[] = ['To-Do', 'In-Progress', 'Completed'];
  myForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    private taskService: TasksService,
    private formBuilder: FormBuilder,
    private store: Store<{ reloaddState: Boolean }>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Task },
  ) { }

  _id: string = this.data.data._id;
  title: string = this.data.data.title;
  description: string = this.data.data.description;
  duedate: string = this.data.data.duedate;
  priority: string = this.data.data.priority;
  status: string = this.data.data.status;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.myForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      duedate: [this.duedate, Validators.required],
      description: [this.description, Validators.required],
      priority: [this.priority, Validators.required],
      status: [this.status, Validators.required]
    });
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.taskService.editTask(formData, this._id)
        .subscribe(data => {
          this.store.dispatch(RefreshList({ reloadState: true }))
        })
      this.dialogRef.close()
    }
  }
}