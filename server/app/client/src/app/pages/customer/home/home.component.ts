import { Component, OnInit } from '@angular/core';
import {HomeCard} from "../../../shared/models/home-card.model";
import {ApiService} from "../../../core/api.service";
import {Service} from "../../../shared/models/service.model";
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mainCard: HomeCard;
  homeCards: HomeCard[] = [];
  services: Service[] = [];
  rankUmbrellas: RankUmbrella[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHome().subscribe(data => {
      this.mainCard = data.mainCard;
      this.homeCards = data.homeCards;
      this.services = data.services;
      this.rankUmbrellas = data.rankUmbrellas;
    });
  }

}
