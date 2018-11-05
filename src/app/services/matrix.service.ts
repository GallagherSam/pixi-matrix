import { Injectable } from '@angular/core';
import { MemoryService } from './memory.service';
import { MemoryMessage } from '../interfaces/memory-message.interface';
import { IProp } from "../enums/prop.enum";
import { IColors } from '../enums/colors.enum';
import { Colors } from '../interfaces/colors.interface';

interface MemEvent {
  prop: string;
  channel: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  public matrix: number[] = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

  private _hueMatrix: number[] = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

  constructor(private mem: MemoryService) {

    this.mem.events.subscribe((event: MemoryMessage) => {

      console.log(event);

        if (event.prop === IProp.HUE) {

          if (event.color === IColors.RED) {
            this.updateHueRed(this.mem.hue);
          } else if (event.color === IColors.GREEN) {
            this.updateHueGreen(this.mem.hue);
          } else if (event.color === IColors.BLUE) {
            this.updateHueBlue(this.mem.hue);
          }

        }

    })

  }

  // Hue
  public updateHue(hue: Colors): void {
    this.mem.compareHue(hue);
  }

  private updateHueRed(hue: Colors): void {

    const rad = (hue.red ||0) / 180 * Math.PI;

    const a00 = Math.cos(rad) + ((1.0 - Math.cos(rad)) * Math.sqrt(1/3));
    const a01 = Math.sqrt(1/3) * (1.0 - Math.cos(rad)) - (Math.sqrt(1/3) * Math.sin(rad));
    const a02 = Math.sqrt(1/3) * (1.0 - Math.cos(rad)) - (Math.sqrt(1/3) * Math.sin(rad));

    const nullify = index => {
      this.matrix[index] -= this._hueMatrix[index];
    }

    nullify(0);
    this.matrix[0] += a00;
    this._hueMatrix[0] = a00;

    nullify(1);
    this.matrix[1] += a01;
    this._hueMatrix[1] = a01;

    nullify(2);
    this.matrix[2] += a02;
    this._hueMatrix[2] = a02;

  }

  private updateHueGreen(hue: Colors): void {

    const rad = (hue.green ||0) / 180 * Math.PI;

    const a00 = Math.sqrt(1/3) * (1.0 - Math.cos(rad)) - (Math.sqrt(1/3) * Math.sin(rad));
    const a01 = Math.cos(rad) + ((1.0 - Math.cos(rad)) * Math.sqrt(1/3));
    const a02 = Math.sqrt(1/3) * (1.0 - Math.cos(rad)) - (Math.sqrt(1/3) * Math.sin(rad));

    const nullify = index => {
      this.matrix[index] -= this._hueMatrix[index];
    }

    nullify(5);
    this.matrix[5] += a00;
    this._hueMatrix[5] = a00;

    nullify(6);
    this.matrix[6] += a01;
    this._hueMatrix[6] = a01;

    nullify(7);
    this.matrix[7] += a02;
    this._hueMatrix[7] = a02;

  }

  private updateHueBlue(hue: Colors): void {

    const rad = (hue.blue ||0) / 180 * Math.PI;

    const a00 = Math.sqrt(1/3) * (1.0 - Math.cos(rad)) - (Math.sqrt(1/3) * Math.sin(rad));
    const a01 = Math.sqrt(1/3) * (1.0 - Math.cos(rad)) - (Math.sqrt(1/3) * Math.sin(rad));
    const a02 = Math.cos(rad) + ((1.0 - Math.cos(rad)) * Math.sqrt(1/3));

    const nullify = index => {
      this.matrix[index] -= this._hueMatrix[index];
    }

    nullify(10);
    this.matrix[10] += a00;
    this._hueMatrix[10] = a00;

    nullify(11);
    this.matrix[11] += a01;
    this._hueMatrix[11] = a01;

    nullify(12);
    this.matrix[12] += a02;
    this._hueMatrix[12] = a02;
    
  }

  /**
   * Initialize the matrix with these starting values
   * @param hue Degrees from 0 - 360
   * @param sat Value starting 1 and to any direction
   * @param brt Not quite sure
   * @param con Not quire sure
   */
  public init(hue: Colors, sat, brt, con) {
    this.mem.initHue(hue);
  }

}
