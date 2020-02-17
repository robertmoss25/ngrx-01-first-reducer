import { Actions,ofType,Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }

export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                    .post<AuthResponseData>(
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
                    {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                    }
            ).pipe(catchError(error => {
                of();
            }), map(resData => {
                
            }));
        }),
        catchError
    );

    constructor(private actions$: Actions, private http: HttpClient) {

    }
}