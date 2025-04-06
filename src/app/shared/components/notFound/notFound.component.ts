import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './notFound.component.html',
})
export class NotFoundComponent {

  location = inject(Location)

  goBack() {
    this.location.back();
  }
  goToHome() {
    this.location.go('/');
  }
 }
