import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AlertDialogData} from "./alert-dialog.model";


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}

  ngOnInit(): void {
  }

}
