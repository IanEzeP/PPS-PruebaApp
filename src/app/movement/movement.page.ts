import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.page.html',
  styleUrls: ['./movement.page.scss'],
})
export class MovementPage {

  /*Codigos que tuve que correr:
  npm install cordova-plugin-device-motion --legacy-peer-deps
  npm install @ionic-native/core@5.36.0 --legacy-peer-deps
  -------------------------/device-motion-----------------
  -------------------------/vibration---------------------
  -------------------------/flashlight--------------------
  -------------------------/screen-orientation------------
  */
  
  subscription: any;

  primerIngreso = true;
  primerIngresoFlash = true;

  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';

  mostrarDialog = true;
  alarmOnOff = false;
  showDialog = false;
  estado = '';
  clave = '';

  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;

  /**
   * Z: si la pantalla mira hacia arriba aumenta, si mira hacia abajo disminuye
   * Está en 0 siempre que la pantalla mire hacia un lado.
   * 
   * Y: si el celular está parado en la posición normal aumenta, si está parado pero en una posición invertida
   * (La camara abajo) disminuye. Está en 0 siempre que el celular esté acostado.  
   * 
   * X: si el celular está en horizontal del lado izquierdo aumenta, si está en horizontal del lado derecho disminuye
   * Está en 0 siempre que el celular está en posición vertical, está parado o acostado.
   * 
   * 
   * Levantado:            Z: 0              (Posición vertical u horizontal)
   * Levantado vertical:   X: 0 Y: 10 o -10  (derecho y al revés respectivamente) 
   * Levantado horizontal: Y: 0 X: 10 o -10  (lado izquierdo y lado derecho respectivamente) 
   * 
   * Boca arriba:          X: 0 Y: 0 Z: 10
   * Boca abajo:           X: 0 Y: 0 Z: -10
   */
  constructor(public screenOrientation: ScreenOrientation, public deviceMotion: DeviceMotion,
    private vibration: Vibration, private flashlight: Flashlight) {
      //this.comenzar();
     }

     cambiarAlarma() {
      if (this.alarmOnOff === true) {
        //this.checkPassword();
        this.alarmOnOff = false;
      }
      else {
        this.alarmOnOff = true;
        this.comenzar();
      }
    }

  comenzar() {
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      console.log(`Acelerómetro: X: ${this.accelerationX} Y: ${this.accelerationY} Z: ${this.accelerationZ}`);

      if (acceleration.x > 5) {
        //Inclinacion Izquierda
        this.posicionActualCelular = 'izquierda';
      }
      else if (acceleration.x < -5) {
        //Inclinacion Derecha

        this.posicionActualCelular = 'derecha';
        //this.movimientoDerecha();
      }
      else if (acceleration.y >= 9) {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular = 'arriba';
        /*
        if ((this.posicionActualCelular !== this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();
        this.movimientoVertical();*/
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular = 'plano';
        //this.movimientoHorizontal();
      }

      console.log(this.posicionActualCelular);

    });
  }

}
