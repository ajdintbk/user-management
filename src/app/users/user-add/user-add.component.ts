import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/services/users.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    status: new FormControl(false),
  });
  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.userForm.valid) {
      this._userService
        .addUser(this.userForm.value)
        .pipe(
          tap((_) => {
            this._snackBar.open('User added succesfully', null, {
              duration: 4000,
            });
            this.userForm.reset()
          })
        )
        .subscribe();
    }
  }
}

