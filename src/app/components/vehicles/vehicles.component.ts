import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle } from 'src/app/interfaces/vehicle';
import { UserService } from 'src/app/services/user.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  @Input() term: any = { category: '', search: '', sort: '' };
  constructor(
    private vehicleService: VehiclesService,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  vehicleList: Vehicle[] = [];
  currentVehicle!: Vehicle;
  error: string = '';

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (value: Vehicle[]) => (this.vehicleList = value),
      complete: () => console.log(this.vehicleList),
      error: (error) => (this.error = error),
    });
  }
  clicked(vehicle: Vehicle): void {
    this.currentVehicle = vehicle;
    this.vehicleService.setCurrentVehicle(this.currentVehicle);
    this.router.navigate(['/vehicle']);
  }
  handleCategory(event: any) {
    this.term.category = event.target.value;
  }
  handleSearch(event: any) {
    this.term.search = event.target.value;
  }
  handleSort(event: any) {
    this.term.sort = event.target.value;
  }
  doFilter(term: object) {
    this.vehicleService.doSearch(term);
    this.vehicleService.getVehicles().subscribe({
      next: (value: Vehicle[]) => (this.vehicleList = value),
      complete: () => console.log(this.vehicleList),
      error: (error) => (this.error = error),
    });
  }
  loadMore() {
    this.vehicleService.doLoadMore().subscribe({
      next: (value: Vehicle[]) => (this.vehicleList = value),
      complete: () => console.log(this.vehicleList),
      error: (error) => (this.error = error),
    });
  }
  addToCart(vehicle: Vehicle) {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.currentVehicle = vehicle;
    this.userService.addToCart(this.currentVehicle);
    this.toastrService.success('Added to Cart');
  }
}
