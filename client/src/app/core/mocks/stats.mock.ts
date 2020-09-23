import {CurrentSeasonStatsModel} from "../../shared/models/http-responses/stats.model";

export const currentSeasonStatsMock: CurrentSeasonStatsModel = {
  outOfSeason: false,
  dailyOccupation: {
    totalUmbrellas: 50,
    todayOccupation: 20,
    yesterdayOccupation: 24
  },
  currentSeasonProjection: [
    {
      date: new Date('2020-05-15'),
      percent: 0.40
    },
    {
      date: new Date('2020-05-18'),
      percent: 0.45
    },
    {
      date: new Date('2020-05-21'),
      percent: 0.23
    },
    {
      date: new Date('2020-05-23'),
      percent: 0.59
    },
    {
      date: new Date('2020-05-25'),
      percent: 0.67
    },
  ],
};
