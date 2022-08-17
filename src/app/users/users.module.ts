import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingMogule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserAddComponent } from './user-add/user-add.component';
import { PaginationModule } from '../shared/components/pagination/pagination.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserPermissionsComponent,
    UserAddComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingMogule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    PaginationModule,
    MatDialogModule,
  ],
  providers: [],
})
export class UsersModule {}
