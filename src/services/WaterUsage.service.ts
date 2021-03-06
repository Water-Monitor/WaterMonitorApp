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

  getWaterUsage(userId: number, fromDate: Date, untilDate: Date): Observable<WaterUsageDataDto[]> {
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

  getPrediction(userId: number, fromDate: Date, untilDate: Date): Observable<WaterUsageDataDto[]> {
    return new Observable((observer) => {
      console.info("getPrediction request");
      let endpoint = environment.get_prediction_endpoint;      
      endpoint = endpoint.replace("@fromDate", this.dateTransformer.transformDate(fromDate));
      endpoint = endpoint.replace("@untilDate", this.dateTransformer.transformDate(untilDate));
      console.log("request is: " + endpoint);
      
      this.http.get<any>(endpoint)
        .pipe(
          map(response => {
            console.info("getPrediction data received: " + JSON.stringify(response));
            let result = response['data']['predictions'];
            return result;
          }),
          catchError(() => { console.error("ERROR getPrediction"); return []; })
        ).subscribe((result) => {
          observer.next(result);
        });

    });
  }
}
