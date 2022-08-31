import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}
  userForm!: UntypedFormGroup;
  message: String = '';
  ngOnInit(): void {
    this.userForm = new UntypedFormGroup({
      email: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  }
  onSubmit() {
    this.userService.login(this.userForm?.value).subscribe({
      next: (user) => {
        console.log(JSON.stringify(user) + ' has been added');
        this.message = 'new user has been added';
      },
      error: (err) => (this.message = err),
    });
  }
  dismissAlert() {
    this.message = '';
  }
}
