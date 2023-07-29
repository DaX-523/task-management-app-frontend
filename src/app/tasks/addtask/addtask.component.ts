import { Component, OnInit, Output } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { RefreshList } from '../../task.actions';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Inject } from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { EventEmitter } from '@angular/core';
import { MY_FORMATS } from '../../helpers/dateFormat';



@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AddtaskComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<boolean>();
  myForm!: FormGroup;
  constructor(private tasksService: TasksService,
    private formBuilder: FormBuilder,
    private store: Store<{ reloadState: Boolean }>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) { }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      duedate: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required]

    });

  }
  onFormSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      formData.duedate = formData.duedate.toISOString()
      this.tasksService.createNewTask(formData).subscribe(data => {
        this.store.dispatch(RefreshList({ reloadState: true }))
      })
      this.closeDialog.emit(true)
    }
  }
}
