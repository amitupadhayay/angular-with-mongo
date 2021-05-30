import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { CalendarMetaData } from 'common/model/dashboard.metadata';
import { isSameDay, isSameMonth } from 'date-fns';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { EChartsOption } from 'echarts';
import { GlobalModuleText } from 'common/constants/global-constant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;
  chartOption: EChartsOption;

  modalData: {
    action: string;
    event: CalendarEvent[];
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit', event);
      }
    },
    // {
    //   label: '<i class="fa fa-fw fa-times"></i>',
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     //this.events = this.events.filter(iEvent => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   }
    // }
  ];

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrManager,
    private datePipe: DatePipe,
  ) {
    this.getCalendarData();
  }

  ngOnInit() {
    this.getEmployeeDashboard();
  }

  getCalendarData() {
    this.dashboardService.getEmployeeList()
      .subscribe((response: any) => {
        var event = [];
        for (let calendar of response) {
          event.push(
            {
              start: new Date(calendar.CreatedDate),
              end: new Date(calendar.CreatedDate),
              title: calendar.FirstName + " " + calendar.LastName,
              meta: calendar,
              color: this.getColor(calendar.Salary),
              actions: this.actions,
              allDay: false,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: true
            })
        }

        this.events = event;

      },
        error => {
          this.toastr.errorToastr(error.error.message, "Oops");
        });
  }

  getColor(sal) {
    switch (sal) {
      case 1000: {
        return this.colors.yellow;
        break;
      }
      case 2000:
        return this.colors.blue;
        break;
      default: {
        return this.colors.red;
        break;
      }


    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = {action, event };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getEmployeeDashboard() {
    this.dashboardService.employeeDashboardChart()
      .subscribe((response: any) => {

        var names = [];
        var dates = [];
        var count = [];
        var index = 0;
        for (let res of response) {
          names.push(res.Name);
          count.push(res.Count);
          dates.push(this.datePipe.transform(res.Date, 'yyyy-MM-dd', 'es-ES'));
          res.Date = this.datePipe.transform(res.Date, 'yyyy-MM-dd', 'es-ES');
          res.Index = index;
          index++;
        }

        this.chartOption = {
          title: {
            text: 'Employee'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var text = "";
              var data = response.filter(x => x.Index == params[0].dataIndex);
              if (data.length > 0) {
                text += "Total Count: " + data[0].Count + "<br/>";
                text += "Created On : " + data[0].Date;
              }
              return text;
            },

            axisPointer: {
              animation: true,
            }
          },
          xAxis: {
            type: 'category',
            data: dates,
          },
          yAxis: {
            type: 'value',
          },
          //"color": ["#61B329", "#b7ada5", "#d2b887", "#af5d56"],
          "color": ["darkcyan", "#b7ada5", "#d2b887", "#af5d56"],
          series: [
            {
              data: count,
              type: 'bar',
              //title: "sdsdsd",
            },
            // {
            //   data: names,
            //   type: 'bar',
            //   title: "sdsdsd"
            // },
          ],
        };

        //this.getOptions();

      },
        error => {
          this.toastr.errorToastr(error.error.message, "Oops");
        });
  }


  // getOptions() {
  //   this.chartOption = {
  //     "title": {
  //       "text": "Test",
  //       "subtext": "AubTeast"
  //     },
  //     "tooltip": {
  //       "trigger": "axis",
  //       formatter: function (params, ticket, callback) {
  //         console.log(params)
  //         var res = params[0].name;
  //         for (var i = 0, l = params.length; i < l; i++) {
  //           res += '<br/>' + params[i].seriesName + ':' + params[i].value;
  //         }
  //         setTimeout(function () {
  //           callback(ticket, res);
  //         }, 100)
  //         return 'loading';
  //       }
  //     },
  //     "legend": {
  //       "data": ["No. of Employees", "Female Employees", "Female Emplyees (Management Team)", "Youth Employees (up to 24 years)"]
  //     },

  //     "toolbox": {
  //       "show": true,
  //       "feature": {
  //         "mark": {
  //           "show": false
  //         },
  //         "dataView": {
  //           "show": false,
  //           "readOnly": false
  //         },
  //         "magicType": {
  //           "show": true,
  //           "type": ["line", "bar"],
  //           "title": "Change"
  //         },
  //         "restore": {
  //           "show": true,
  //           "title": "Refresh"
  //         },
  //         "saveAsImage": {
  //           "show": true,
  //           "title": "Save As Image"
  //         }
  //       }
  //     },

  //     "calculable": true,

  //     "xAxis": [{
  //       "type": "category",
  //       "boundaryGap": false,
  //       "data": [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  //       "axisLabel": {
  //         "show": true
  //       },
  //       "axisLine": {
  //         "show": true
  //       },
  //       "axisTick": {
  //         "show": false
  //       },
  //       "splitLine": {
  //         "show": false
  //       }
  //     }],

  //     "yAxis": [{
  //       "type": "value",
  //       "axisLabel": {
  //         "show": true
  //       },
  //       "axisLine": {
  //         "show": false
  //       },
  //       "axisTick": {
  //         "show": false
  //       },
  //       "splitLine": {
  //         "show": false
  //       }
  //     }],

  //     "grid": {
  //       "show": true,
  //       "containLabel": true,
  //       "left": "0",
  //       "right": "0",
  //       "top": "50",
  //       "bottom": "0"
  //     },

  //     "color": ["green", "#b7ada5", "#d2b887", "#af5d56"],
  //     "series": [{
  //       "name": "No. of Emp",
  //       "type": "bar",
  //       "smooth": true,
  //       "itemStyle": {
  //         "normal": {
  //           "areaStyle": {
  //             "opacity": 0.9,
  //             "color": "#0000"
  //           },
  //           "lineStyle": {
  //             "opacity": 0
  //           }
  //         }
  //       },
  //       "data": [20, 40, 57, 73, 82, 79, 81, 78, 95, 88],
  //       "showSymbol": false
  //     }, {
  //       "name": "Female Employees",
  //       "type": "bar",
  //       "smooth": true,
  //       "itemStyle": {
  //         "normal": {
  //           "areaStyle": {
  //             "opacity": 0.9,
  //             "color": "#F25F5C"
  //           },
  //           "lineStyle": {
  //             "opacity": 0
  //           }
  //         }
  //       },
  //       "data": [9, 15, 20, 28, 32, 37, 33, 32, 41, 39],
  //       "showSymbol": false
  //     }, {
  //       "name": "Female Emplyees (Management Team)",
  //       "type": "bar",
  //       "smooth": true,
  //       "itemStyle": {
  //         "normal": {
  //           "areaStyle": {
  //             "opacity": 0.9,
  //             "color": "#FFE066"
  //           },
  //           "lineStyle": {
  //             "opacity": 0
  //           }
  //         }
  //       },
  //       "data": [1, 0, 1, 5, 5, 5, 4, 6, 5, 6],
  //       "showSymbol": false
  //     }, {
  //       "name": "Youth Employees (up to 24 years)",
  //       "type": "bar",
  //       "smooth": true,
  //       "itemStyle": {
  //         "normal": {
  //           "areaStyle": {
  //             "opacity": 0.9,
  //             "color": "#4267b2"
  //           },
  //           "lineStyle": {
  //             "opacity": 0
  //           }
  //         }
  //       },
  //       "data": [2, 4, 5, 5, 7, 4, 8, 9, 6, 4],
  //       "showSymbol": false
  //     }]
  //   };
  // }



}

