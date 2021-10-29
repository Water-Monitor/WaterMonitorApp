import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WaterUsageDto } from 'src/models/WaterUsageDto';

@Injectable({
  providedIn: 'root',
})
export class WaterUsageService {
  private static WATER_USAGE: string = "WATER_USAGE";

  constructor(
    private http: HttpClient,
  ) { }

  getWaterUsage(userId: number): Observable<WaterUsageDto> {
    return new Observable((observer) => {
      console.info("getWaterUsage request");
      this.http.get<any>(environment.get_water_usage_endpoint)
        .pipe(
          map(response => {
            console.info("getWaterUsage data received: " + JSON.stringify(response));
            let result = response['data'];
            return result;
          }),
          catchError(() => { console.error("ERROR getWaterUsage"); return []; })
        ).subscribe((result) => {
          observer.next(result);
        });

    });
  }
}
