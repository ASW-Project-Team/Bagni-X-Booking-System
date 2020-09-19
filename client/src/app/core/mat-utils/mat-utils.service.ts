import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogData} from "../../shared/components/alert-dialog/alert-dialog.model";
import {AlertDialogComponent} from "../../shared/components/alert-dialog/alert-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class MatUtilsService {

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  createSnackBar(content: string) {
    this.snackBar.open(content, null, {duration: 4000});
  }

  createAlertDialog(alertData: AlertDialogData) {
    this.dialog.open(AlertDialogComponent, { data: alertData });
  }
}
