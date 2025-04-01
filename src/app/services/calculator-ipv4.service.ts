import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorIpv4Service {
  constructor() {}

  /**
   * Valida que la IP tenga un formato correcto
   */
  isValidIp(ip: string): boolean {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  }

  /**
   * Convierte una IP en formato decimal a binario
   */
  ipToBinary(ip: string): string {
    return ip
      .split('.')
      .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
      .join('');
  }

  /**
   * Valida que la máscara tenga un formato correcto
   */
  isValidMask(mask: string): boolean {
    if (!this.isValidIp(mask)) {
      return false;
    }

    // Convertir a binario y verificar que sea una secuencia de 1s seguida de 0s
    const binary = this.ipToBinary(mask);
    const onesAndZeros = binary.split('1').join('').length; // Contar los ceros después del último 1

    // Verificar que todos los 0s estén después de todos los 1s
    return (
      binary.indexOf('01') === -1 &&
      onesAndZeros + binary.split('0').join('').length === 32
    );
  }

  /**
   * Convierte una IP en formato binario a decimal
   */
  binaryToIp(binary: string): string {
    let result = '';
    for (let i = 0; i < 32; i += 8) {
      const octet = binary.substring(i, i + 8);
      result += parseInt(octet, 2);
      if (i < 24) {
        result += '.';
      }
    }
    return result;
  }

  /**
   * Cuenta la cantidad de bits de red en una máscara
   */
  countNetworkBits(maskBinary: string): number {
    return maskBinary.split('1').length - 1;
  }

  /**
   * Calcula la dirección de red aplicando la máscara a la IP
   */
  calculateNetworkIp(ipBinary: string, maskBinary: string): string {
    let networkIp = '';
    for (let i = 0; i < 32; i++) {
      networkIp += (
        parseInt(ipBinary[i], 2) & parseInt(maskBinary[i], 2)
      ).toString();
    }
    return networkIp;
  }

  /**
   * Calcula la dirección de broadcast
   */
  calculateBroadcastIp(networkBinary: string, maskBinary: string): string {
    let broadcastIp = '';
    for (let i = 0; i < 32; i++) {
      if (maskBinary[i] === '1') {
        broadcastIp += networkBinary[i];
      } else {
        broadcastIp += '1';
      }
    }
    return broadcastIp;
  }

  /**
   * Obtiene la primera IP utilizable en la red
   */
  getFirstUsableIp(networkIp: string): string {
    const octets = networkIp.split('.');
    octets[3] = (parseInt(octets[3], 10) + 1).toString();
    return octets.join('.');
  }

  /**
   * Obtiene la última IP utilizable en la red
   */
  getLastUsableIp(broadcastIp: string): string {
    const octets = broadcastIp.split('.');
    octets[3] = (parseInt(octets[3], 10) - 1).toString();
    return octets.join('.');
  }

  /**
   * Determina la clase de la IP (A, B, C, D o E)
   */
  determineIpClass(ip: string): string {
    const firstOctet = parseInt(ip.split('.')[0], 10);

    if (firstOctet >= 0 && firstOctet <= 127) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D';
    return 'E';
  }

  /**
   * Determina si una IP es privada
   */
  isPrivateIp(ip: string): boolean {
    const octets = ip.split('.').map((octet) => parseInt(octet, 10));

    // 10.0.0.0 - 10.255.255.255
    if (octets[0] === 10) return true;

    // 172.16.0.0 - 172.31.255.255
    if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true;

    // 192.168.0.0 - 192.168.255.255
    if (octets[0] === 192 && octets[1] === 168) return true;

    return false;
  }

  /**
   * Colorea la representación binaria para distinguir bits de red, subred y host
   */
  colorBinaryRepresentation(
    ipBinary: string,
    maskBinary: string
  ): ColoredBinary {
    // Identificar partes de la máscara
    let networkEnd = maskBinary.indexOf('0');

    if (networkEnd === -1) {
      networkEnd = 32; // Toda la máscara son 1s
    }

    // Partes de la representación
    const redPart = ipBinary.substring(0, networkEnd);
    const hostPart = ipBinary.substring(networkEnd);

    return {
      red: redPart,
      host: hostPart,
    };
  }

  /**
   * Convierte una dirección IP a un número decimal
   */
   ipToDecimalNumber(ip: string): number {
    const octets = ip.split('.').map(octet => parseInt(octet, 10));
    return (octets[0] * 16777216) + (octets[1] * 65536) + (octets[2] * 256) + octets[3];
  }

  /**
   * Convierte un número decimal a una dirección IP
   */
  decimalNumberToIp(num: number): string {
    const octet1 = Math.floor(num / 16777216) % 256;
    const octet2 = Math.floor(num / 65536) % 256;
    const octet3 = Math.floor(num / 256) % 256;
    const octet4 = Math.floor(num) % 256;
    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  }
  
  /**
   * Obtiene la n-ésima IP útil en la red
   * @param networkIp IP de red
   * @param broadcastIp IP de broadcast
   * @param n Número de la IP útil que se desea (1-based, la primera IP útil es n=1)
   * @returns La n-ésima IP útil o null si está fuera de rango
   */
    getNthUsableIp(networkIp: string, broadcastIp: string, n: number): string | null {
      if (n < 1) {
        return null;
      }
      
      const firstUsableIp = this.getFirstUsableIp(networkIp);
      const firstIpValue = this.ipToDecimalNumber(firstUsableIp);
      
      const lastUsableIp = this.getLastUsableIp(broadcastIp);
      const lastIpValue = this.ipToDecimalNumber(lastUsableIp);
      
      const totalUsable = lastIpValue - firstIpValue + 1;
      
      if (n > totalUsable) {
        return null;
      }
      
      // Calcular la n-ésima IP sumando n-1 a la primera IP útil
      const nthIpValue = firstIpValue + (n - 1);
      return this.decimalNumberToIp(nthIpValue);
    }

  /**
   * Calcula toda la información relacionada con una dirección IP y su máscara
   */
  calculateIpInfo(ip: string, mask: string): IpInfo {
    // Validar formato de IP y máscara
    if (!this.isValidIp(ip) || !this.isValidMask(mask)) {
      throw new Error('Formato de IP o máscara inválido');
    }

    // Convertir IP y máscara a formato binario
    const ipBinary = this.ipToBinary(ip);
    const maskBinary = this.ipToBinary(mask);

    // Obtener bits de red y host
    const networkBits = this.countNetworkBits(maskBinary);

    // Calcular dirección de red aplicando la máscara a la IP
    const networkIp = this.calculateNetworkIp(ipBinary, maskBinary);
    const networkIpDecimal = this.binaryToIp(networkIp);

    // Calcular dirección de broadcast
    const broadcastIp = this.calculateBroadcastIp(networkIp, maskBinary);
    const broadcastIpDecimal = this.binaryToIp(broadcastIp);

    // Calcular cantidad de hosts
    const hostsCount = Math.pow(2, 32 - networkBits) - 2;

    // Calcular rango de IPs útiles
    const firstUsableIp = this.getFirstUsableIp(networkIpDecimal);
    const lastUsableIp = this.getLastUsableIp(broadcastIpDecimal);

    // Determinar clase de IP
    const ipClass = this.determineIpClass(ip);

    // Determinar si es IP pública o privada
    const isPrivate = this.isPrivateIp(ip);

    // Colorear bits de red, subred y host
    const coloredBinary = this.colorBinaryRepresentation(ipBinary, maskBinary);

    return {
      ip,
      mask,
      networkIp: networkIpDecimal,
      broadcastIp: broadcastIpDecimal,
      hostsCount,
      usableRange: `${firstUsableIp}-${lastUsableIp}`,
      firstUsableIp,
      lastUsableIp,
      ipClass,
      isPrivate,
      binaryRepresentation: {
        ip: ipBinary,
        mask: maskBinary,
        network: networkIp,
        colored: coloredBinary,
      },
    };
  }
}

interface IpInfo {
  ip: string;
  mask: string;
  networkIp: string;
  broadcastIp: string;
  hostsCount: number;
  usableRange: string;
  firstUsableIp: string;
  lastUsableIp: string;
  ipClass: string;
  isPrivate: boolean;
  binaryRepresentation: {
    ip: string;
    mask: string;
    network: string;
    colored: ColoredBinary;
  };
}

interface ColoredBinary {
  red: string;
  host: string;
}
