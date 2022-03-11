import { IPrediction } from '../dataSource/IPredition';

const fakePredictions: IPrediction[] = [
  {
    attributes: {
      arrival_time: null,
      departure_time: '2022-03-11T18:53:48-05:00',
      status: 'ALL ABOARD'
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
      arrival_time: null,
      departure_time: '2022-03-11T18:12:15-05:00',
      status: null
    },
    id: 'prediction-50347201-NoGLX2-70206-20',
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
          id: '50347201-NoGLX2',
          type: 'trip'
        }
      },
      vehicle: {
        data: {
          id: 'G-10005',
          type: 'vehicle'
        }
      }
    }
  },
  {
    attributes: {
      arrival_time: null,
      departure_time: '2022-03-11T18:40:32-05:00',
      status: null
    },
    id: 'prediction-50347215-NoGLX2-70206-20',
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
          id: '50347215-NoGLX2',
          type: 'trip'
        }
      },
      vehicle: {
        data: {
          id: 'G-10061',
          type: 'vehicle'
        }
      }
    }
  },
  {
    attributes: {
      arrival_time: null,
      departure_time: '2022-03-11T18:26:21-05:00',
      status: null
    },
    id: 'prediction-50347216-NoGLX2-70206-20',
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
          id: '50347216-NoGLX2',
          type: 'trip'
        }
      },
      vehicle: {
        data: {
          id: 'G-10054',
          type: 'vehicle'
        }
      }
    }
  },
  {
    attributes: {
      arrival_time: null,
      departure_time: '2022-03-11T18:50:33-05:00',
      status: null
    },
    id: 'prediction-50347219-NoGLX2-70206-20',
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
          id: '50347219-NoGLX2',
          type: 'trip'
        }
      },
      vehicle: {
        data: {
          id: 'G-10156',
          type: 'vehicle'
        }
      }
    }
  }
];

export default fakePredictions;
