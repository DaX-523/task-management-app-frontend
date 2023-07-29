import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryLogsComponent } from './history-logs/history-logs.component'
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  },
  {
    path: 'history',
    component: HistoryLogsComponent
  },

];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
