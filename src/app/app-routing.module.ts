import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
