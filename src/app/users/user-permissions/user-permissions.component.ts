import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/users.service';
import { Permission, User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss'],
})
export class UserPermissionsComponent implements OnInit {
  user: User;
  permissions = [];
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this._route.snapshot.paramMap.get('id');
    combineLatest([
      this._userService.getUser(userId),
      this._userService.getPermissions(),
    ])
      .pipe(
        map(([user, permissions]: [User, Permission[]]) => {
          permissions.map((p) =>
            user.permissions.some((up) => up == p.id)
              ? (p.checked = true)
              : (p.checked = false)
          );
          this.permissions = permissions;
          this.user = user
        })
      )
      .subscribe();
  }

  togglePermission(e, permission) {
    this.permissions.find(p=> p.id == permission.id).checked = e.srcElement.checked
  }

  submit() {
    this.user.permissions = this.permissions.filter(p=> p.checked).map(p=> p.id)
    this._userService.updatePermissions(this.user?.id, this.user).subscribe()
  }
}
