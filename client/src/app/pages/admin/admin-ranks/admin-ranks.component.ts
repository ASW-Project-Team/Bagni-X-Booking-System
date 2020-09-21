import { Component, OnInit } from '@angular/core';
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {ApiService} from "../../../core/api/api.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-ranks',
  templateUrl: './admin-ranks.component.html',
  styleUrls: ['./admin-ranks.component.scss']
})
export class AdminRanksComponent implements OnInit {
  rankUmbrellas: RankUmbrella[];
  totalItems: number = 100;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getRankUmbrellas().subscribe(data => {
      this.rankUmbrellas = data.map(model => new RankUmbrella(model));
    });
  }


  changePage($event: PageEvent) {
    this.updateRanksPage($event.pageIndex - 1);
  }


  updateRanksPage(page: number = 0): void {
    this.rankUmbrellas = undefined;
    this.api.getRankUmbrellas(page).subscribe(data => {
      this.rankUmbrellas = data.map(model => new RankUmbrella(model));

      if (this.rankUmbrellas.length < 10) {
        this.totalItems = (page) * 10 + this.rankUmbrellas.length;
      }
    });
  }
}
