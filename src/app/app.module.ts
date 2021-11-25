import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { PartnersComponent } from './components/partners/partners.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { HomeComponent } from './pages/home.component';
import { VehiclesComponent } from './pages/vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ReviewsComponent,
    PartnersComponent,
    FooterComponent,
    VehicleComponent,
    HomeComponent,
    VehiclesComponent,
    VehicleListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
