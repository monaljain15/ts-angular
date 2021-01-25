import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';import { ObjectUnsubscribedError } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).map((key) => {
      formGroup.controls[key].markAsTouched();
      formGroup.controls[key].markAsDirty();
      const myBeFG = formGroup.controls[key] as FormGroup;
      if (myBeFG.controls) {
        this.markFormGroupTouched(myBeFG);
      }
    });
  }

  public markFormGroupUnTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).map((key) => {
      formGroup.controls[key].markAsUntouched();
      formGroup.controls[key].markAsPristine();
    });
    formGroup.markAsPristine();
  }
}
