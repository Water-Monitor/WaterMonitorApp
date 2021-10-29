import { Component, OnInit } from '@angular/core';
import { IBarChartOptions, IChartistAnimationOptions, IChartistData } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
  selector: 'app-todays-water-usage-graph',
  templateUrl: './todays-water-usage-graph.component.html',
  styleUrls: ['./todays-water-usage-graph.component.css']
})
export class TodaysWaterUsageGraphComponent implements OnInit {
  type: ChartType = 'Bar';
  data: IChartistData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [[9, 4, 11, 7, 10, 12], [3, 2, 9, 5, 8, 10]]
  };
  options: IBarChartOptions = {
    axisX: {
      showGrid: true
    },
    height: 300
  };
  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
