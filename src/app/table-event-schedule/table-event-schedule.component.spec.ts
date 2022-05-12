import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEventScheduleComponent } from './table-event-schedule.component';

describe('TableEventScheduleComponent', () => {
  let component: TableEventScheduleComponent;
  let fixture: ComponentFixture<TableEventScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEventScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEventScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
