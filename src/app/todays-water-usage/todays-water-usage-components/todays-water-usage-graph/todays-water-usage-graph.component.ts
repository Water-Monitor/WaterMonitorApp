import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IChartistData, ILineChartOptions } from 'chartist';
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
  graph: { title: string, content: string } = { title: "Todays water usage", content: "Last 7 days" };
  forecast: { day: string, amount: number }[] = [];
  forecastDays: string[] = ["Tomorrow", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19"];
  //Make the data easier readable
  divide: number = 1000; //convert mililiters to liters
  @Output() outputData = new EventEmitter<TipData>();
  displayForecastInText: boolean = false;

  type: ChartType = 'Line';
  // Set true to show legends
  lineChartLegend = true;
  data: IChartistData = {
    labels: [],
    series: []
  };
  options: ILineChartOptions = {
    showArea: true,
    showPoint: false,
    fullWidth: true,
    // low: 0,
    axisX: {
      showGrid: true,
    },
    height: 200,
  };
  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 100 * data.index,
            dur: 1000,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            // easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      }
    }
  };

  constructor(
    private waterUsageService: WaterUsageService,
  ) { }

  ngOnInit(): void {
    this.showUsage(7);
  }

  showUsage(amountOfDays: number) {
    let fromDate: Date = new Date("2006/02/05");
    fromDate.setDate(fromDate.getDate() - amountOfDays + 1);
    fromDate.setUTCMilliseconds(0);
    console.log(fromDate);
    let untilDate: Date = new Date("2006/02/05");
    untilDate.setUTCMilliseconds(86399999);
    console.log(untilDate);

    this.waterUsageService.getWaterUsage(1, fromDate, untilDate).subscribe((data) => {
      this.graph.title = "Water usage";
      this.graph.content = "from: " + fromDate.toDateString() + " until: " + untilDate.toDateString();
      this.convertToGraphData(data, this.divide);
    });
  }

  convertToGraphData(graphData: WaterUsageDataDto[], divide: number) {
    let series = [];

    let totalUsages = this.addTotalConsumption(graphData, divide);
    series.push(totalUsages);
    let regionUsages = this.addRegionConsumption(graphData, divide)
    series.push(regionUsages);
    // series.push(this.addMainConsumption(graphData, divide));
    // series.push(this.addShowerConsumption(graphData, divide));
    // series.push(this.addIrrigationConsumption(graphData, divide));

    this.displayForecastInText = false;
    // let days: string[] = [];
    // this.addForecastTextBox(days, totalUsages);

    //Tell that there have to be generated a tip!
    this.outputData.emit(new TipData(totalUsages, regionUsages));

    let labels = this.getDayLables(graphData);

    this.data = {
      labels: labels,
      series: series
    };
  }

  showForecast(amountOfDays: number) {
    let fromDate: Date = new Date("2006/02/06");
    fromDate.setUTCMilliseconds(0);
    console.log(fromDate);
    let untilDate: Date = new Date("2006/02/06");
    untilDate.setDate(untilDate.getDate() + amountOfDays - 1);
    untilDate.setUTCMilliseconds(86399999);
    console.log(untilDate);

    this.waterUsageService.getPrediction(1, fromDate, untilDate).subscribe((data) => {
      this.graph.title = "Forecast";
      this.graph.content = "For the next 7 days";
      this.convertForecastToGraphData(data, this.divide);
    });
  }

  convertForecastToGraphData(graphData: WaterUsageDataDto[], divide: number) {
    let series = [];

    let totalUsages = this.addForecastTotalConsumption(graphData, divide);
    series.push(totalUsages);

    this.displayForecastInText = true;
    this.addForecastTextBox(this.forecastDays, totalUsages);

    //Tell that there have to be generated a tip!
    this.outputData.emit(new TipData([], []));

    let labels = this.addForecastDays(graphData);

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

  private addForecastTotalConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let data: number[] = [];
    for (let singleData of graphData) {
      data.push(singleData.totalConsumption / divide);
    }
    return data;
  }

  private addRegionConsumption(graphData: WaterUsageDataDto[], divide: number): number[] {
    let mockedData: number[] = [
      647000, 	655000, 	675000, 	675000, 	655000, 	646000, 	637000,
      645000, 	667000, 	685000, 	687000, 	675000, 	666000, 	636000,
      637000, 	656000, 	675000, 	656000, 	655000, 	646000, 	636000,
      626000, 	637000, 	656000, 	665000, 	645000, 	637000, 	645000,
      637000, 	645000, 	656000,
    ];
    let data: number[] = [];
    for (let singleData of mockedData.slice(0, graphData.length)) {
      data.push(singleData / divide);
    }
    return data;
  }

  private addForecastDays(graphData: WaterUsageDataDto[]): string[] {
    return this.forecastDays.slice(0, graphData.length);
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

  private addForecastTextBox(days: string[], usage: number[]) {
    let array = [];

    for (let i = 0; i < usage.length; i++) {
      array.push({ day: days[i], amount: usage[i] });
    }

    this.forecast = array;
  }
}
