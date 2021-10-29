import { Component, OnInit } from '@angular/core';
import { WaterUsageService } from 'src/services/WaterUsage.service';

@Component({
  selector: 'app-todays-water-usage',
  templateUrl: './todays-water-usage.component.html',
  styleUrls: ['./todays-water-usage.component.css']
})
export class TodaysWaterUsageComponent implements OnInit {
  waterUsage: number = 100;

  constructor(private waterUsageService: WaterUsageService) { }

  ngOnInit(): void {
    this.waterUsageService.getWaterUsage(1).subscribe((data) => { this.waterUsage = data.amount });
  }
}
