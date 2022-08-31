import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  userForm!: UntypedFormGroup;
  ngOnInit(): void {
    this.userForm = new UntypedFormGroup({
      email: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  }
  onSubmit() {
    this.userService.login(this.userForm?.value).subscribe({
      next: (user) => this.toastrService.success('Login Successful'),
      error: (err) => this.toastrService.error(err.error.msg),
    });
  }
}
