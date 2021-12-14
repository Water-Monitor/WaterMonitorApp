import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IChartistAnimationOptions, IChartistData, ILineChartOptions } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { TipData } from 'src/models/tipData';
import { WaterUsageDataDto } from 'src/models/WaterUsageDataDto';
import { WaterUsageService } from 'src/services/WaterUsage.service';

@Component({
  selector: 'app-todays-water-usage-graph',
  templateUrl: './todays-water-usage-graph.component.html',
  styleUrls: ['./todays-water-usage-graph.component.css']
})
export class TodaysWaterUsageGraphComponent implements OnInit {
  title: string = "Todays water usage";
  content: string = "Last 7 days";
  //Make the data easier readable
  divide: number = 10000;
  @Output() outputData = new EventEmitter<TipData>();

  type: ChartType = 'Line';
  data: IChartistData = {
    labels: [],
    series: []
  };
  options: ILineChartOptions = {
    axisX: {
      showGrid: true,
    },
    height: 400,
  };
  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
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
  whatisthis: number[] = [];

  constructor(
    private waterUsageService: WaterUsageService,
  ) { }

  ngOnInit(): void {
    let fromDate: Date = new Date("2006/01/01");
    fromDate.setUTCMilliseconds(0);
    console.log(fromDate);
    let untilDate: Date = new Date("2006/01/07");
    untilDate.setUTCMilliseconds(86399999);
    console.log(untilDate);

    this.waterUsageService.getGraph(1, fromDate, untilDate).subscribe((data) => {
      this.title = "Water usage";
      this.content = "from: " + fromDate.toDateString() + " until: " + untilDate.toDateString();
      this.convertDataToGraphData(data, this.divide);
    });
  }

  convertDataToGraphData(graphData: WaterUsageDataDto[], divide: number) {
    let series = [];

    let totalUsages = this.addTotalConsumption(graphData, divide);
    series.push(totalUsages);
    let regionUsages = this.addRegionConsumption(graphData, divide)
    series.push(regionUsages);
    // series.push(this.addMainConsumption(graphData, divide));
    // series.push(this.addShowerConsumption(graphData, divide));
    // series.push(this.addIrrigationConsumption(graphData, divide));

    //Tell that there have to be generated a tip!
    this.outputData.emit(new TipData(totalUsages, regionUsages));

    let labels = this.getDayLables(graphData);

    this.data = {
      labels: labels,
      series: series
    };
  }

  private addTotalConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let data: number[] = [];
    for (let singleData of graphData) {
      data.push(singleData.totalConsumption / divide);
    }
    return data;
  }

  private addRegionConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let data: number[] = [5000, 5600, 5800, 5700, 5600, 5400, 5100];
    return data;
  }

  private addMainConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let data: number[] = [];
    for (let singleData of graphData) {
      data.push(singleData.mainSensor / divide);
    }
    return data;
  }

  private addShowerConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let data: number[] = [];
    for (let singleData of graphData) {
      data.push(singleData.showerSensor / divide);
    }
    return data;
  }

  private addIrrigationConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let data: number[] = [];
    for (let singleData of graphData) {
      data.push(singleData.irrigationSensor / divide);
    }
    return data;
  }

  private getDayLables(graphData: WaterUsageDataDto[]): string[] {
    let data: string[] = [];
    for (let singleData of graphData) {
      data.push(new Date(singleData.datetime).toLocaleDateString());
    }
    return data;
  }

  private getHourLables(graphData: WaterUsageDataDto[]): string[] {
    let data: string[] = [];
    for (let singleData of graphData) {
      data.push(new Date(singleData.datetime).getHours().toString());
    }
    return data;
  }
}
