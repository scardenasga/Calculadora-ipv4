import { Routes } from '@angular/router';
import { Ipv4CalculatorComponentComponent } from './components/ipv4-calculator-component/ipv4-calculator-component.component';

export const routes: Routes = [
    { path: '', component: Ipv4CalculatorComponentComponent },
    { path: '**', redirectTo: '' }
  ];
