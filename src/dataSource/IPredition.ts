export interface IAttribute {
  arrival_time: string | null;
  departure_time: string | null;
  status: string | null;
  stop_sequence: number;
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

export interface IPrediction {
  id: string;
  attributes: IAttribute;
  relationships: IRelationship;
  destination?: string;
}
