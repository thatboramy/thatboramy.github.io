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
  @Input() showTimeBlock = true;

  public venueLocationsDisplay: string[] = [];
  public timeValuesDisplay: string[] = [];
  public timeStartValues: string[] = [];
  public eventHashMap: any = {};

  constructor() {}

  ngOnInit(): void {
    this.eventHashMap = this.eventMap;
    const availableVenueLocations = this.venues.filter((room) => {
      return this.hasEventAtLocation(room);
    });
    this.venueLocationsDisplay = ['time', ...availableVenueLocations];

    this.timeStartValues = this.timeValues.filter((time) => {
      return this.hasEventAtStartTime(time);
    });

    if (this.showTimeBlock) {
      this.timeValuesDisplay = this.timeValues.filter((time) => {
        return this.hasEventAtEndTime(time) || this.hasEventAtStartTime(time);
      });
      console.log(this.eventHashMap);
      this.hasEventAtEndTime('5:30 pm');
      console.log(this.timeValues);
      console.log(this.timeValuesDisplay);
    } else {
      this.timeValuesDisplay = this.timeValues.filter((time) => {
        return this.hasEventAtStartTime(time);
      });
    }
  }

  hasEventAtLocation(roomQuery: string) {
    if (this.eventHashMap[roomQuery]) {
      return true;
    } else {
      return false;
    }
  }

  hasEventAtStartTime(timeQuery: string) {
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
  //5:30pm
  hasEventAtEndTime(timeQuery: string) {
    let hasEvent = false;
    this.venues.forEach((room) => {
      if (this.eventHashMap[room]) {
        this.timeValues.forEach((possibleStartTime) => {
          if (this.eventHashMap[room][possibleStartTime]) {
            const endTime = this.eventHashMap[room][possibleStartTime].endTime;
            if (timeQuery === endTime) {
              hasEvent = true;
              return;
            }
          }
        });
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

  isStartTime(timeQuery: string) {
    return this.timeStartValues.includes(timeQuery);
  }

  somethingHappening(room: any, time: any) {
    let somethingHappens = false;
    if (this.showTimeBlock) {
      // if it's a start time
      // if (this.timeStartValues.includes(time)) {
      //   if (this.eventHashMap[room][time]) {
      //     somethingHappens = true;
      //   }
      // } else {
      //   // if it's end time
      //   if (this.eventHashMap[room]) {
      //     this.timeValues.forEach((possibleStartTime) => {
      //       if (this.eventHashMap[room][possibleStartTime]) {
      //         const endTime =
      //           this.eventHashMap[room][possibleStartTime].endTime;
      //         if (time === endTime) {
      //           somethingHappens = true;
      //           return;
      //         }
      //       }
      //     });
      //   }
      // }
      // is it  middle child
      if (somethingHappens === false) {
        if (this.eventHashMap[room]) {
          this.timeValues.forEach((possibleStartTime) => {
            if (this.eventHashMap[room][possibleStartTime]) {
              const endTime =
                this.eventHashMap[room][possibleStartTime].endTime;
              const startTime = possibleStartTime;

              const startTimeIndex = this.timeValues.indexOf(startTime);
              const endTimeIndex = this.timeValues.indexOf(endTime);
              const timeQueryIndex = this.timeValues.indexOf(time);

              if (startTimeIndex <= timeQueryIndex) {
                if (timeQueryIndex < endTimeIndex) {
                  somethingHappens = true;
                }
              }
            }
          });
        }
      }
    }
    return somethingHappens;
  }
}
