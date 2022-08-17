import { Injectable } from '@angular/core'
import { throwError } from 'rxjs'
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    constructor(private _snackbar: MatSnackBar) {}

    handleError(
        error,
    ) {
        this.showMessage(error)
        return throwError(() => error)
    }

    showMessage(error) {
        if (error.message) {
            this._snackbar.open(error.message, null, { duration: 5000})
        }
    }
}
