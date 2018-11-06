import { Injectable } from '@angular/core';
import { MemoryService } from './memory.service';
import { MemoryMessage } from '../interfaces/memory-message.interface';
import { IProp } from '../enums/prop.enum';
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
  public matrix: number[] = [
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];

  private _hueMatrix: number[] = [
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];

  private _satMatrix: number[] = [
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];

  private _brtMatrix: number[] = [
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];

  private _conMatrix: number[] = [
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];

  constructor(private mem: MemoryService) {
    this.mem.events.subscribe((event: MemoryMessage) => {
      if (event.prop === IProp.HUE) {
        if (event.color === IColors.RED) {
          this.updateHueRed(this.mem.hue);
        } else if (event.color === IColors.GREEN) {
          this.updateHueGreen(this.mem.hue);
        } else if (event.color === IColors.BLUE) {
          this.updateHueBlue(this.mem.hue);
        }
      } else if (event.prop === IProp.SAT) {
        if (event.color === IColors.RED) {
          this.updateSatRed(this.mem.sat);
        } else if (event.color === IColors.GREEN) {
          this.updateSatGreen(this.mem.sat);
        } else if (event.color === IColors.BLUE) {
          this.updateSatBlue(this.mem.sat);
        }
      } else if (event.prop === IProp.BRT) {
        if (event.color === IColors.RED) {
          this.updateBrtRed(this.mem.brt);
        } else if (event.color === IColors.GREEN) {
          this.updateBrtGreen(this.mem.brt);
        } else if (event.color === IColors.BLUE) {
          this.updateBrtBlue(this.mem.brt);
        }
      } else if (event.prop === IProp.CON) {
        if (event.color === IColors.RED) {
          this.updateConRed(this.mem.con);
        } else if (event.color === IColors.GREEN) {
          this.updateConGreen(this.mem.con);
        } else if (event.color === IColors.BLUE) {
          this.updateConBlue(this.mem.con);
        }
      }
    });
  }

  public resetMatrix(): void {
    this.matrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  }

  // Hue
  public updateHue(hue: Colors): void {
    this.mem.compareHue(hue);
  }

  private updateHueRed(hue: Colors): void {
    const rad = ((hue.red || 0) / 180) * Math.PI;

    const a00 = Math.cos(rad) + (1.0 - Math.cos(rad)) * Math.sqrt(1 / 3);
    const a01 =
      Math.sqrt(1 / 3) * (1.0 - Math.cos(rad)) -
      Math.sqrt(1 / 3) * Math.sin(rad);
    const a02 =
      Math.sqrt(1 / 3) * (1.0 - Math.cos(rad)) -
      Math.sqrt(1 / 3) * Math.sin(rad);

    const nullify = index => {
      this.matrix[index] -= this._hueMatrix[index];
    };

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
    const rad = ((hue.green || 0) / 180) * Math.PI;

    const a00 =
      Math.sqrt(1 / 3) * (1.0 - Math.cos(rad)) -
      Math.sqrt(1 / 3) * Math.sin(rad);
    const a01 = Math.cos(rad) + (1.0 - Math.cos(rad)) * Math.sqrt(1 / 3);
    const a02 =
      Math.sqrt(1 / 3) * (1.0 - Math.cos(rad)) -
      Math.sqrt(1 / 3) * Math.sin(rad);

    const nullify = index => {
      this.matrix[index] -= this._hueMatrix[index];
    };

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
    const rad = ((hue.blue || 0) / 180) * Math.PI;

    const a00 =
      Math.sqrt(1 / 3) * (1.0 - Math.cos(rad)) -
      Math.sqrt(1 / 3) * Math.sin(rad);
    const a01 =
      Math.sqrt(1 / 3) * (1.0 - Math.cos(rad)) -
      Math.sqrt(1 / 3) * Math.sin(rad);
    const a02 = Math.cos(rad) + (1.0 - Math.cos(rad)) * Math.sqrt(1 / 3);

    const nullify = index => {
      this.matrix[index] -= this._hueMatrix[index];
    };

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

  // Sat
  public updateSat(sat: Colors): void {
    this.mem.compareSat(sat);
  }

  private updateSatRed(sat: Colors): void {
    const x = (sat.red * 2) / 3 + 1;
    const y = (x - 1) * -0.5;

    const nullify = index => {
      this.matrix[index] -= this._satMatrix[index];
    };

    nullify(0);
    this.matrix[0] += x;
    this._satMatrix[0] = x;

    nullify(1);
    this.matrix[1] += y;
    this._satMatrix[1] = y;

    nullify(2);
    this.matrix[2] += y;
    this._satMatrix[2] = y;
  }

  private updateSatGreen(sat: Colors): void {
    const x = (sat.green * 2) / 3 + 1;
    const y = (x - 1) * -0.5;

    const nullify = index => {
      this.matrix[index] -= this._satMatrix[index];
    };

    nullify(5);
    this.matrix[5] += y;
    this._satMatrix[5] = y;

    nullify(6);
    this.matrix[6] += x;
    this._satMatrix[6] = x;

    nullify(7);
    this.matrix[7] += y;
    this._satMatrix[7] = y;
  }

  private updateSatBlue(sat: Colors): void {
    const x = (sat.blue * 2) / 3 + 1;
    const y = (x - 1) * -0.5;

    const nullify = index => {
      this.matrix[index] -= this._satMatrix[index];
    };

    nullify(10);
    this.matrix[10] += y;
    this._satMatrix[10] = y;

    nullify(11);
    this.matrix[11] += y;
    this._satMatrix[11] = y;

    nullify(12);
    this.matrix[12] += x;
    this._satMatrix[12] = x;
  }

  // Brt

  public updateBrt(brt: Colors): void {
    this.mem.compareBrt(brt);
  }

  private updateBrtRed(brt: Colors): void {
    const nullify = index => {
      this.matrix[index] -= this._brtMatrix[index];
    };

    nullify(0);
    this.matrix[0] += brt.red;
    this._brtMatrix[0] = brt.red;
  }

  private updateBrtGreen(brt: Colors): void {
    const nullify = index => {
      this.matrix[index] -= this._brtMatrix[index];
    };

    nullify(6);
    this.matrix[6] += brt.green;
    this._brtMatrix[6] = brt.green;
  }

  private updateBrtBlue(brt: Colors): void {
    const nullify = index => {
      this.matrix[index] -= this._brtMatrix[index];
    };

    nullify(12);
    this.matrix[12] += brt.blue;
    this._brtMatrix[12] = brt.blue;
  }

  // Con

  public updateCon(con: Colors): void {
    this.mem.compareCon(con);
  }

  private updateConRed(con: Colors): void {
    const v = con.red + 1;
    const o = -0.5 * (v - 1);

    const nullify = index => {
      this.matrix[index] -= this._conMatrix[index];
    };

    nullify(0);
    this.matrix[0] += v;
    this._conMatrix[0] = v;

    nullify(4);
    this.matrix[4] += o;
    this._conMatrix[4] = o;
  }

  private updateConGreen(con: Colors): void {
    const v = con.green + 1;
    const o = -0.5 * (v - 1);

    const nullify = index => {
      this.matrix[index] -= this._conMatrix[index];
    };

    nullify(6);
    this.matrix[6] += v;
    this._conMatrix[6] = v;

    nullify(9);
    this.matrix[9] += o;
    this._conMatrix[9] = o;
  }

  private updateConBlue(con: Colors): void {
    const v = con.blue + 1;
    const o = -0.5 * (v - 1);

    const nullify = index => {
      this.matrix[index] -= this._conMatrix[index];
    };

    nullify(12);
    this.matrix[12] += v;
    this._conMatrix[12] = v;

    nullify(14);
    this.matrix[14] += o;
    this._conMatrix[14] = o;
  }

  /**
   * Initialize the matrix with these starting values
   * @param hue Degrees from 0 - 360
   * @param sat Value starting 1 and to any direction
   * @param brt Value starting 1 and to any direction
   * @param con Not quire sure
   */
  public init(hue: Colors, sat: Colors, brt: Colors, con: Colors) {
    this.mem.initHue(hue);
    this.mem.initSat(sat);
    this.mem.initBrt(brt);
    this.mem.initCon(con);
  }
}
