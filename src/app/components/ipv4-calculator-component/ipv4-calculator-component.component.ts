import { Component } from '@angular/core';
import { CalculatorIpv4Service } from '../../services/calculator-ipv4.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ipv4-calculator-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ipv4-calculator-component.component.html',
  styleUrl: './ipv4-calculator-component.component.css'
})
export class Ipv4CalculatorComponentComponent {

  ipAddress: string = '';
  subnetMask: string = '';
  ipInfo: any = null;
  error: string = '';

  // Para la n-ésima IP útil
  nthIpNumber: number = 1;
  nthIp: string | null = null;
  nthIpError: string = '';

  constructor(private ipService: CalculatorIpv4Service) {}

  calculateIp() {
    try {
      this.error = '';
      this.ipInfo = this.ipService.calculateIpInfo(this.ipAddress, this.subnetMask);
    
      // Resetear la n-ésima IP
      this.nthIp = null;
      this.nthIpError = '';
      this.nthIpNumber = 1;
    
    } catch (err: any) {
      this.error = err.message;
      this.ipInfo = null;
    }
  }


   // Método para obtener la n-ésima IP útil
   calculateNthIp() {
    if (!this.ipInfo) {
      this.nthIpError = 'Primero debe calcular la información de la IP';
      return;
    }

    try {
      this.nthIpError = '';
      this.nthIp = this.ipService.getNthUsableIp(
        this.ipInfo.networkIp, 
        this.ipInfo.broadcastIp, 
        this.nthIpNumber
      );
      
      if (this.nthIp === null) {
        this.nthIpError = `El número debe estar entre 1 y ${this.ipInfo.hostsCount}`;
      }
    } catch (err: any) {
      this.nthIpError = err.message;
      this.nthIp = null;
    }
  }

  
  // Método para colorear los bits según red, subred y host
  getColorClass(index: number): string {
    if (!this.ipInfo) return '';
    
    const networkBits = this.ipInfo.binaryRepresentation.colored.red.length;
    
    if (index < networkBits) {
      return 'network-bit';
    } else {
      return 'host-bit';
    }
  }

  // Método para separar los octetos con espacios para facilitar la lectura
  formatBinary(binary: string): string {
    let result = '';
    for (let i = 0; i < binary.length; i++) {
      result += binary[i];
      if ((i + 1) % 8 === 0 && i < binary.length - 1) {
        result += ' ';
      }
    }
    return result;
  }
}
