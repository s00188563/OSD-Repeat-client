import { Component, OnInit } from '@angular/core'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}
  faGithubSquare = faGithubSquare
  ngOnInit(): void {}
}
