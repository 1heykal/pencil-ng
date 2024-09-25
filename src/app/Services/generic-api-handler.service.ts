import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseVM } from '../ViewModels/ApiResponseVM';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericApiHandlerService {

  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  post(APIRoute: string, newObject: any) : Observable<ApiResponseVM>{
    return this.httpClient.post<ApiResponseVM>(`${environment.APIURL}/${APIRoute}`, newObject);
  }

  getAll(APIRoute: string): Observable<ApiResponseVM> {
    return this.httpClient.get<ApiResponseVM>(`${environment.APIURL}/${APIRoute}`
    );
  }

  getById(APIRoute: string, id: string): Observable<ApiResponseVM> {
    return this.httpClient.get<ApiResponseVM>(`${environment.APIURL}/${APIRoute}/${id}`);
  }

  put(APIRoute: string, id: string, updatedObject: any) : Observable<ApiResponseVM> {
    return this.httpClient.put<ApiResponseVM>(`${environment.APIURL}/${APIRoute}/${id}`, updatedObject);
  }

  delete(APIRoute: string, id: string): Observable<ApiResponseVM> {
    return this.httpClient.delete<ApiResponseVM>(`${environment.APIURL}/${APIRoute}/${id}`);
  }

}
