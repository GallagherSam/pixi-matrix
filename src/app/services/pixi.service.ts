import { Injectable, ViewChild } from '@angular/core';
import { MatrixService } from './matrix.service';
import { Subject } from 'rxjs';
import { View } from '../enums/view.enum';

declare var PIXI: any;

@Injectable({
  providedIn: 'root'
})
export class PixiService {
  public viewChange$: Subject<any> = new Subject();
  public app: any;

  private car: any;
  private overlay: any;
  private comparision: any;

  constructor(private matrixService: MatrixService) {
    this.viewChange$.subscribe((e: View) => {
      if (e === View.STANDARD) {
        this.standardView();
      } else if (e === View.COMPARISION) {
        this.comparisionView();
      }
    });
  }

  private standardView() {
    const height = this.car.height;
    const width = this.car.width;

    const point = {
      x: 800 / 2 - width / 2,
      y: 800 / 2 - height / 2
    };

    if (this.car) {
      this.car.position = point;
    }

    if (this.overlay) {
      this.overlay.position = point;
    }

    if (this.comparision) {
      this.comparision.alpha = 0;
    }

    console.log(this.car);
  }

  private comparisionView() {
    // Move the car and overlay to the top
    const topPoint = {
      x: 0,
      y: 0
    };

    if (this.car) {
      this.car.position = topPoint;
    }

    if (this.overlay) {
      this.overlay.position = topPoint;
    }

    // Move the comparision to the bottom
    const bottomPoint = {
      x: 0,
      y: 400
    };

    if (this.comparision) {
      this.comparision.position = bottomPoint;
      this.comparision.alpha = 1;
    }
  }

  public initPixi(element: any): void {
    this.app = new PIXI.Application({
      width: 800,
      height: 800,
      transparent: true
    });
    element.nativeElement.appendChild(this.app.view);
  }

  private startTicker(): void {
    this.app.ticker.add(d => {
      const colorMatrix = new PIXI.filters.ColorMatrixFilter();
      colorMatrix.matrix = this.matrixService.matrix;
      this.car.filters = [colorMatrix];
    });
  }

  public loadCarBase(e: any): void {
    const loader = PIXI.loader;
    const img = new Image();
    img.src = e.target.result;

    const baseTex = new PIXI.BaseTexture(img);
    const tex = new PIXI.Texture(baseTex);

    // Set timeout so the texture is loaded
    setTimeout(() => {
      // We want the sprite to fit in the bounds of the box (800, 800);
      let height, width;
      if (baseTex.width > baseTex.height) {
        width = 800;
        height = 800 * (baseTex.height / baseTex.width);
      } else {
        height = 800;
        width = 800 * (baseTex.width / baseTex.height);
      }

      // Get the position coordinates to center the sprite
      const point = {
        x: 800 / 2 - width / 2,
        y: 800 / 2 - height / 2
      };

      PIXI.Texture.addToCache(tex, 'sprite');

      this.car = PIXI.Sprite.fromImage('sprite');
      this.car.height = height;
      this.car.width = width;
      this.car.position = point;

      this.app.stage.addChild(this.car);

      // Start the ticker
      this.startTicker();
    });
  }

  public loadCarOverlay(e: any): void {
    const loader = PIXI.loader;
    const img = new Image();
    img.src = e.target.result;

    const baseTex = new PIXI.BaseTexture(img);
    const tex = new PIXI.Texture(baseTex);
    PIXI.Texture.addToCache(tex, 'overlay');

    // Set timeout so the texture is loaded
    setTimeout(() => {
      // We want the sprite to fit in the bounds of the box (800, 800);
      let height, width;
      if (baseTex.width > baseTex.height) {
        width = 800;
        height = 800 * (baseTex.height / baseTex.width);
      } else {
        height = 800;
        width = 800 * (baseTex.width / baseTex.height);
      }

      // Get the position coordinates to center the sprite
      const point = {
        x: 800 / 2 - width / 2,
        y: 800 / 2 - height / 2
      };

      PIXI.Texture.addToCache(tex, 'overlay');

      this.overlay = PIXI.Sprite.fromImage('overlay');
      this.overlay.height = height;
      this.overlay.width = width;
      this.overlay.position = point;

      this.app.stage.addChild(this.overlay);
    });
  }

  public loadComparision(e: any): void {
    const loader = PIXI.loader;
    const img = new Image();
    img.src = e.target.result;

    const baseTex = new PIXI.BaseTexture(img);
    const tex = new PIXI.Texture(baseTex);
    PIXI.Texture.addToCache(tex, 'comparision');

    // Set timeout so the texture is loaded
    setTimeout(() => {
      // We want the sprite to fit in the bounds of the box (800, 800);
      let height, width;
      if (baseTex.width > baseTex.height) {
        width = 800;
        height = 800 * (baseTex.height / baseTex.width);
      } else {
        height = 800;
        width = 800 * (baseTex.width / baseTex.height);
      }

      // Get the position coordinates to center the sprite
      const point = {
        x: 800 / 2 - width / 2,
        y: 800 / 2 - height / 2
      };

      PIXI.Texture.addToCache(tex, 'comparision');

      this.comparision = PIXI.Sprite.fromImage('comparision');
      this.comparision.height = height;
      this.comparision.width = width;
      this.comparision.alpha = 0;

      this.app.stage.addChild(this.comparision);
    });
  }
}
