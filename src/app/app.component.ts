import { Component } from '@angular/core';
import { fridayData2, saturdayData, sundayData } from './data';

export class Event {
  name: string = '';
  startTime = '';
  endTime = '';
  venueLocation: string = '';

  constructor(event: Event) {
    this.name = event.name;
    this.startTime = event.startTime;
    this.endTime = event.endTime ?? '';
    this.venueLocation = event.venueLocation;
  }
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  // for testing out the new layout
  turnOffTabView = true;
  // hardcoded variable
  EscapeRoomLocation = [
    'North 121AB_Escape Room_2',
    'North 121AB_Escape Room_1',
    'North 121AB_Escape Room_3',
  ];
  NorthBuildingSpecialLocation = [
    'North 123 Blood Drive',
    'North 128B Science Displays',
    'North 127A',
    'North 120CD',
    'North 229AB',
  ];
  NorthBuildingGamingZoneLocation = [
    'North 120AB The Gaming Zone Area',
    'North 120AB Scheduled tabletop games area',
    'North 120AB Cobra Arcade Bar Area',
    'North 120AB Mr. E Comics Tabletop Game Area',
    'North 120AB Game On Expo Area',
  ];
  SigningAreaLocation = [
    'B530 - Changing Hands Author Signing Area',
    'B526 - Changing Hands Author Signing Area',
    'B528 - Changing Hands Author Signing Area',
    'B532 - Changing Hands Author Signing Area',
  ];
  HallLocation = [
    'H209 - Cristina Vee',
    'H112 - JJ Cohen',
    'H213 - Jodi Benson',
    'H101 - John Barrowman',
    'H115 - John DiMaggio',
    'H203 - Lindsay Jones',
    'H207 - Maggie Robertson',
    'H205 - Michael Jones',
    'H102 - Anthony Rapp',
    'H119 - Christopher Eccleston',
    'H211 - Judy Kuhn',
    'H107 - Doug Jones',
    'H105 - Felicia Day',
    'H106 - Billy West',
    'H104 - Jim Cummings',
    'H103 - Patrick Warburton',
    'H116 - Katie Griffin',
    'H114 - Linda Ballantyne',
    'H113 - Kate Mulgrew',
    'H110 - Tim Russ',
    'H201 - Harvey Guillen',
    'H215 - Felicia Day',
    'H109 - Diane Guerrero',
  ];
  PhotoBoothLocation = ['Photo Booth A', 'Photo Booth B'];
  WestBuildingSpecialLocation = [
    'West 212ABC Phoenix RPGs',
    'West 101ABC Event Area',
    'West 213B',
    'West 104AB',
    'West 103AB',
  ];

  SpecialVenues = [
    ...this.EscapeRoomLocation,
    ...this.NorthBuildingGamingZoneLocation,
    ...this.NorthBuildingSpecialLocation,
    ...this.SigningAreaLocation,
    ...this.HallLocation,
    ...this.PhotoBoothLocation,
    ...this.WestBuildingSpecialLocation,
  ];

  NorthBuildingScheduleSubTitle = ['First Floor', 'Second Floor', 'Special '];

  /*The Actual Variables being Used*/
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
  venueLocationGroupNames: any[] = [];
  constructor() {
    this.serializeData(fridayData2, this.fridayHashMap);
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
    // because time sort sucks
    this.timeValues = [
      '8:55 am',
      '9:00 am',
      '9:30 am',
      '10:00 am',
      '10:30 am',
      '10:45 am',
      '11:00 am',
      '11:30 am',
      '12:00 pm',
      '12:15 pm',
      '12:30 pm',
      '1:00 pm',
      '1:15 pm',
      '1:30 pm',
      '1:45 pm',
      '2:00 pm',
      '3:00 pm',
      '4:00 pm',
      '4:30 pm',
      '4:45 pm',
      '5:00 pm',
      '5:30 pm',
      '6:00 pm',
      '7:00 pm',
      '7:30 pm',
      '8:00 pm',
      '8:30 pm',
      '9:00 pm',
      '10:00 pm',
      '10:30 pm',
    ];
  }
  groupVenues() {
    this.venueLocationGroupNames = [
      {
        name: 'Exhibitor Floor (Ground Floor)',
        subVenues: [
          { subVenueTitle: 'Celebrity Halls', rooms: this.HallLocation },
        ],
      },
      {
        name: 'North Building',
        subVenues: [
          { subVenueTitle: 'First Floor', rooms: this.northFirstFloorLocation },
          {
            subVenueTitle: 'Second Floor',
            rooms: this.northSecondFloorLocation,
          },
          {
            subVenueTitle: 'Gaming Area',
            rooms: [
              ...this.NorthBuildingGamingZoneLocation,
              ...this.EscapeRoomLocation,
            ],
          },

          {
            subVenueTitle: 'Special Buildings',
            rooms: [...this.NorthBuildingSpecialLocation],
          },
        ],
      },
      {
        name: 'West Building',
        subVenues: [
          { subVenueTitle: 'First Floor', rooms: this.westVenueLocation },
          {
            subVenueTitle: 'Special Building',
            rooms: this.WestBuildingSpecialLocation,
          },
        ],
      },
      {
        name: 'Unknown Location',
        subVenues: [
          {
            subVenueTitle: 'Book Signing Area and Signing',
            rooms: [...this.SigningAreaLocation, ...this.PhotoBoothLocation],
          },
        ],
      },
    ];
    this.venueLocationGroup = [
      [this.northFirstFloorLocation, this.northSecondFloorLocation],
      [this.westVenueLocation],
      [this.specialVenueLocation],
    ];
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
      return -1;
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

        if (
          tempEventEndTime !== '' &&
          !this.timeValues.some((loc) => loc === tempEventStartTime)
        ) {
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

  isSpecialRoom(room: string) {
    return this.SpecialVenues.includes(room);
  }

  sanitizeData() {
    this.northVenueLocation = [
      ...this.venueLocation.filter(
        (room) => room.includes('North') && !this.isSpecialRoom(room)
      ),
    ];
    this.northFirstFloorLocation = [
      ...this.northVenueLocation.filter((loc) => loc.includes('North 1')),
    ];
    this.northSecondFloorLocation = [
      ...this.northVenueLocation.filter((loc) => loc.includes('North 2')),
    ];

    // TODO: Check this with the schedule, will not have the H halls
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
      ...this.venueLocation.filter(
        (room) => room.includes('West') && !this.isSpecialRoom(room)
      ),
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
