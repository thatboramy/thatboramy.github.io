import { Component } from '@angular/core';
import { fridayData, fridayData2, saturdayData, sundayData } from './data';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


export class Event {
  name: string = '';
  startTime = '';
  endTime = '';
  venueLocation: string = '';
}


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumnsVenue: string[] = ['location'];
  eventData: any[] = [];
  venueLocation: string[] = [];

  northVenueLocation: string[] = [];
  northFirstFloorLocation: string[] = [];
  northFirstFloorLocationNoTime: string[] = [];
  northSecondFloorLocation: string[] = [];
  westVenueLocation: string[] = [];
  specialVenueLocation: string[] = [];

  headerDisplayCoumn: string[] = [];
  timeValues: string[] = [];

  eventHashMap: any = {};
  fridayHashMap = new Map();
  saturdayHashMap: any = {};
  sundayHashMap: any = {};

  venueLocationGroup: any[] = [];
  venueLocationGroupNames: string[] = [];
  constructor() {
    this.serializeData(fridayData2, this.fridayHashMap)
    this.serializeData(saturdayData, this.saturdayHashMap);
    this.serializeData(sundayData, this.sundayHashMap);
    this.sanitizeData();


    this.groupVenues();
    // sort the time
    this.sanitizeTime();

  }

  sanitizeTime() {


    this.timeValues.sort((a, b) => {
      a = this.convertTime12to24(a);
      b = this.convertTime12to24(b);
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }
  groupVenues() {
    // final specialization
    this.northFirstFloorLocation = this.arrayRemove(this.northFirstFloorLocation, 'North 120CD');
    this.northFirstFloorLocation = this.arrayRemove(this.northFirstFloorLocation, 'North 127A');

    this.northSecondFloorLocation = this.arrayRemove(this.northSecondFloorLocation, 'North 229AB');

    this.westVenueLocation = this.arrayRemove(this.westVenueLocation, 'West 213B');

    this.venueLocationGroupNames = ['North Building', 'West Building', 'Special'];
    this.venueLocationGroup = [[this.northFirstFloorLocation, this.northSecondFloorLocation], [this.westVenueLocation], [this.specialVenueLocation]];
  }

  convertTime12to24(b: any): any {
    let currMin = 0;
    if (b !== '') {

      const [time, ltr] = b.split(' ');
      const [hour, min] = time.split(':');
      if (ltr.trim() === 'pm') {
        currMin = parseInt(hour.trim(), 10) * 60 + 720;

        currMin = parseInt(min.trim(), 10) + currMin;
      } else {
        currMin = parseInt(hour.trim(), 10) * 60;
        currMin = currMin + parseInt(min.trim());
      }
      return currMin;
    } else {
      return -1
    }
  }

  serializeData(data: any, hashMap: any) {
    const tempEventList = data.events;
    const tempTimeList = data.times;
    tempEventList.forEach((event: any, i: number) => {
      const eventText = event.event.split('::');
      const tempEventName = eventText[0].trim();

      if (!tempEventName.includes('Signing ')) {


        const tempEventVenue = eventText[1].trim() ?? '';

        if (!this.venueLocation.some((loc) => loc === tempEventVenue)) {
          this.venueLocation.push(tempEventVenue);
        }

        const tempEventTime = tempTimeList[i].date.split('::')[1].split('to');
        const tempEventStartTime = tempEventTime[0].trim();
        const tempEventEndTime = tempEventTime[1]?.trim() ?? '';

        if (tempEventEndTime !== '' && !this.timeValues.some((loc) => loc === tempEventStartTime)) {
          this.timeValues.push(tempEventStartTime);
        }
        const tempEvent = {
          name: tempEventName,
          startTime: tempEventStartTime,
          endTime: tempEventEndTime ?? 'NA',
          venueLocation: tempEventVenue,
        };
        //hash by location
        if (hashMap.hasOwnProperty(tempEventVenue)) {
          hashMap[tempEventVenue][tempEventStartTime] = tempEvent;
        } else {
          hashMap[tempEventVenue] = {};
          hashMap[tempEventVenue][tempEventStartTime] = tempEvent;
        }
      }

    });

  }
  arrayRemove(arr: any, value: any) {
    return arr.filter((ele: any) => {
      return ele != value;
    });
  }

  sanitizeData() {

    this.northVenueLocation = [
      ...this.venueLocation.filter(
        (room) =>
          room.includes('North') &&
          !(
            room.includes('area') ||
            room.includes('Area') ||
            room.includes('room') ||
            room.includes('Room') ||
            room.includes('Displays') ||
            room.includes('Drive')
          )
      ),
    ];
    this.northFirstFloorLocation = [...this.northVenueLocation.filter((loc) =>
      loc.includes('North 1')
    )];
    this.northSecondFloorLocation = [...this.northVenueLocation.filter(
      (loc) => loc.includes('North 2')
    )];

    this.specialVenueLocation = [
      ...this.venueLocation.filter(
        (room) =>
          room.includes('North') &&
          (room.includes('area') ||
            room.includes('Area') ||
            room.includes('room') ||
            room.includes('Room') ||
            room.includes('Displays') ||
            room.includes('Drive'))
      ),
    ];
    this.westVenueLocation = [
      ...this.venueLocation.filter((room) => room.includes('West')),
    ];

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
