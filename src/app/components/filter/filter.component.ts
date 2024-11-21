// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Product } from '../../product.model'; 

// @Component({
//   selector: 'app-filter',
//   templateUrl: './filter.component.html',
//   styleUrls: ['./filter.component.css'],
//   standalone: true
// })
// export class FilterComponent {
//   @Input() products: Product[] = []; // Input the products to filter
//   @Input() selectedCategory: string = 'all'; // The selected category
//   @Input() priceRanges: { min: number, max: number };

//   @Output() categoryChange = new EventEmitter<string>(); // Emit category changes
//   @Output() priceRangeChange = new EventEmitter<{ min: number, max: number }>(); // Emit price range changes
//   @Output() sortChange = new EventEmitter<string>(); // Emit sort changes

//   selectedSortOption: string = '';

//   selectCategory(category: string) {
//     this.categoryChange.emit(category); // Emit selected category
//   }

//   filterByPrice(range: { min: number, max: number }) {
//     this.priceRangeChange.emit(range); // Emit selected price range
//   }

//   selectSortOption(option: string) {
//     this.selectedSortOption = option;
//     this.sortChange.emit(option); // Emit selected sort option
//   }
// }
