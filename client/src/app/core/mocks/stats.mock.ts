import {CurrentSeasonStatsModel, OldSeasonStatsModel} from "../../shared/models/http-responses/stats.model";

const benchmark = [
  {
    date: new Date("2020-01-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-31T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-31T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-16T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-17T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-27T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-28T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-29T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-30T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-16T22:00:00.000Z"),
    percent: 0.1
  },
  {
    date: new Date("2020-05-17T22:00:00.000Z"),
    percent: 0.1
  },
  {
    date: new Date("2020-05-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-19T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-05-20T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-05-21T22:00:00.000Z"),
    percent: 0.05
  },
  {
    date: new Date("2020-05-22T22:00:00.000Z"),
    percent: 0.06
  },
  {
    date: new Date("2020-05-23T22:00:00.000Z"),
    percent: 0.09
  },
  {
    date: new Date("2020-05-24T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-05-25T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-05-26T22:00:00.000Z"),
    percent: 0.10
  },
  {
    date: new Date("2020-05-27T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-05-28T22:00:00.000Z"),
    percent: 0.09
  },
  {
    date: new Date("2020-05-29T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-05-30T22:00:00.000Z"),
    percent: 0.09
  },
  {
    date: new Date("2020-05-31T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-06-01T22:00:00.000Z"),
    percent: 0.09
  },
  {
    date: new Date("2020-06-02T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-06-03T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-06-04T22:00:00.000Z"),
    percent: 0.12
  },
  {
    date: new Date("2020-06-05T22:00:00.000Z"),
    percent: 0.14
  },
  {
    date: new Date("2020-06-06T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-06-07T22:00:00.000Z"),
    percent: 0.14
  },
  {
    date: new Date("2020-06-08T22:00:00.000Z"),
    percent: 0.16
  },
  {
    date: new Date("2020-06-09T22:00:00.000Z"),
    percent: 0.16
  },
  {
    date: new Date("2020-06-10T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-06-11T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-12T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-06-13T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-06-14T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-15T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-16T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-06-17T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-06-18T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-06-19T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-06-20T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-06-21T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-22T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-23T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-06-24T22:00:00.000Z"),
    percent: 0.30
  },
  {
    date: new Date("2020-06-25T22:00:00.000Z"),
    percent: 0.31
  },
  {
    date: new Date("2020-06-26T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-06-27T22:00:00.000Z"),
    percent: 0.32
  },
  {
    date: new Date("2020-06-28T22:00:00.000Z"),
    percent: 0.32
  },
  {
    date: new Date("2020-06-29T22:00:00.000Z"),
    percent: 0.30
  },
  {
    date: new Date("2020-06-30T22:00:00.000Z"),
    percent: 0.31
  },
  {
    date: new Date("2020-07-01T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-07-02T22:00:00.000Z"),
    percent: 0.32
  },
  {
    date: new Date("2020-07-03T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-07-04T22:00:00.000Z"),
    percent: 0.34
  },
  {
    date: new Date("2020-07-05T22:00:00.000Z"),
    percent: 0.36
  },
  {
    date: new Date("2020-07-06T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-07T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-08T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-09T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-10T22:00:00.000Z"),
    percent: 0.45
  },
  {
    date: new Date("2020-07-11T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-12T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-13T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-14T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-15T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-16T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-17T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-18T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-19T22:00:00.000Z"),
    percent: 0.45
  },
  {
    date: new Date("2020-07-20T22:00:00.000Z"),
    percent: 0.47
  },
  {
    date: new Date("2020-07-21T22:00:00.000Z"),
    percent: 0.51
  },
  {
    date: new Date("2020-07-22T22:00:00.000Z"),
    percent: 0.53
  },
  {
    date: new Date("2020-07-23T22:00:00.000Z"),
    percent: 0.54
  },
  {
    date: new Date("2020-07-24T22:00:00.000Z"),
    percent: 0.55
  },
  {
    date: new Date("2020-07-25T22:00:00.000Z"),
    percent: 0.55
  },
  {
    date: new Date("2020-07-26T22:00:00.000Z"),
    percent: 0.56
  },
  {
    date: new Date("2020-07-27T22:00:00.000Z"),
    percent: 0.55
  },
  {
    date: new Date("2020-07-28T22:00:00.000Z"),
    percent: 0.58
  },
  {
    date: new Date("2020-07-29T22:00:00.000Z"),
    percent: 0.60
  },
  {
    date: new Date("2020-07-30T22:00:00.000Z"),
    percent: 0.61
  },
  {
    date: new Date("2020-07-31T22:00:00.000Z"),
    percent: 0.63
  },
  {
    date: new Date("2020-08-01T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-02T22:00:00.000Z"),
    percent: 0.63
  },
  {
    date: new Date("2020-08-03T22:00:00.000Z"),
    percent: 0.64
  },
  {
    date: new Date("2020-08-04T22:00:00.000Z"),
    percent: 0.66
  },
  {
    date: new Date("2020-08-05T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-06T22:00:00.000Z"),
    percent: 0.69
  },
  {
    date: new Date("2020-08-07T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-08T22:00:00.000Z"),
    percent: 0.67
  },
  {
    date: new Date("2020-08-09T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-10T22:00:00.000Z"),
    percent: 0.69
  },
  {
    date: new Date("2020-08-11T22:00:00.000Z"),
    percent: 0.70
  },
  {
    date: new Date("2020-08-12T22:00:00.000Z"),
    percent: 0.72
  },
  {
    date: new Date("2020-08-13T22:00:00.000Z"),
    percent: 0.75
  },
  {
    date: new Date("2020-08-14T22:00:00.000Z"),
    percent: 0.78
  },
  {
    date: new Date("2020-08-15T22:00:00.000Z"),
    percent: 0.80
  },
  {
    date: new Date("2020-08-16T22:00:00.000Z"),
    percent: 0.81
  },
  {
    date: new Date("2020-08-17T22:00:00.000Z"),
    percent: 0.78
  },
  {
    date: new Date("2020-08-18T22:00:00.000Z"),
    percent: 0.76
  },
  {
    date: new Date("2020-08-19T22:00:00.000Z"),
    percent: 0.75
  },
  {
    date: new Date("2020-08-20T22:00:00.000Z"),
    percent: 0.74
  },
  {
    date: new Date("2020-08-21T22:00:00.000Z"),
    percent: 0.70
  },
  {
    date: new Date("2020-08-22T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-23T22:00:00.000Z"),
    percent: 0.64
  },
  {
    date: new Date("2020-08-24T22:00:00.000Z"),
    percent: 0.58
  },
  {
    date: new Date("2020-08-25T22:00:00.000Z"),
    percent: 0.54
  },
  {
    date: new Date("2020-08-26T22:00:00.000Z"),
    percent: 0.51
  },
  {
    date: new Date("2020-08-27T22:00:00.000Z"),
    percent: 0.49
  },
  {
    date: new Date("2020-08-28T22:00:00.000Z"),
    percent: 0.48
  },
  {
    date: new Date("2020-08-29T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-08-30T22:00:00.000Z"),
    percent: 0.38
  },
  {
    date: new Date("2020-08-31T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-09-01T22:00:00.000Z"),
    percent: 0.29
  },
  {
    date: new Date("2020-09-02T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-09-03T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-09-04T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-09-05T22:00:00.000Z"),
    percent: 0.26
  },
  {
    date: new Date("2020-09-06T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-09-07T22:00:00.000Z"),
    percent: 0.26
  },
  {
    date: new Date("2020-09-08T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-09-09T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-09-10T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-09-11T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-09-12T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-09-13T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-09-14T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-09-15T22:00:00.000Z"),
    percent: 0.17
  },
  {
    date: new Date("2020-09-16T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-09-17T22:00:00.000Z"),
    percent: 0.10
  },
  {
    date: new Date("2020-09-18T22:00:00.000Z"),
    percent: 0.06
  },
  {
    date: new Date("2020-09-19T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-09-20T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-21T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-22T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-23T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-09-24T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-09-25T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-09-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-27T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-28T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-29T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-30T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-16T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-17T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-31T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-31T23:00:00.000Z"),
    percent: 0.0
  }
];
const avgSeason = [
  {
    date: new Date("2020-01-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-31T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-31T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-16T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-17T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-27T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-28T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-29T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-30T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-16T22:00:00.000Z"),
    percent: 0.1
  },
  {
    date: new Date("2020-05-17T22:00:00.000Z"),
    percent: 0.1
  },
  {
    date: new Date("2020-05-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-19T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-05-20T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-05-21T22:00:00.000Z"),
    percent: 0.05
  },
  {
    date: new Date("2020-05-22T22:00:00.000Z"),
    percent: 0.05
  },
  {
    date: new Date("2020-05-23T22:00:00.000Z"),
    percent: 0.05
  },
  {
    date: new Date("2020-05-24T22:00:00.000Z"),
    percent: 0.05
  },
  {
    date: new Date("2020-05-25T22:00:00.000Z"),
    percent: 0.05
  },
  {
    date: new Date("2020-05-26T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-05-27T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-05-28T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-05-29T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-05-30T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-05-31T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-06-01T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-06-02T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-06-03T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-06-04T22:00:00.000Z"),
    percent: 0.08
  },
  {
    date: new Date("2020-06-05T22:00:00.000Z"),
    percent: 0.10
  },
  {
    date: new Date("2020-06-06T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-06-07T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-06-08T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-06-09T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-06-10T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-06-11T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-12T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-13T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-14T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-15T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-16T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-17T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-18T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-19T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-20T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-21T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-22T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-23T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-06-24T22:00:00.000Z"),
    percent: 0.26
  },
  {
    date: new Date("2020-06-25T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-06-26T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-06-27T22:00:00.000Z"),
    percent: 0.30
  },
  {
    date: new Date("2020-06-28T22:00:00.000Z"),
    percent: 0.32
  },
  {
    date: new Date("2020-06-29T22:00:00.000Z"),
    percent: 0.30
  },
  {
    date: new Date("2020-06-30T22:00:00.000Z"),
    percent: 0.31
  },
  {
    date: new Date("2020-07-01T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-07-02T22:00:00.000Z"),
    percent: 0.32
  },
  {
    date: new Date("2020-07-03T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-07-04T22:00:00.000Z"),
    percent: 0.34
  },
  {
    date: new Date("2020-07-05T22:00:00.000Z"),
    percent: 0.36
  },
  {
    date: new Date("2020-07-06T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-07T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-08T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-09T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-10T22:00:00.000Z"),
    percent: 0.45
  },
  {
    date: new Date("2020-07-11T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-12T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-13T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-14T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-15T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-16T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-17T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-18T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-19T22:00:00.000Z"),
    percent: 0.45
  },
  {
    date: new Date("2020-07-20T22:00:00.000Z"),
    percent: 0.47
  },
  {
    date: new Date("2020-07-21T22:00:00.000Z"),
    percent: 0.51
  },
  {
    date: new Date("2020-07-22T22:00:00.000Z"),
    percent: 0.53
  },
  {
    date: new Date("2020-07-23T22:00:00.000Z"),
    percent: 0.54
  },
  {
    date: new Date("2020-07-24T22:00:00.000Z"),
    percent: 0.55
  },
  {
    date: new Date("2020-07-25T22:00:00.000Z"),
    percent: 0.55
  },
  {
    date: new Date("2020-07-26T22:00:00.000Z"),
    percent: 0.56
  },
  {
    date: new Date("2020-07-27T22:00:00.000Z"),
    percent: 0.55
  },
  {
    date: new Date("2020-07-28T22:00:00.000Z"),
    percent: 0.58
  },
  {
    date: new Date("2020-07-29T22:00:00.000Z"),
    percent: 0.60
  },
  {
    date: new Date("2020-07-30T22:00:00.000Z"),
    percent: 0.61
  },
  {
    date: new Date("2020-07-31T22:00:00.000Z"),
    percent: 0.63
  },
  {
    date: new Date("2020-08-01T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-02T22:00:00.000Z"),
    percent: 0.63
  },
  {
    date: new Date("2020-08-03T22:00:00.000Z"),
    percent: 0.64
  },
  {
    date: new Date("2020-08-04T22:00:00.000Z"),
    percent: 0.66
  },
  {
    date: new Date("2020-08-05T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-06T22:00:00.000Z"),
    percent: 0.69
  },
  {
    date: new Date("2020-08-07T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-08T22:00:00.000Z"),
    percent: 0.67
  },
  {
    date: new Date("2020-08-09T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-10T22:00:00.000Z"),
    percent: 0.69
  },
  {
    date: new Date("2020-08-11T22:00:00.000Z"),
    percent: 0.70
  },
  {
    date: new Date("2020-08-12T22:00:00.000Z"),
    percent: 0.72
  },
  {
    date: new Date("2020-08-13T22:00:00.000Z"),
    percent: 0.75
  },
  {
    date: new Date("2020-08-14T22:00:00.000Z"),
    percent: 0.78
  },
  {
    date: new Date("2020-08-15T22:00:00.000Z"),
    percent: 0.80
  },
  {
    date: new Date("2020-08-16T22:00:00.000Z"),
    percent: 0.81
  },
  {
    date: new Date("2020-08-17T22:00:00.000Z"),
    percent: 0.78
  },
  {
    date: new Date("2020-08-18T22:00:00.000Z"),
    percent: 0.76
  },
  {
    date: new Date("2020-08-19T22:00:00.000Z"),
    percent: 0.75
  },
  {
    date: new Date("2020-08-20T22:00:00.000Z"),
    percent: 0.74
  },
  {
    date: new Date("2020-08-21T22:00:00.000Z"),
    percent: 0.70
  },
  {
    date: new Date("2020-08-22T22:00:00.000Z"),
    percent: 0.68
  },
  {
    date: new Date("2020-08-23T22:00:00.000Z"),
    percent: 0.64
  },
  {
    date: new Date("2020-08-24T22:00:00.000Z"),
    percent: 0.58
  },
  {
    date: new Date("2020-08-25T22:00:00.000Z"),
    percent: 0.54
  },
  {
    date: new Date("2020-08-26T22:00:00.000Z"),
    percent: 0.51
  },
  {
    date: new Date("2020-08-27T22:00:00.000Z"),
    percent: 0.49
  },
  {
    date: new Date("2020-08-28T22:00:00.000Z"),
    percent: 0.48
  },
  {
    date: new Date("2020-08-29T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-08-30T22:00:00.000Z"),
    percent: 0.38
  },
  {
    date: new Date("2020-08-31T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-09-01T22:00:00.000Z"),
    percent: 0.29
  },
  {
    date: new Date("2020-09-02T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-09-03T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-09-04T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-09-05T22:00:00.000Z"),
    percent: 0.26
  },
  {
    date: new Date("2020-09-06T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-09-07T22:00:00.000Z"),
    percent: 0.26
  },
  {
    date: new Date("2020-09-08T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-09-09T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-09-10T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-09-11T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-09-12T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-09-13T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-09-14T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-09-15T22:00:00.000Z"),
    percent: 0.17
  },
  {
    date: new Date("2020-09-16T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-09-17T22:00:00.000Z"),
    percent: 0.10
  },
  {
    date: new Date("2020-09-18T22:00:00.000Z"),
    percent: 0.06
  },
  {
    date: new Date("2020-09-19T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-09-20T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-21T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-22T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-23T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-09-24T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-09-25T22:00:00.000Z"),
    percent: 0.01
  },
  {
    date: new Date("2020-09-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-27T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-28T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-29T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-30T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-16T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-17T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-31T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-31T23:00:00.000Z"),
    percent: 0.0
  }
];
const seasonFirstPart =  [
  {
    date: new Date("2020-01-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-01-31T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-02-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-03-31T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-16T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-17T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-27T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-28T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-29T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-04-30T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-16T22:00:00.000Z"),
    percent: 0.1
  },
  {
    date: new Date("2020-05-17T22:00:00.000Z"),
    percent: 0.1
  },
  {
    date: new Date("2020-05-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-05-27T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-05-28T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-05-29T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-05-30T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-05-31T22:00:00.000Z"),
    percent: 0.10
  },
  {
    date: new Date("2020-06-01T22:00:00.000Z"),
    percent: 0.12
  },
  {
    date: new Date("2020-06-02T22:00:00.000Z"),
    percent: 0.16
  },
  {
    date: new Date("2020-06-03T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-04T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-05T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-06T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-07T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-08T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-09T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-06-10T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-06-11T22:00:00.000Z"),
    percent: 0.30
  },
  {
    date: new Date("2020-06-12T22:00:00.000Z"),
    percent: 0.30
  },
  {
    date: new Date("2020-06-13T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-06-14T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-06-15T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-06-16T22:00:00.000Z"),
    percent: 0.21
  },
  {
    date: new Date("2020-06-17T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-18T22:00:00.000Z"),
    percent: 0.19
  },
  {
    date: new Date("2020-06-19T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-06-20T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-06-21T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-06-22T22:00:00.000Z"),
    percent: 0.18
  },
  {
    date: new Date("2020-06-23T22:00:00.000Z"),
    percent: 0.19
  },
  {
    date: new Date("2020-06-24T22:00:00.000Z"),
    percent: 0.20
  },
  {
    date: new Date("2020-06-25T22:00:00.000Z"),
    percent: 0.21
  },
  {
    date: new Date("2020-06-26T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-06-27T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-06-28T22:00:00.000Z"),
    percent: 0.28
  },
  {
    date: new Date("2020-06-29T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-06-30T22:00:00.000Z"),
    percent: 0.36
  },
  {
    date: new Date("2020-07-01T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-02T22:00:00.000Z"),
    percent: 0.45
  },
  {
    date: new Date("2020-07-03T22:00:00.000Z"),
    percent: 0.41
  },
  {
    date: new Date("2020-07-04T22:00:00.000Z"),
    percent: 0.40
  },
  {
    date: new Date("2020-07-05T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-06T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-07T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-08T22:00:00.000Z"),
    percent: 0.40
  },
  {
    date: new Date("2020-07-09T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-10T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-11T22:00:00.000Z"),
    percent: 0.44
  },
  {
    date: new Date("2020-07-12T22:00:00.000Z"),
    percent: 0.41
  },
  {
    date: new Date("2020-07-13T22:00:00.000Z"),
    percent: 0.40
  },
  {
    date: new Date("2020-07-14T22:00:00.000Z"),
    percent: 0.39
  },
  {
    date: new Date("2020-07-15T22:00:00.000Z"),
    percent: 0.38
  },
  {
    date: new Date("2020-07-16T22:00:00.000Z"),
    percent: 0.38
  },
  {
    date: new Date("2020-07-17T22:00:00.000Z"),
    percent: 0.37
  },
  {
    date: new Date("2020-07-18T22:00:00.000Z"),
    percent: 0.38
  },
  {
    date: new Date("2020-07-19T22:00:00.000Z"),
    percent: 0.39
  },
  {
    date: new Date("2020-07-20T22:00:00.000Z"),
    percent: 0.41
  },
  {
    date: new Date("2020-07-21T22:00:00.000Z"),
    percent: 0.42
  },
  {
    date: new Date("2020-07-22T22:00:00.000Z"),
    percent: 0.43
  },
  {
    date: new Date("2020-07-23T22:00:00.000Z"),
    percent: 0.50
  },
  {
    date: new Date("2020-07-24T22:00:00.000Z"),
    percent: 0.51
  },
  {
    date: new Date("2020-07-25T22:00:00.000Z"),
    percent: 0.52
  },
  {
    date: new Date("2020-07-26T22:00:00.000Z"),
    percent: 0.58
  },
  {
    date: new Date("2020-07-27T22:00:00.000Z"),
    percent: 0.60
  },
  {
    date: new Date("2020-07-28T22:00:00.000Z"),
    percent: 0.63
  },
  {
    date: new Date("2020-07-29T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-07-30T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-07-31T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-01T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-02T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-03T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-04T22:00:00.000Z"),
    percent: 0.62
  },
  {
    date: new Date("2020-08-05T22:00:00.000Z"),
    percent: 0.63
  },
  {
    date: new Date("2020-08-06T22:00:00.000Z"),
    percent: 0.64
  },
  {
    date: new Date("2020-08-07T22:00:00.000Z"),
    percent: 0.65
  },
  {
    date: new Date("2020-08-08T22:00:00.000Z"),
    percent: 0.65
  },
  {
    date: new Date("2020-08-09T22:00:00.000Z"),
    percent: 0.65
  },
  {
    date: new Date("2020-08-10T22:00:00.000Z"),
    percent: 0.65
  },
  {
    date: new Date("2020-08-11T22:00:00.000Z"),
    percent: 0.64
  },
  {
    date: new Date("2020-08-12T22:00:00.000Z"),
    percent: 0.70
  },
  {
    date: new Date("2020-08-13T22:00:00.000Z"),
    percent: 0.71
  },
  {
    date: new Date("2020-08-14T22:00:00.000Z"),
    percent: 0.80
  },
  {
    date: new Date("2020-08-15T22:00:00.000Z"),
    percent: 0.83
  },
  {
    date: new Date("2020-08-16T22:00:00.000Z"),
    percent: 0.85
  },
  {
    date: new Date("2020-08-17T22:00:00.000Z"),
    percent: 0.90
  },
  {
    date: new Date("2020-08-18T22:00:00.000Z"),
    percent: 0.92
  },
  {
    date: new Date("2020-08-19T22:00:00.000Z"),
    percent: 0.90
  },
  {
    date: new Date("2020-08-20T22:00:00.000Z"),
    percent: 0.86
  },
  {
    date: new Date("2020-08-21T22:00:00.000Z"),
    percent: 0.84
  },
  {
    date: new Date("2020-08-22T22:00:00.000Z"),
    percent: 0.82
  },
  {
    date: new Date("2020-08-23T22:00:00.000Z"),
    percent: 0.70
  },
  {
    date: new Date("2020-08-24T22:00:00.000Z"),
    percent: 0.69
  },
  {
    date: new Date("2020-08-25T22:00:00.000Z"),
    percent: 0.66
  },
  {
    date: new Date("2020-08-26T22:00:00.000Z"),
    percent: 0.60
  },
  {
    date: new Date("2020-08-27T22:00:00.000Z"),
    percent: 0.58
  },
  {
    date: new Date("2020-08-28T22:00:00.000Z"),
    percent: 0.54
  }
];
const seasonSecondPart = [
  {
    date: new Date("2020-08-29T22:00:00.000Z"),
    percent: 0.52
  },
  {
    date: new Date("2020-08-30T22:00:00.000Z"),
    percent: 0.40
  },
  {
    date: new Date("2020-08-31T22:00:00.000Z"),
    percent: 0.39
  },
  {
    date: new Date("2020-09-01T22:00:00.000Z"),
    percent: 0.37
  },
  {
    date: new Date("2020-09-02T22:00:00.000Z"),
    percent: 0.35
  },
  {
    date: new Date("2020-09-03T22:00:00.000Z"),
    percent: 0.33
  },
  {
    date: new Date("2020-09-04T22:00:00.000Z"),
    percent: 0.29
  },
  {
    date: new Date("2020-09-05T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-09-06T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-09-07T22:00:00.000Z"),
    percent: 0.27
  },
  {
    date: new Date("2020-09-08T22:00:00.000Z"),
    percent: 0.26
  },
  {
    date: new Date("2020-09-09T22:00:00.000Z"),
    percent: 0.25
  },
  {
    date: new Date("2020-09-10T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-09-11T22:00:00.000Z"),
    percent: 0.23
  },
  {
    date: new Date("2020-09-12T22:00:00.000Z"),
    percent: 0.24
  },
  {
    date: new Date("2020-09-13T22:00:00.000Z"),
    percent: 0.19
  },
  {
    date: new Date("2020-09-14T22:00:00.000Z"),
    percent: 0.22
  },
  {
    date: new Date("2020-09-15T22:00:00.000Z"),
    percent: 0.19
  },
  {
    date: new Date("2020-09-16T22:00:00.000Z"),
    percent: 0.17
  },
  {
    date: new Date("2020-09-17T22:00:00.000Z"),
    percent: 0.15
  },
  {
    date: new Date("2020-09-18T22:00:00.000Z"),
    percent: 0.10
  },
  {
    date: new Date("2020-09-19T22:00:00.000Z"),
    percent: 0.07
  },
  {
    date: new Date("2020-09-20T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-09-21T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-09-22T22:00:00.000Z"),
    percent: 0.04
  },
  {
    date: new Date("2020-09-23T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-24T22:00:00.000Z"),
    percent: 0.02
  },
  {
    date: new Date("2020-09-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-27T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-28T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-29T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-09-30T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-01T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-02T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-03T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-04T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-05T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-06T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-07T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-08T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-09T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-10T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-11T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-12T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-13T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-14T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-15T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-16T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-17T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-18T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-19T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-20T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-21T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-22T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-23T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-24T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-25T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-26T22:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-10-31T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-11-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-01T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-02T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-03T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-04T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-05T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-06T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-07T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-08T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-09T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-10T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-11T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-12T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-13T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-14T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-15T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-16T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-17T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-18T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-19T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-20T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-21T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-22T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-23T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-24T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-25T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-26T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-27T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-28T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-29T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-30T23:00:00.000Z"),
    percent: 0.0
  },
  {
    date: new Date("2020-12-31T23:00:00.000Z"),
    percent: 0.0
  }
];

export const currentSeasonStatsMock: CurrentSeasonStatsModel = {
  outOfSeason: false,
  dailyOccupation: {
    totalUmbrellas: 50,
    todayOccupation: 20,
    yesterdayOccupation: 24
  },
  currentSeasonHistorical: seasonFirstPart,
  currentSeasonProjection: seasonSecondPart,
  benchmark: benchmark,
  avgSeason: avgSeason
};


export const oldSeasonStatsMock: OldSeasonStatsModel = {
  currentYear: 2019,
  availableYears: [2019, 2018],
  benchmark: benchmark,
  avgSeason: avgSeason,
  season: seasonFirstPart.concat(seasonSecondPart)
}
