import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { UserService } from 'src/app/services/user.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  relatedVehicles: Vehicle[] = [];
  vehicleList: Vehicle[] = [];
  vehicle: Vehicle | null = null;
  error: string = '';
  constructor(
    private vehicleService: VehiclesService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.vehicleService
      .getCurrentVehicle()
      .subscribe((vehicle) => (this.vehicle = vehicle));
  }
  addToCart(vehicle: Vehicle) {
    this.userService.addToCart(vehicle);
  }
}
