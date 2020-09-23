import { Component, OnInit } from '@angular/core';
import {CurrentSeasonStats} from "../../../shared/models/http-responses/stats.model";
import {ApiService} from "../../../core/api/api.service";
import {Bathhouse} from "../../../shared/models/bathhouse.model";

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {
  currentSeasonStats: CurrentSeasonStats;
  today = new Date();
  dailyData:  { name: string, value: number }[];
  seasonData;
  bathhouse: Bathhouse;

  colorScheme = {
    domain: ["#faefef","#FD7926"]
  };

  colorSchemeLinear = {
    domain: ["#FD7926","#faefef"]
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getBathhouse().subscribe(data => {
     this.bathhouse = new Bathhouse(data) ;
      this.api.getCurrentSeasonStats().subscribe(data => {
        this.currentSeasonStats = new CurrentSeasonStats(data);
        this.dailyData = this.currentSeasonStats.getDailyChartData();
        this.seasonData = this.currentSeasonStats.getSeasonChartData();
      })
    })
  }

}
