export interface IAttribute {
  arrival_time: string | null;
  departure_time: string | null;
  status: string | null;
}

interface IData {
  id: string;
  type: string;
}

export interface IRelationship {
  route: { data: IData };
  stop: { data: IData };
  trip: { data: IData };
  vehicle: { data: IData };
}

/**
 * This interface contain minimal fields from data API definition
 * /predictions MTBA needed to compute the Board
 */
export interface IPrediction {
  id: string;
  attributes: IAttribute;
  relationships: IRelationship;
}
