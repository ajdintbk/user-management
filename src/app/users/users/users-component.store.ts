import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/users.service';
import { DefaultParameters } from 'src/app/shared/models/default-params.model';
import { User } from 'src/app/shared/models/user.model';

export interface UsersState {
  users: User[];
  editMode: boolean;
  totalCount: number;
}

export const initialState: UsersState = {
  users: [],
  editMode: false,
  totalCount: 0,
};

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  readonly users$ = this.select((state) => state.users);
  readonly totalCount$ = this.select((state) => state.totalCount);

  constructor(private _usersService: UserService) {
    super(initialState);
  }

  loadUsers = this.effect((params$: Observable<DefaultParameters>) =>
   params$.pipe(
      switchMap((params) =>
        this._usersService.getUsers(params).pipe(
          tap({
            next: (res) => {
              this.patchState({ users: res.users, totalCount: res.count });
            },
          })
        )
      )
    )
  );

  deleteUser = this.effect((id$: Observable<string>) =>
  id$.pipe(
     switchMap((id) =>
       this._usersService.deleteUser(id).pipe(
         tap({
           next: (res) => {
             this.loadUsers(null)
           },
         })
       )
     )
   )
 );
}
