import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'add',
    component: UserAddComponent
  },
  {
    path: 'permissions/:id',
    component: UserPermissionsComponent
  },
  {
    path: ':id',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingMogule { }