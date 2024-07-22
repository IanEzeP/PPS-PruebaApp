import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  BarcodeScanner,
  Barcode,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit{

  @Input() name?: string;
  public usrName: string = '';
  public apellido: string = '';
  public nombre: string = '';
  public genero: string = '';
  public dni: string = '';
  public bornDate: string = '';

  public isSupported = false;
  public isAvailable = false;
  public barcodes: Barcode[] = [];
  public infoQR: string | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.usrName = this.auth.userName;

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    BarcodeScanner.installGoogleBarcodeScannerModule();
    BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then((res: any) => 
    {
      let result = res;
      alert(result.available);
      this.isAvailable = result.available;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      alert("Permiso no garantizado");
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    if (barcodes.length > 0) {
      this.infoQR = barcodes[0].rawValue;  // Asignar la información del primer código QR escaneado
      this.fillForm(this.infoQR);  // Rellenar el formulario con la información del QR
    }
    this.barcodes.push(...barcodes);
  }

  fillForm(informacionQr: string): void {
    try {
      const qrData = informacionQr.split('@');
      if (qrData.length >= 4) {
        //0 numero de tramite
        this.apellido = qrData[1].trim() ;
        this.nombre = qrData[2].trim() ;
        this.genero = qrData[3].trim() ;
        this.dni = qrData[4].trim();
        //5 ejemplar
        this.bornDate = qrData[6].trim();
        //7 fecha de emision
        //8 me dió 205, no se que es...
        // Puedes seguir agregando campos aquí según la información del QR
      } else {
        throw new Error('Formato de QR incorrecto');
      }
    } catch (error) {
      console.error('Error parsing QR data', error);
      alert('Error parsing QR data');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }


}
