export interface Event {
      eventName: string,
      eventDescription: string,
      maxGroupSize: number,
      maxPlayerSize: number,
      sDate: Date,
      eDate: Date,
      photos: File[],
      locations: string[]
}
export class EventShort {
    eventName!: string;
    maxGroupSize!: string;
    maxPlayerSize!: string;
    startDate!: string;
    dueDate!: string;
}