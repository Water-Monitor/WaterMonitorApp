import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthIntercepter implements HttpInterceptor {
    constructor(
        private storage : Storage
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.get(environment.token))
            .pipe(
                switchMap(result => {

                    if (result) {
                        console.log(`Bearer in interceptor ${result.authorization}`);
                        req = req.clone({ headers: req.headers.append('Authorization', `${result.authorization}`) });
                    }

                    return next.handle(req);
                })
            );
    }
}
