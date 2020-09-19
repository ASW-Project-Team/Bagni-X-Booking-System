import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminAuthService} from "../../../core/auth/admin-auth.service";
import {Admin} from "../../../shared/models/admin.model";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  admin: Admin;


  constructor(private authService: AdminAuthService,
              private router: Router,
              private matUtils: MatUtilsService) { }


  ngOnInit(): void {
    this.admin = new Admin(this.authService.currentAdminValue());
  }


  logout() {
    this.matUtils.createAlertDialog({
      content: "Sei sicuro di voler effettuare il logout?",
      positiveAction: { text: "Sì, esegui il logout", execute: () => {
        this.authService.logout();
        this.router.navigate(['/admin/login']).then(() => {
            this.matUtils.createSnackBar("Logout effettuato.");
        });
      }},
      negativeAction: { text: "No", execute: () => { }}
    });
  }


  createAdmin() {
    // todo
  }


  deleteAdmin() {
    // todo
  }
}
