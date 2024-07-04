export interface IEvent {
  _id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  createdBy: string;
  registrations: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
