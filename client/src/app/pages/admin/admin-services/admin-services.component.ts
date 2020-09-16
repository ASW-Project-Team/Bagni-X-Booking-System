import { Component, OnInit } from '@angular/core';
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {ApiService} from "../../../core/api/api.service";
import {Service} from "../../../shared/models/service.model";

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss']
})
export class AdminServicesComponent implements OnInit {
  services: Service[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getServices().subscribe(data => {
      this.services = data.map(model => new Service(model));
    });
  }
}
