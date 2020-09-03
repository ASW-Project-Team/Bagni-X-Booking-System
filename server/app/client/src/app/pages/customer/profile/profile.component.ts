import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {Customer} from "../../../shared/models/customer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  customer: Customer;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.customer = this.authService.currentCustomerValue();
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
            context.router.navigate(['/login']).then(() => {
              context.snackBar.open("Logout effettuato.", null, {duration: 4000});
            });
          }
        },
        negativeAction: {
          text: "No",
          execute: function () {
          }
        }
      }
    });
  }

  deleteCustomer() {
    let context = this;
    this.dialog.open(AlertDialogComponent, {
      data: {
        content: "Sei sicuro di voler eliminare il tuo account? L'azione è irreversibile, e perderai i tuoi dati.",
        positiveAction: {
          text: "Sì, elimina l'account",
          execute: function () {
            context.authService.logout();
            context.router.navigate(['/login']).then(() => {
              context.snackBar.open("Account eliminato.", null, {duration: 4000});
            });
          }
        },
        negativeAction: {
          text: "No",
          execute: function () {
          }
        }
      }
    });
  }
}
