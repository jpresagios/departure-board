import { IPrediction } from '../dataSource/IPredition';

export const trips = {
  data: [
    {
      attributes: {
        bikes_allowed: 2,
        block_id: 'S741-62',
        direction_id: 1,
        headsign: 'South Station',
        name: '',
        wheelchair_accessible: 1
      },
      id: '50347197-NoGLX2',
      links: {
        self: '/trips/51184791'
      },
      relationships: {
        route: {
          data: {
            id: '741',
            type: 'route'
          }
        },
        route_pattern: {
          data: {
            id: '741-_-1',
            type: 'route_pattern'
          }
        },
        service: {
          data: {
            id: 'SpringSunday',
            type: 'service'
          }
        },
        shape: {
          data: {
            id: '7410022',
            type: 'shape'
          }
        }
      },
      type: 'trip'
    },
    {
      attributes: {
        bikes_allowed: 2,
        block_id: 'S741-62',
        direction_id: 1,
        headsign: 'South Station',
        name: '',
        wheelchair_accessible: 1
      },
      id: '566647197-NG2',
      links: {
        self: '/trips/51184791'
      },
      relationships: {
        route: {
          data: {
            id: '741',
            type: 'route'
          }
        },
        route_pattern: {
          data: {
            id: '741-_-1',
            type: 'route_pattern'
          }
        },
        service: {
          data: {
            id: 'SpringSunday',
            type: 'service'
          }
        },
        shape: {
          data: {
            id: '7410022',
            type: 'shape'
          }
        }
      },
      type: 'trip'
    }
  ]
};

const fakePredictions: IPrediction[] = [
  {
    attributes: {
      arrival_time: null,
      departure_time: '2023-03-11T18:53:48-05:00',
      status: 'DEPARTURED',
      stop_sequence: 1
    },
    id: 'prediction-50347197-NoGLX2-70206-20',
    relationships: {
      route: {
        data: {
          id: 'Green-E',
          type: 'route'
        }
      },
      stop: {
        data: {
          id: '70206',
          type: 'stop'
        }
      },
      trip: {
        data: {
          id: '50347197-NoGLX2',
          type: 'trip'
        }
      },
      vehicle: {
        data: {
          id: 'G-10042',
          type: 'vehicle'
        }
      }
    }
  },
  {
    attributes: {
      arrival_time: '2023-03-11T18:53:48-05:00',
      departure_time: '2023-03-11T18:53:48-05:00',
      status: 'ALL ABOARD',
      stop_sequence: 13
    },
    id: 'prediction-50347197-NoGLX2-70206-20',
    relationships: {
      route: {
        data: {
          id: 'Green-E',
          type: 'route'
        }
      },
      stop: {
        data: {
          id: '70206',
          type: 'stop'
        }
      },
      trip: {
        data: {
          id: '566647197-NG2',
          type: 'trip'
        }
      },
      vehicle: {
        data: {
          id: 'G-10042',
          type: 'vehicle'
        }
      }
    }
  },
];

export default fakePredictions;
