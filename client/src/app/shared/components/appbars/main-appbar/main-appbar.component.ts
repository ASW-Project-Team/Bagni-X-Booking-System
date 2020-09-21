import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../appbars.model";
import {Bathhouse} from "../../../models/bathhouse.model";
import {ApiService} from "../../../../core/api/api.service";

@Component({
  selector: 'app-main-appbar',
  templateUrl: './main-appbar.component.html',
  styleUrls: ['./main-appbar.component.scss']
})
export class MainAppbarComponent implements OnInit {
  username: string;
  isAdmin: boolean = false;
  pages: MenuItem[];
  bathhouse: Bathhouse;
  api: ApiService

  constructor(api: ApiService) {
    this.api = api;
  }

  ngOnInit() {
    this.api.getBathhouse().subscribe(data => {
      this.bathhouse = new Bathhouse(data);
    })
  }
}
