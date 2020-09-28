import {Component, OnInit} from '@angular/core';
import {CurrentSeasonStats, OldSeasonStats} from "../../../shared/models/http-responses/stats.model";
import {ApiService} from "../../../core/api/api.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {
  currentSeasonStats: CurrentSeasonStats;
  today = new Date();
  dailyData;
  seasonData;
  closeSeasonStatus = '';

  oldSeasonStats: OldSeasonStats;
  oldSeasonData;
  noAvailableOldSeasons = false;

  colorScheme = {
    domain: ["#faefef", "#FD7926"]
  };

  seasonColorScheme = {
    domain: ["#FD7926", "#F5BA1B", "#1461AF", "#14AF14"]
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCurrentSeasonStats().subscribe(data => {
      this.currentSeasonStats = new CurrentSeasonStats(data);
      this.dailyData = this.currentSeasonStats.getDailyChartData();
      this.seasonData = this.currentSeasonStats.getCurrentSeasonChartData();
    });

    this.api.getLastSeasonStats().subscribe(data => {
      this.oldSeasonStats = new OldSeasonStats(data);
      this.oldSeasonData = this.oldSeasonStats.getSeasonChartData();
    }, () => {
      this.noAvailableOldSeasons = true;
    });
  }

  searchYear($event: MatSelectChange) {
    this.api.getSpecificSeasonStats($event.value).subscribe(data => {
      this.oldSeasonStats = new OldSeasonStats(data);
      this.oldSeasonData = this.oldSeasonStats.getSeasonChartData();
    }, () => {
      this.noAvailableOldSeasons = true;
    });
  }

  closeSeason() {
    this.closeSeasonStatus = 'loading'
    this.api.closeSeason().subscribe(() => {
      this.closeSeasonStatus = '';
    }, (error) => {
      this.closeSeasonStatus = error;
    });
  }
}
