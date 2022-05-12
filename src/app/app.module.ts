import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, } from '@angular/material/tabs';

import { MatCardModule, } from '@angular/material/card';
import { TableEventScheduleComponent } from './table-event-schedule/table-event-schedule.component';
@NgModule({
  declarations: [
    AppComponent,
    TableEventScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
