import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/api/api.service";
import {HomeData} from "../../../shared/models/http-responses/home-data.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeData: HomeData;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHome().subscribe(data => {
      this.homeData = data;
    });
  }
}
