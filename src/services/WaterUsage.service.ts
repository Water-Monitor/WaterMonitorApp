import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WaterUsageDataDto } from 'src/models/WaterUsageDataDto';
import { WaterUsageDto } from 'src/models/WaterUsageDto';
import { DateTransformer } from './dateTransformer.service';

@Injectable({
  providedIn: 'root',
})
export class WaterUsageService {
  constructor(
    private http: HttpClient,
    private dateTransformer: DateTransformer,
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

  getGraph(userId: number, fromDate: Date, untilDate: Date): Observable<WaterUsageDataDto[]> {
    return new Observable((observer) => {
      console.info("getGraph request");
      let endpoint = environment.get_graph_endpoint;      
      endpoint = endpoint.replace("@fromDate", this.dateTransformer.transformDate(fromDate));
      endpoint = endpoint.replace("@untilDate", this.dateTransformer.transformDate(untilDate));
      console.log("request is: " + endpoint);
      
      this.http.get<any>(endpoint)
        .pipe(
          map(response => {
            console.info("getGraph data received: " + JSON.stringify(response));
            let result = response['data']['data'];
            return result;
          }),
          catchError(() => { console.error("ERROR getGraph"); return []; })
        ).subscribe((result) => {
          observer.next(result);
        });

    });
  }
}
