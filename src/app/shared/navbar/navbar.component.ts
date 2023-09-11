import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isManager } from 'src/app/guards/is-logged-in.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isManager = isManager()

  constructor(private router: Router) { }
  logout(){
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('roles')
    this.router.navigate(["/login"])
  }
}
