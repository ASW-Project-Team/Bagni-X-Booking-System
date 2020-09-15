import { Component, OnInit } from '@angular/core';
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AdminAuthService} from "../../../core/auth/admin-auth.service";
import {Admin} from "../../../shared/models/admin.model";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  admin: Admin;


  constructor(private authService: AdminAuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin = new Admin(this.authService.currentAdminValue());
  }

  logout() {
    let context = this;
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: "Sei sicuro di voler effettuare il logout?",
        positiveAction: {
          text: "Sì, esegui il logout",
          execute: function () {
            context.authService.logout();
            context.router.navigate(['/admin/login']).then(() => {
              context.snackBar.open("Logout effettuato.", null, {duration: 4000});
            });
          }
        },
        negativeAction: {
          text: "No",
          execute: function () { }
        }
      }
    });
  }

  createAdmin() {

  }

  deleteAdmin() {

  }
}
