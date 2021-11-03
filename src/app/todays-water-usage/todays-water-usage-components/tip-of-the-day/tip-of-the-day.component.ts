import { Component, OnInit } from '@angular/core';
import { TipDto } from 'src/models/TipDto';
import { TipService } from 'src/services/Tip.service';

@Component({
  selector: 'app-tip-of-the-day',
  templateUrl: './tip-of-the-day.component.html',
  styleUrls: ['./tip-of-the-day.component.css']
})
export class TipOfTheDayComponent implements OnInit {
  tip: TipDto = new TipDto(-1, "No Tip", "No tip available");

  constructor(private tipService: TipService) { }

  ngOnInit(): void {
    this.tipService.getRandomTip().subscribe((data) => {
      this.tip = data;
    });
  }

}
