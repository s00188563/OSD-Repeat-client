import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private userService: UserService) {}
  cart: Vehicle[] = [];
  error: string = '';
  currentItem!: Vehicle;

  ngOnInit(): void {
    this.userService.getCart().subscribe({
      next: (value: Vehicle[]) => (this.cart = value),
      complete: () => console.log(this.cart),
      error: (error) => (this.error = error),
    });
  }
  remove(vehicle: Vehicle) {
    this.currentItem = vehicle;
    this.cart.forEach((item, index) => {
      if (item._id === this.currentItem._id) {
        this.cart.splice(index, 1);
        this.updateCart(this.cart);
      }
    });
  }
  updateCart(cart: Vehicle[]) {
    this.userService.updateCart(cart);
  }
}
