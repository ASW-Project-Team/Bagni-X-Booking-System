export interface CurrentSeasonStatsModel {
  outOfSeason: boolean;
  dailyOccupation: {
    totalUmbrellas: number,
    todayOccupation: number,
    yesterdayOccupation: number
  },
  currentSeasonProjection: { date: Date, percent: number }[]
}

export class CurrentSeasonStats implements  CurrentSeasonStatsModel {
  currentSeasonProjection: { date: Date; percent: number }[];
  dailyOccupation: { totalUmbrellas: number; todayOccupation: number; yesterdayOccupation: number };
  outOfSeason: boolean;

  constructor(model: CurrentSeasonStatsModel) {
    this.currentSeasonProjection = model.currentSeasonProjection.map(data => {
      return { date: new Date(data.date), percent: data.percent}
    });
    this.dailyOccupation = model.dailyOccupation;
    this.outOfSeason = model.outOfSeason;
  }

  getDailyChartData(): { name: string, value: number}[] {
    return [
      { name: 'Ieri', value: this.dailyOccupation.yesterdayOccupation},
      { name: 'Oggi', value: this.dailyOccupation.todayOccupation}
    ];
  }

  getIncrement(): number {
    if (this.dailyOccupation.todayOccupation > this.dailyOccupation.yesterdayOccupation) {
      return 1 - this.dailyOccupation.yesterdayOccupation / this.dailyOccupation.todayOccupation
    } else if (this.dailyOccupation.todayOccupation < this.dailyOccupation.yesterdayOccupation) {
      return 1 - this.dailyOccupation.todayOccupation / this.dailyOccupation.yesterdayOccupation
    } else {
      return 0;
    }
  }

  isPositiveIncrement(): boolean {
    return this.dailyOccupation.todayOccupation > this.dailyOccupation.yesterdayOccupation;
  }

  getSeasonChartData() {
    return [{
      name: "Storico stagionale",
      series: this.currentSeasonProjection.map(item => { return { name: item.date, value: item.percent }})
    }];
  }
}
