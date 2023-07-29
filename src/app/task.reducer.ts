import { createReducer, on } from '@ngrx/store';
import { RefreshList } from './task.actions'
import { state } from '@angular/animations';
import { Task } from './types/tasks';

const initialValue = {
  reloadState: false
}

export const reloadReducer = createReducer(
  initialValue,
  on(RefreshList, (state, { reloadState }) => {
    return {
      ...state,
      reloadState
    }
  })
)