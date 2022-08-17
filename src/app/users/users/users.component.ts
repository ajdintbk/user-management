import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/users.service';
import { DefaultParameters } from 'src/app/shared/models/default-params.model';
import { UsersStore } from './users-component.store';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { User } from 'src/app/shared/models/user.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersStore],
})
export class UsersComponent implements OnInit {
  constructor(public usersStore: UsersStore, public dialog: MatDialog) {}
  users$ = this.usersStore.users$;
  totalCount$ = this.usersStore.totalCount$;
  filters = [
    {
      value: 'firstName',
      presentationName: 'First Name',
    },
    {
      value: 'lastName',
      presentationName: 'Last Name',
    },
    {
      value: 'username',
      presentationName: 'Username',
    },
    {
      value: 'password',
      presentationName: 'Password',
    },
    {
      value: 'email',
      presentationName: 'Email',
    },
    {
      value: 'status',
      presentationName: 'Status',
    },
  ];
  filterForm = new FormGroup({
    orderBy: new FormControl(),
    search: new FormControl(),
  });

  get orderBy() {
    return this.filterForm.get('orderBy');
  }

  get search() {
    return this.filterForm.get('search');
  }

  ngOnInit(): void {
    this.handleFilters();

    this.search.valueChanges
      .pipe(
        debounceTime(500),
        tap((value) => {
          if (value?.length > 2 || value.length === 0) {
            this.handleFilters();
          }
        })
      )
      .subscribe();
  }

  handleOrderChange(e: any) {
    this.handleFilters();
  }

  handleFilters(page: number = 1) {
    let params = { page: page, limit: 10 } as DefaultParameters;

    if (this.orderBy) {
      params = { ...params, orderBy: this.orderBy.value };
    }
    if (this.search) {
      params = { ...params, search: this.search.value };
    }
    this.usersStore.loadUsers(params);
  }

  handleDelete(user: User) {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: {
        name: user.firstName + " " +user.lastName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.usersStore.deleteUser(user.id)
      }
    });
  }
}
