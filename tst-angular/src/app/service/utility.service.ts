import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private toastr: ToastrService) {
   }

   showSuccessToast(msg) {
     this.toastr.success(msg);
   }

   showErrorToast(msg) {
     this.toastr.error(msg);
   }

   getLocaleStore(key) {
     return JSON.parse(localStorage.getItem(key));
   }

   setLocaleStore(key, value) {
     localStorage.setItem(key, JSON.stringify(value));
   }
}
