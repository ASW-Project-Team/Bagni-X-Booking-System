import { Component, OnInit } from '@angular/core';
import {Admin} from "../../../../shared/models/admin.model";
import {ApiService} from "../../../../core/api/api.service";
import {MatUtilsService} from "../../../../core/mat-utils/mat-utils.service";
import {PageEvent} from "@angular/material/paginator";
import {AdminAuthService} from "../../../../core/auth/admin-auth.service";

@Component({
  selector: 'app-admin-remove-account',
  templateUrl: './admin-remove-account.component.html',
  styleUrls: ['./admin-remove-account.component.scss']
})
export class AdminRemoveAccountComponent implements OnInit {
  admins: Admin[];
  totalItems: number = 100;
  currentPageId = 0;

  constructor(private api: ApiService,
              private matUtils: MatUtilsService,
              private authService: AdminAuthService) { }

  ngOnInit(): void {
    this.updatePage()
  }

  deleteAdmin(admin: Admin) {
    this.matUtils.createAlertDialog({
      content: "Sei sicuro di voler eliminare l'admin? L'azione è irreversibile.",
      positiveAction: { text: "Sì, elimina", execute: () => {
          this.api.deleteAdmin(admin.id).subscribe(() => {
            this.matUtils.createSnackBar('Admin eliminato.');
            this.updatePage(this.currentPageId);
          });
        }},
      negativeAction: { text: "No", execute: () => {} }
    });
  }

  isMe(admin: Admin): boolean {
    return admin.id == this.authService.currentAdminValue().id
  }

  changePage($event: PageEvent) {
    this.currentPageId = $event.pageIndex - 1;
    this.updatePage(this.currentPageId);
  }


  updatePage(page: number = 0): void {
    this.admins = undefined;
    this.api.getAdmins(page).subscribe(data => {
      this.admins = data.map(model => new Admin(model))

      if (this.admins.length < 10) {
        this.totalItems = (page) * 10 + this.admins.length;
      }
    });
  }
}
