import { Component } from '@angular/core';
import { isManager } from 'src/app/guards/is-logged-in.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isManager = isManager()
}
