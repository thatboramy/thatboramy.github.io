import { Component } from '@angular/core';
import { fridayData, saturdayData, sundayData } from './data';
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
  saturdayHashMap: any = {};
  sundayHashMap: any = {};

  constructor() {
    this.sanitizeData(fridayData);
    this.serializeData(saturdayData, this.saturdayHashMap);
    this.serializeData(sundayData, this.sundayHashMap);

    this.timeValues.sort((a, b) => {
      a = this.convertTime12to24(a);
      b = this.convertTime12to24(b);
      return a > b ? 1 : a < b ? -1 : 0;
    });
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

      const tempEventVenue = eventText[1].trim() ?? '';

      // if (!tempEventName.toLowerCase().includes('Sign')) {
      if (!this.venueLocation.some((loc) => loc === tempEventVenue)) {
        this.venueLocation.push(tempEventVenue);
      }

      const tempEventTime = tempTimeList[i].date.split('::')[1].split('to');
      const tempEventStartTime = tempEventTime[0].trim();
      const tempEventEndTime = tempEventTime[1]?.trim() ?? '';

      if (!this.timeValues.some((loc) => loc === tempEventStartTime)) {
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
        const tempHash = {};
        hashMap[tempEventVenue] = {};
        hashMap[tempEventVenue][tempEventStartTime] = tempEvent;
      }
      // }
    });
    this.timeValues.sort((a, b) => {
      a = this.convertTime12to24(a);
      b = this.convertTime12to24(b);
      return a > b ? 1 : a < b ? -1 : 0;
      // return a.localeCompare(b);
    });
  }

  sanitizeData(data: any) {
    const currData = data;
    currData.forEach((event: any) => {
      if (!event.fullEvent.includes('Signing') && event.endTime !== undefined) {
        const test1 = event.fullEvent.split('::');
        const tempEventName = test1[0].trim();
        const tempEventVenue = test1[1].trim();

        if (!this.venueLocation.some((loc) => loc === tempEventVenue)) {
          this.venueLocation.push(tempEventVenue);
        }

        const tempEventStartTime = event.eventDateTime.trim();
        // console.log(tempEventStartTime);
        if (!this.timeValues.some((loc) => loc === tempEventStartTime)) {
          this.timeValues.push(tempEventStartTime);
        }
        const tempEventEndTime = event.endTime.trim();

        const tempEvent = {
          name: tempEventName,
          startTime: tempEventStartTime,
          endTime: tempEventEndTime,
          venueLocation: tempEventVenue,
        };
        this.eventData.push(tempEvent);
        // trying hash

        //hash by location
        if (this.eventHashMap.hasOwnProperty(tempEventVenue)) {
          this.eventHashMap[tempEventVenue][tempEventStartTime] = tempEvent;
        } else {
          const tempHash = {};
          this.eventHashMap[tempEventVenue] = {};
          this.eventHashMap[tempEventVenue][tempEventStartTime] = tempEvent;
        }
      }
    });
    // group by Building
    this.northVenueLocation = [
      // 'time',
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
    this.northFirstFloorLocationNoTime = [...this.northVenueLocation.filter((loc) =>
      loc.includes('North 1')
    )];
    this.northFirstFloorLocation = ['time', ...this.northVenueLocation.filter((loc) =>
      loc.includes('North 1')
    )];

    this.northSecondFloorLocation = ['time', ...this.northVenueLocation.filter(
      (loc) => loc.includes('North 2')
    )];

    this.specialVenueLocation = [
      'time',
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
      'time',
      ...this.venueLocation.filter((room) => room.includes('West')),
    ];

    this.venueLocation = ['time', ...this.venueLocation];
    this.headerDisplayCoumn = ['time', ...this.venueLocation];
  }

  formatText(event: any) {
    if (event === undefined) {
      return '';
    } else {
      return `${event.name}\n${event.startTime}-${event.endTime}`;
    }
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
