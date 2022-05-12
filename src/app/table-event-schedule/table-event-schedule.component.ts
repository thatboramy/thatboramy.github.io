import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-event-schedule',
  templateUrl: './table-event-schedule.component.html',
  styleUrls: ['./table-event-schedule.component.scss']
})
export class TableEventScheduleComponent implements OnInit {
  @Input() timeValues: string[] = [];
  @Input() venues: string[] = [];
  @Input() eventMap: string[] = [];

  public venueLocationsDisplay: string[] = [];
  public timeValuesDisplay: string[] = [];
  public eventHashMap: any = {};

  constructor() { }

  ngOnInit(): void {
    this.venueLocationsDisplay = ['time', ...this.venues];
    this.timeValuesDisplay = this.timeValues;
    this.eventHashMap = this.eventMap;
  }

  formatEventText(event: any) {
    if (event === undefined) {
      return '';
    } else {
      return `${event.name}`;
    }
  }
  formatTimeText(event: any) {
    if (event === undefined) {
      return '';
    } else {
      return `${event.startTime}-${event.endTime}`;
    }
  }
}
