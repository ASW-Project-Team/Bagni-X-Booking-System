import { Component, OnInit } from '@angular/core';
import {RankUmbrella} from "../../../shared/models/rank-umbrella.model";
import {ApiService} from "../../../core/api/api.service";

@Component({
  selector: 'app-admin-ranks',
  templateUrl: './admin-ranks.component.html',
  styleUrls: ['./admin-ranks.component.scss']
})
export class AdminRanksComponent implements OnInit {
  rankUmbrellas: RankUmbrella[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getRankUmbrellas().subscribe(data => {
      this.rankUmbrellas = data.map(model => new RankUmbrella(model));
    });
  }

}
