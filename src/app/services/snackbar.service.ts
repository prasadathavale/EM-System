import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar:MatSnackBar) { }

  open(message:string):void {
    this._snackbar.open(message,'',{
      verticalPosition:'bottom',
      horizontalPosition:'center',
      duration: 2000
    });
  }
}
