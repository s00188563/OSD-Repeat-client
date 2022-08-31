import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pay-dialog',
  templateUrl: './pay-dialog.component.html',
  styleUrls: ['./pay-dialog.component.css'],
})
export class PayDialogComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  formFields: { [key: string]: any } = {
    name: [undefined, [Validators.required]],
    number: [undefined, [Validators.required]],
    expiration: [undefined, [Validators.required]],
    code: [undefined, [Validators.required]],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PayDialogComponent>,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    Object.keys(this.formFields).forEach((field: any) => {
      this.formGroup.addControl(
        field,
        new FormControl(this.formFields[field][0], this.formFields[field][1])
      );
    });
  }

  public close() {
    this.dialogRef.close();
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.userService.purchase(this.data.cart);
    } else {
      this.toastrService.error('All Fields Required');
    }
  }
}
