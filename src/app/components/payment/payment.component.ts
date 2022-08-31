import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Payment } from 'src/app/interfaces/payments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private userService: UserService) {}
  payments: Payment[] = [];
  error: string = '';
  totalPrice: number = 0;

  ngOnInit(): void {
    this.userService.getPayments().subscribe({
      next: (value: Payment[]) => (this.payments = value),
      complete: () => console.log(this.payments),
      error: (error) => (this.error = error),
    });

    console.log(this.payments);

    /*     this.payments.forEach((payment) => {
      this.totalPrice = 0;
      payment.cart.forEach((item) => {
        this.totalPrice += item.price;
      });
      payment.total = this.totalPrice;
    }); */

    console.log(this.payments);
  }
}
