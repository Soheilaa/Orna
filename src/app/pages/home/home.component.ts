import { Component, ChangeDetectionStrategy} from '@angular/core';
import {  CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  currentImageIndex: number = 0;

  images = [
    'assets/careuselI.webp',
    'assets/careuselII.webp'
  ];

  categories = [
    { name: 'BRACELETS', image: 'assets/bracelets.webp', link: '/bracelets' },
    { name: 'RINGS', image: 'assets/rings.webp', link: '/rings' },
    { name: 'NECKLACES', image: 'assets/necklaces.webp', link: '/necklaces' },
    { name: 'EARRINGS', image: 'assets/earrings.webp', link: '/earrings' },
    { name: 'NEW IN', image: 'assets/newin.webp', link: '/new-in' }
  ];

 nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length; 
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length; 
  }

}
