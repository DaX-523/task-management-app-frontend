import { createAction, props } from '@ngrx/store';

export const RefreshList = createAction('[Task] Refresh', props<{ reloadState: boolean }>());
// export const updateTask = createAction('[Task] Update', props);
// export const deleteTask = createAction('[Task] Delete', props);