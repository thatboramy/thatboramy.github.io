import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-event-schedule',
  templateUrl: './table-event-schedule.component.html',
  styleUrls: ['./table-event-schedule.component.scss'],
})
export class TableEventScheduleComponent implements OnInit {
  @Input() timeValues: string[] = [];
  @Input() venues: string[] = [];
  @Input() eventMap = {};
  @Input() isMobile = false;

  public venueLocationsDisplay: string[] = [];
  public timeValuesDisplay: string[] = [];
  public eventHashMap: any = {};

  constructor() {}

  ngOnInit(): void {
    this.eventHashMap = this.eventMap;
    const availableVenueLocations = this.venues.filter((room) => {
      return this.hasEventAtLocation(room);
    });
    this.venueLocationsDisplay = ['time', ...availableVenueLocations];
    this.timeValuesDisplay = this.timeValues.filter((time) => {
      return this.hasEventAtTime(time);
    });
  }

  hasEventAtLocation(roomQuery: string) {
    if (this.eventHashMap[roomQuery]) {
      return true;
    } else {
      return false;
    }
  }

  hasEventAtTime(timeQuery: string) {
    let hasEvent = false;
    this.venues.forEach((room) => {
      if (this.eventHashMap[room]) {
        if (this.eventHashMap[room][timeQuery]) {
          hasEvent = true;
        }
      }
    });
    return hasEvent;
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
