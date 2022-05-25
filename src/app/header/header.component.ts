import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  saveToFirebase(): void {
    this.firebaseService.saveRecipes();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
