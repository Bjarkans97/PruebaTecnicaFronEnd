import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado.';

      if (error.error && typeof error.error === 'object') {
        errorMessage = error.error.detail || error.error.message || errorMessage;
      } else {
        errorMessage = error.message;
      }

      console.error('Error capturado por interceptor:', errorMessage);

      return throwError(() => new Error(errorMessage));
    })
  );
};