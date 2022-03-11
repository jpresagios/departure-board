export interface IAttribute {
  arrivalTime: string;
  departureTime: string;
  status: string;
}

interface IData {
  id: string;
  type: string;
}

export interface IRelationship {
  route: { data: IData };
  stop: { data: IData };
  trip: { data: IData };
}

export interface IPrediction {
  id: string;
  attributes: IAttribute;
  relationships: IRelationship;
}
