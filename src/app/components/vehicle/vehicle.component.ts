import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicle';
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
  constructor(private vehicleService: VehiclesService) {}
  ngOnInit(): void {
    this.vehicleService
      .getCurrentVehicle()
      .subscribe((vehicle) => (this.vehicle = vehicle));
  }
}
