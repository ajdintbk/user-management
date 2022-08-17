import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/users.service';
import { DefaultParameters } from 'src/app/shared/models/default-params.model';
import { User } from 'src/app/shared/models/user.model';

export interface UserState {
  user: User;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  loading: false,
};

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  readonly user$ = this.select((state) => state.user);
  readonly loading$ = this.select((state) => state.loading);

  constructor(private _usersService: UserService) {
    super(initialState);
  }

  loadUser = this.effect((id$: Observable<string>) => {
    this.patchState({ loading: true });
    return id$.pipe(
      switchMap((id) =>
        this._usersService.getUser(id).pipe(
          tap({
            next: (res) => {
                this.patchState({loading: false})
                this.patchState({ user: res });
            },
            error: (err) => {
                this.patchState({loading: false})
            }
          })
        )
      )
    );
  });

  updateUser = this.effect((user$: Observable<User>) => {
    this.patchState({ loading: true });
    return user$.pipe(
      switchMap((user) =>
        this._usersService.updateUser(user, user.id).pipe(
          tap({
            next: (res: any) => {
                this.patchState({loading: false})
                this.patchState({ user: res });
            },
            error: (err) => {
                this.patchState({loading: false})
            }
          })
        )
      )
    );
  });
}
