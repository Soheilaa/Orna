import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export const appConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    
    importProvidersFrom(
      MatTooltipModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    )
  ]
};