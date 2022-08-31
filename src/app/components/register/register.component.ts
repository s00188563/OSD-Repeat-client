import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  userForm!: UntypedFormGroup;
  message: String = '';
  ngOnInit(): void {
    this.userForm = new UntypedFormGroup({
      email: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  }

  onSubmit() {
    this.userService.register(this.userForm?.value).subscribe({
      next: (user) => this.toastrService.success('Registered Successfully'),
      error: (err) => this.toastrService.error(err.error.msg),
    });
  }
}
