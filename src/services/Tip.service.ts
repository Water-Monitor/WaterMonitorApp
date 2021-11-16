import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TipDto } from 'src/models/TipDto';

@Injectable({
  providedIn: 'root',
})
export class TipService {
  constructor(
    private http: HttpClient,
  ) { }

  getRandomTip(): Observable<TipDto> {
    return new Observable((observer) => {
      console.info("getRandomTip request");
      this.http.get<any>(environment.get_random_tip_endpoint)
        .pipe(
          map(response => {
            console.info("getRandomTip data received: " + JSON.stringify(response));
            let result = response['data'];
            return result;
          }),
          catchError(() => { console.error("ERROR getRandomTip"); return []; })
        ).subscribe((result) => {
          observer.next(result);
        });

    });
  }
}
