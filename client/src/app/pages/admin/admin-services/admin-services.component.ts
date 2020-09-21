import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {Service} from "../../../shared/models/service.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss']
})
export class AdminServicesComponent implements OnInit {
  services: Service[];
  totalItems: number = 100;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateServicesPage();
  }


  changePage($event: PageEvent) {
    this.updateServicesPage($event.pageIndex - 1);
  }


  updateServicesPage(page: number = 0): void {
    this.services = undefined;
    this.api.getServices(page).subscribe(data => {
      this.services = data.map(model => new Service(model));

      if (this.services.length < 10) {
        this.totalItems = (page) * 10 + this.services.length;
      }
    });
  }
}
