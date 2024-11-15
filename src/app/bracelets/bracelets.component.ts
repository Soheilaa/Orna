import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bracelets',
  standalone: true,
  imports:[CommonModule,CurrencyPipe],
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.css']
})
export class BraceletsComponent {
  products = [
    { name: 'Encircled Clasp Bangle', image: 'assets/bracelets/bracelets9.jpg', price: 100 },
    { name: 'Happy Birthday To You Charm Bracelet Set', image: 'assets/bracelets/bracelets15.jpg', price: 75 },
    { name: 'Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/braceletsIII.jpg', price: 250 },
    { name: 'Engravable Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets12.jpg', price: 120 },
    { name: 'Snake Chain Slider Bracelet', image: 'assets/bracelets/bracelets14.jpg', price: 75 },
    { name: 'Heart & Butterfly Bracelet Set', image: 'assets/bracelets/bracelets17.jpg', price: 75 },
    { name: 'Pavé Cuban Chain Bracelet', image: 'assets/bracelets/bracelets8.jpg', price: 75 },
    { name: 'Sparkling Tennis Bracelet', image: 'assets/bracelets/bracelets10.jpg', price: 120 },
    { name: 'Barrel Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets11.jpg', price: 75 },
    { name: 'Barbed Wire Heart Bracelet Set', image: 'assets/bracelets/bracelets19.jpg', price: 110 },
    { name: 'Barrel Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets11.jpg', price: 45 },
    { name: 'Small-Link Chain Bracelet', image: 'assets/bracelets/bracelets20.jpg', price: 75 },
    { name: 'Sparkling Infinity Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets6.jpg', price: 88 },
    { name: 'Studded Chain Bracelet', image: 'assets/bracelets/braceletsI5.jpg', price: 88 },
    { name: 'Sparkling Moon Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets7.jpg', price: 88 },
    { name: 'Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/braceletsII.jpg', price: 200 },
    { name: 'Butterfly Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets21.jpg', price: 88 },
    { name: 'Sparkling Tennis Bracelet', image: 'assets/bracelets/braceletsI.jpg', price: 195 },
    { name: 'Moments Snake Chain Bracelet', image: 'assets/bracelets/bracelets22.jpg', price: 75 },
    { name: 'Happy Birthday Balloon T-Bar Heart Bracelet Set', image: 'assets/bracelets/bracelets16.jpg', price: 160 },
    { name: 'Heart T-Bar Snake Chain Bracelet', image: 'assets/bracelets/bracelets23.jpg', price: 85 },
  ];
}
