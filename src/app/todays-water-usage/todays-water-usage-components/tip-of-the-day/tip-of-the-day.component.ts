import { Component, Input, OnInit } from '@angular/core';
import { TipData } from 'src/models/tipData';
import { TipDto } from 'src/models/TipDto';
import { TipService } from 'src/services/Tip.service';

@Component({
  selector: 'app-tip-of-the-day',
  templateUrl: './tip-of-the-day.component.html',
  styleUrls: ['./tip-of-the-day.component.css']
})
export class TipOfTheDayComponent implements OnInit {
  tip: TipDto = new TipDto(-1, "No Tip", "No tip available");
  @Input() set outputData(value: TipData) {
    console.log("tip is generating");
    if (value != null) {
      this.giveTip(value.totalUsages, value.regionUsages);
    }
  }

  constructor(
    private tipService: TipService,
  ) { }

  ngOnInit(): void {
  }

  private getAvgPerDay(array: number[]) {
    let total = 0;
    for (let item of array) {
      total += item;
    }

    return total / array.length;
  }

  private giveTip(totalUsages: number[], regionUsages: number[]) {
    let totalAvgUsage = this.getAvgPerDay(totalUsages);
    let regionAvgUsage = this.getAvgPerDay(regionUsages);
    let percOfRegionUsed: number = totalAvgUsage / regionAvgUsage * 100; // Calc pecentage formula: part / whole * 100%
    console.log("percentage is: " + percOfRegionUsed);
    this.tip.title = "Tip of the Day";

    if (totalAvgUsage < 10) {
      // This is extremely low, its not livable
      // No water consumption at all
      this.tip.content = "You have not used water for the last few weeks. Are you … still alive?";
    }
    else if (totalAvgUsage < 50) {
      // This is extremely low, its not livable
      // Unusual less water consumption (frequently)
      this.tip.content = "A low water consumption is great for the earth but check out if something is leaking if you are not using your registered accommodation.";
    }
    else if (percOfRegionUsed <= 50) {
      // Less water than usual (slightly lower)
      this.tip.content = "Today you are using less water than normal! Keep going!";
    }
    else if (percOfRegionUsed > 50 && percOfRegionUsed <= 90) {
      // Slightly less than average
      this.tip.content = "You managed to use less water than the average in your area! Great job!";
    }
    else if (percOfRegionUsed > 90 && percOfRegionUsed <= 110) {
      // Average
      this.tip.content = "Better use not too much water for today anymore, if you want to stay below average.";
    }
    else if (percOfRegionUsed > 110 && percOfRegionUsed <= 120) {
      // A little bit above average
      this.tip.content = "You are almost as low as the average consumption in your local area! Check out the areas to see where/how you can save water.";
    }
    else if (percOfRegionUsed > 120 && percOfRegionUsed <= 150) {
      // Higher than the average
      this.tip.content = "You seem to use a lot of water. Try showering less than 15 minutes or double check if your tabs are really turned off.";
    }
    else if (percOfRegionUsed > 150) {
      // Insanely high
      this.tip.content = "Consider using less water in [insert area]. Click on the area to get more detailed tips.";
    }
    else {
      // Get a random tip from the database
      this.tipService.getRandomTip().subscribe((data) => {
        this.tip = data;
      });
    }
  }
}
