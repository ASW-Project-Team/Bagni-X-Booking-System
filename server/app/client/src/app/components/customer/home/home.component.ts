import { Component, OnInit } from '@angular/core';
import {HomeCard} from "../../../model/homeCard";
import {ApiService} from "../../../services/api/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // main card mock
  mainCard: HomeCard;

  // other cards mock
  homeCards: HomeCard[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHomeCards().subscribe(data => {
      this.mainCard = data.mainCard;
      this.homeCards = data.homeCards;
    });
  }

}
