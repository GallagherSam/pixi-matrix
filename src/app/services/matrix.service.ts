import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private _matrix: number[] = [
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

  constructor() {}

  public updateHue(red: number, green: number, blue: number): void {
    // Transformation matrix
    const matrix: number[] = [
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

    // R
    if (red !== 0) {
      const rotation = (red / 180) * Math.PI;
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      const w = 1 / 3;
      const sqrW = Math.sqrt(w);

      matrix[0] = cosR + (1.0 - cosR) * w;
      matrix[1] = w * (1.0 - cosR) - sqrW * sinR;
      matrix[2] = w * (1.0 - cosR) - sqrW * sinR;
    }

    // G
    if (green !== 0) {
      const rotation = (green / 180) * Math.PI;
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      const w = 1 / 3;
      const sqrW = Math.sqrt(w);

      matrix[5] = w * (1.0 - cosR) - sqrW * sinR;
      matrix[6] = cosR + (1.0 - cosR) * w;
      matrix[7] = w * (1.0 - cosR) - sqrW * sinR;
    }

    // B
    if (blue !== 0) {
      const rotation = (blue / 180) * Math.PI;
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      const w = 1 / 3;
      const sqrW = Math.sqrt(w);

      matrix[10] = w * (1.0 - cosR) - sqrW * sinR;
      matrix[11] = w * (1.0 - cosR) - sqrW * sinR;
      matrix[12] = cosR + (1.0 - cosR) * w;
    }

    this.matrix = matrix;
  }

  public updateSat(red: number, green: number, blue: number): void {
    // Transformation matrix
    const matrix: number[] = [
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

    // R
    const rX = (red * 2) / 3 + 1;
    const rY = (rX - 1) * -0.5;
    matrix[0] = rX;
    matrix[1] = rY;
    matrix[2] = rY;

    this.matrix = matrix;
  }

  // Multiplication Method
  private multiply(matrix: number[]): number[] {
    let outputMatrix = Array(20).fill(0);
    let currentMatrix = Object.assign([], this._matrix);

    if (matrix === currentMatrix) {
      outputMatrix = currentMatrix;
    } else {
      const diffMatrix = matrix.map((newCell, index) => {
        return currentMatrix[index] - newCell;
      });
      currentMatrix = diffMatrix.map((value, index) => {
        return currentMatrix[index] - value;
      });
      outputMatrix = currentMatrix;
    }

    return outputMatrix;
  }

  // Getters
  public get matrix(): number[] {
    return this._matrix;
  }

  // Setters
  public set matrix(value: number[]) {
    const matrix = this.multiply(value);
    this._matrix = matrix;
  }
}
