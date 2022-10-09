import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$!: Observable<boolean>;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void { 
    this.isAuth$ = this.authService.isAuth$.pipe(
      shareReplay(1)
    );
  }

  onAddNewPublication() {
    this.router.navigateByUrl('/create');
  }

  onLogout() {
    this.authService.logout();
  }

}

