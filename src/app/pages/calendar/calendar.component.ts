import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';
import { Calendar } from '@fullcalendar/core';
import { Absence } from 'src/app/models/absence';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [AbsenceHttpService],
})
export class CalendarComponent implements OnInit {
  survol: boolean = false;
  absences: Absence[] = [];
  absencesCal: any[] = [];
  absencesCal2: any[] = [];

  constructor(private service: AbsenceHttpService) {}

  ngOnInit(): void {
    // let calendar = new Calendar(calendarEl, {})
    this.service.get(2023).subscribe((absence) => {
      this.absences = <Absence[]>absence;
    });
    for (let absence of this.absences) {
      let absenceSmall = {
        id: absence.id,
        title: absence.typeConge,
        start: absence.dateDebut,
        end: absence.dateFin,
      };
      this.absencesCal.push(absenceSmall);
    }
    this.absencesCal2 = [
      {
        id: 'hey',
        title: 'RTT_EMPLOYE',
        start: '2023-09-11',
        end: '2023-09-13',
        display: 'background'
      },
    ];
  }

  getAnnee() {
    this.service.get(2023).subscribe((absence) => {
      this.absences = <Absence[]>absence;
    });
    const annee = this.service.get(2023).subscribe();
    for (let absence of this.absences) {
      let absenceSmall = {
        id: absence.id,
        title: absence.typeConge,
        start: absence.dateDebut,
        end: absence.dateFin,
        display: 'background'
      };
      this.absencesCal.push(absenceSmall);
    }
  }

  // absencesList : Absence[] = [];
  // for (let absences of absencesList) {

  // }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',

    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    // dateClick: this.handleDateClick.bind(this),

    events: [
      {
        id: 'hey',
        title: 'RTT_EMPLOYE',
        start: '2023-09-11',
        end: '2023-09-13',
        display: 'background'
      }
    ],
    // this.absencesCal2,

    weekends: false,
    selectable: true,
    dateClick: function (info) {
      //create absence function

      alert('Clicked on: ' + info.dateStr);
      // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      // alert('Current view: ' + info.view.type);
      // info.dayEl.style.backgroundColor = 'red';
    },

    select: function (info) {
      //create absence
      alert(info.startStr + ' ' + info.endStr);
      //modale ???
    },

    eventClick: function (info) {
      //modify absence function
    },

    eventMouseEnter: function (info) {
      //create red cross to delete
      //jsevent?
      // survolChange()
    },
    eventMouseLeave: function () {
      //hide red cross
    },
  };

  survolChange() {
    this.survol = true;
    alert('Clicked on event');
  }

  removeAbsence() {
    //appel in red cross click
    var event;
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }
  handleDateClick(arg: { dateStr: string }) {
    alert('date click! ' + arg.dateStr);
  }
}
