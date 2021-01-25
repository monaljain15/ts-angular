import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { Constants } from 'src/app/constants/constants';
import { HttpRequestsService } from 'src/app/service/http-requests.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public addUserForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private httpService: HttpRequestsService,
    private utility: UtilityService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      role: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  async OnSubmit() {
    this.formService.markFormGroupTouched(this.addUserForm);
    if (this.addUserForm.valid) {
      const userData = {
        firstName: this.addUserForm.value('firstName'),
        lastName: this.addUserForm.value('lastName'),
        email: this.addUserForm.value('email'),
        password: this.addUserForm.value('password'),
        dob: this.addUserForm.value('dob'),
        role: this.addUserForm.value('role'),
        city: this.addUserForm.value('city'),
        state: this.addUserForm.value('state'),
      };

      this.httpService.post(Constants.userRoutes.addUser, userData, true).then(res => {
        console.log('res', res);
      }).catch(err => {
        this.utility.showErrorToast(err);
      });
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector("form .ng-invalid");
    
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });
  }

  getTopOffset(firstInvalidControl: HTMLElement): number {
    return firstInvalidControl.getBoundingClientRect().top + window.scrollY - 50;
  }

}
