import {Component} from '@angular/core';
import {MenuItem} from "../appbars.model";
import {MainAppbarComponent} from "../main-appbar/main-appbar.component";
import {AdminAuthService} from "../../../../core/auth/admin-auth.service";
import {CustomerAuthService} from "../../../../core/auth/customer-auth.service";
import {ApiService} from "../../../../core/api/api.service";

/**
 * @file This is the main appbar with menu, used from the admin.
 */
@Component({
  selector: 'app-admin-main-appbar',
  templateUrl: '../main-appbar/main-appbar.component.html',
  styleUrls: ['../main-appbar/main-appbar.component.scss']
})
export class AdminMainAppbarComponent extends MainAppbarComponent {
  pages: MenuItem[] = [
    {
      id: "bookings",
      name: "Prenotazioni",
      route: "/admin/bookings",
      isMdi: true,
      icon: "calendar-check-outline"
    },
    {
      id: "stats",
      name: "Statistiche",
      route: "/admin/stats",
      isMdi: true,
      icon: "chart-box-outline"
    },
    {
      id: "news",
      name: "News",
      route: "/admin/news",
      isMdi: true,
      icon: "newspaper-variant-outline"
    },
    {
      id: "home-customize",
      name: "Personalizza Home",
      route: "/admin/home-customize",
      isMdi: true,
      icon: "home-edit-outline"
    },
    {
      id: "rank-umbrellas",
      name: "Ombrelloni",
      route: "/admin/rank-umbrellas",
      isMdi: true,
      icon: "rank"
    },
    {
      id: "services",
      name: "Servizi",
      route: "/admin/services",
      isMdi: true,
      icon: "puzzle-outline"
    },
    {
      id: "contacts",
      name: "Rubrica",
      route: "/admin/contacts",
      isMdi: true,
      icon: "contacts-outline"
    }
  ];
  isAdmin = true;

  constructor(private adminAuth: AdminAuthService,
              api: ApiService) {
    super(api);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.adminAuth.isLoggedIn()) {
      this.username = this.adminAuth.currentAdminValue().username;

    } else {
      this.username = undefined;
    }
  }
}
