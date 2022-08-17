import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { EndpointURIs } from './service.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DefaultParameters } from 'src/app/shared/models/default-params.model';
import { ErrorService } from './error.service';

const routes = {
  getUsers: () => `${environment.apiBase}/${EndpointURIs.USER}`,
  getPermissions: () => `${environment.apiBase}/${EndpointURIs.PERMISSIONS}`,
  getUser: (id: string) => `${environment.apiBase}/${EndpointURIs.USER}/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private _errorService: ErrorService) {}

  getUsers(params?: DefaultParameters): Observable<any> {
    let queryParams = new HttpParams();
    if (params) {
      if (params.search) {
        queryParams = queryParams.set('search', params.search);
      }
      if (params.orderBy) {
        queryParams = queryParams.set('orderBy', params.orderBy);
      }
      if (params.limit > 0) {
        queryParams = queryParams.set(
          'limit',
          params?.limit > 0 ? params.limit : 10
        );
      }
      queryParams = queryParams.set('page', params?.page > 0 ? params.page : 1);
      if (params.sortBy) {
        queryParams = queryParams.set('sortBy', params.sortBy);
      }
    }

    return this.http.get<any>(routes.getUsers(), { params: queryParams }).pipe(
      map((res: any) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(routes.getUser(id)).pipe(
      map((res: any) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }

  updateUser(user: User, id: string) {
    return this.http.put(routes.getUser(id), user).pipe(
      map((res) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }

  addUser(user: User) {
    return this.http.post(routes.getUsers(), user).pipe(
      map((res) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete(routes.getUser(id)).pipe(
      map((res) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }

  getPermissions() {
    return this.http.get<any>(routes.getPermissions()).pipe(
      map((res) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }

  updatePermissions(id: string, user: User) {
    return this.http.patch<any>(routes.getUser(id), user).pipe(
      map((res) => res),
      catchError((err) => {
        return this._errorService.handleError(err);
      })
    );
  }
}
