import { Component, OnInit } from '@angular/core';
import {HomeCard} from "../../../shared/models/home-card.model";
import {ApiService} from "../../../core/api/api.service";
import {Service} from "../../../shared/models/service.model";
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {HomeData} from "../../../shared/models/home-data.model";

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
