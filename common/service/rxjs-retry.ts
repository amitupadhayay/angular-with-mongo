import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { throwError } from 'rxjs/internal/observable/throwError';
import { mergeMap, finalize } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RetryService {
    constructor(
        public toastr: ToastrManager,
    ) {
        this.genericRetryStrategy();
    }

    genericRetryStrategy = (
        {
            maxRetryAttempts = 3,
            scalingDuration = 3000,
            excludedStatusCodes = [404,500,417]
        }: {
            maxRetryAttempts?: number;
            scalingDuration?: number;
            excludedStatusCodes?: number[];
        } = {}
    ) => (attempts: Observable<any>) => {
        return attempts.pipe(
            mergeMap((error, i) => {
                const retryAttempt = i + 1;
                // if maximum number of retries have been met
                if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
                    return throwError(error);
                }

                this.toastr.infoToastr("Slow network detected.Please wait");
                console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
                return timer(retryAttempt * scalingDuration);
            }),
            finalize(() => console.log("Done"))
        );
    };

}
