export interface CurrentSeasonStatsModel {
  outOfSeason: boolean;
  dailyOccupation: {
    totalUmbrellas: number,
    todayOccupation: number,
    yesterdayOccupation: number
  },
  currentSeasonHistorical: { date: Date, percent: number }[],
  currentSeasonProjection: { date: Date, percent: number }[],
  benchmark: { date: Date, percent: number }[],
  avgSeason: { date: Date, percent: number }[]
}

export class CurrentSeasonStats implements  CurrentSeasonStatsModel {
  currentSeasonProjection: { date: Date; percent: number }[];
  currentSeasonHistorical: { date: Date; percent: number }[];
  benchmark: { date: Date; percent: number }[];
  avgSeason: { date: Date; percent: number }[];
  dailyOccupation: { totalUmbrellas: number; todayOccupation: number; yesterdayOccupation: number };
  outOfSeason: boolean;

  constructor(model: CurrentSeasonStatsModel) {
    this.currentSeasonProjection = model.currentSeasonProjection.map(item => {
      return { date: new Date(item.date), percent: item.percent }
    });
    this.currentSeasonHistorical = model.currentSeasonHistorical.map(item => {
      return { date: new Date(item.date), percent: item.percent }
    });
    this.benchmark = model.benchmark.map(item => {
      return { date: new Date(item.date), percent: item.percent }
    });
    this.avgSeason = model.avgSeason.map(item => {
      return { date: new Date(item.date), percent: item.percent }
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

  getCurrentSeasonChartData() {
    return [
      {
        name: "Storico stagionale",
        series: this.currentSeasonHistorical.map(item => { return { name: item.date, value: item.percent }})
      },
      {
        name: "Proiezione statistica stagionale",
        series: this.currentSeasonProjection.map(item => { return { name: item.date, value: item.percent }})
      },
      {
        name: "Media globale stabilimento",
        series: this.avgSeason.map(item => { return { name: item.date, value: item.percent }})
      },
      {
        name: "Media stabilimenti della zona",
        series: this.benchmark.map(item => { return { name: item.date, value: item.percent }})
      }
    ];
  }
}

export interface OldSeasonStatsModel {
  season: { date: Date, percent: number }[],
  benchmark: { date: Date, percent: number }[],
  avgSeason: { date: Date, percent: number }[],
  availableYears: number[],
  currentYear: number
}

export class OldSeasonStats implements OldSeasonStatsModel {
  availableYears: number[];
  avgSeason: { date: Date; percent: number }[];
  benchmark: { date: Date; percent: number }[];
  season: { date: Date; percent: number }[];
  currentYear: number;

  constructor(model: OldSeasonStatsModel) {
    this.season = model.season.map(item => {
      return { date: new Date(item.date), percent: item.percent }
    });
    this.benchmark = model.benchmark.map(item => {
      return { date: new Date(item.date), percent: item.percent }
    });
    this.avgSeason = model.avgSeason.map(item => {
      return { date: new Date(item.date), percent: item.percent }
    });
    this.availableYears = model.availableYears;
    this.currentYear = model.currentYear;
  }

  getSeasonChartData() {
    return [
      {
        name: "Storico anno " + this.currentYear,
        series: this.season.map(item => { return { name: item.date, value: item.percent }})
      },
      {
        name: "Media globale stabilimento",
        series: this.avgSeason.map(item => { return { name: item.date, value: item.percent }})
      },
      {
        name: "Media stabilimenti della zona",
        series: this.benchmark.map(item => { return { name: item.date, value: item.percent }})
      }
    ];
  }
}
