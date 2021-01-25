import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private hostUrl = environment.API_URL;
  constructor(public http: HttpClient, public utility: UtilityService) { }

  getHeader(headerOptions, doNotSendAuthorizationParam) {
    const headerParams = {};
    if (doNotSendAuthorizationParam !== true) {
      headerParams['Authorization'] = this.utility.getLocaleStore('token');
    }

    if (headerOptions) {
      Object.assign(headerParams, headerOptions);
    }
    const headers = new HttpHeaders(headerParams);
    return { headers };
  }

  post(url: string, body: any, doNotSendAuthorizationParam: boolean = true, headerOptions: any = {}) {
    return new Promise((resolve, reject) => {
      const options = this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.post(`${this.hostUrl}${url}`, body, options).pipe(map(res => res)).subscribe(res => {
        resolve(res);
      }, err => {
        this.utility.showErrorToast(err);
        reject(err);
      })
    });
  }

  get(url: string, doNotSendAuthorizationParam: boolean = true, headerOptions: any = {}) {
    return new Promise((resolve, reject) => {
      const options = this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.post(`${this.hostUrl}${url}`, options).pipe(map(res => res)).subscribe(res => {
        resolve(res);
      }, err => {
        this.utility.showErrorToast(err);
        reject(err);
      })
    });
  }
}
