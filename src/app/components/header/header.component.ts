import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public user: UserService) {}
  faShoppingCart = faShoppingCart;
  ngOnInit(): void {}
}
