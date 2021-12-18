import { Component, OnInit } from '@angular/core';

import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  constructor(private vehicleService: VehiclesService) {}
  vehicleList: Vehicle[] = [];
  error: string = '';

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (value: Vehicle[]) => (this.vehicleList = value),
      complete: () => console.log(this.vehicleList),
      error: (error) => (this.error = error),
    });
    this.getList();
  }
  getList() {
    console.log(this.vehicleList);
  }
}
