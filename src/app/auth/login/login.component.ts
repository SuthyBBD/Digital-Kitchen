import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  notification: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notification = 'Registration successful, you may now log in';
      }
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isInvalidForm(field): boolean {
    return this.loginForm.controls[field].invalid && (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

  isRequired(field): boolean {
    return this.loginForm.controls[field].errors.required;
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.router.navigate(['/products']);
      },
      () => {

      });
  }
}
