import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserStore } from './user-component.store';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserStore],
})
export class UserComponent implements OnInit {
  constructor(private _route: ActivatedRoute, public userStore: UserStore) {}
  userId: string
  user$ = this.userStore.user$;
  loading$ = this.userStore.loading$;
  userForm = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null),
    status: new FormControl(false),
  });
  ngOnInit(): void {
    this.userId = this._route.snapshot.paramMap.get('id');
    this.userStore.loadUser(this.userId);
    this.user$
      .pipe(
        filter((s) => !!s),
        tap((user) => {
          this.fillUserForm(user);
        })
      )
      .subscribe();
  }
  fillUserForm(user: User) {
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      status: user.status,
    });
  }

  discard(){
    this.userStore.loadUser(this.userId)
  }

  onSubmit(){
    if(this.userForm.valid){
      this.userStore.updateUser(this.userForm.value)
    }
  }
}
