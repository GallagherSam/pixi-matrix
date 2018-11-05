import { Component, OnInit, ViewChild } from '@angular/core';
import { MatrixService } from '../services/matrix.service';

declare var PIXI: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Pixi
  @ViewChild('pixiContainer')
  pixiContainer;
  public app: any;
  public sprite;

  // Hue
  private _masterHue = 0;
  private _redHue = 0;
  private _blueHue = 0;
  private _greenHue = 0;

  public hueOverrides = {
    redHue: false,
    blueHue: false,
    greenHue: false
  };

  // Sat
  private _masterSat = 0;
  private _redSat = 0;
  private _greenSat = 0;
  private _blueSat = 0;

  public satOverrides = {
    redSat: false,
    blueSat: false,
    greenSat: false
  };

  public activeTool = 'hue';
  public viewState = 'standard';

  // Expanding Vars
  public toolsExpanded = true;
  public outputExpanded = true;
  public sidenavState = false;

  constructor(public matrixService: MatrixService) {}

  ngOnInit() {
    this.app = new PIXI.Application({
      width: 800,
      height: 800,
      transparent: true
    });
    this.pixiContainer.nativeElement.appendChild(this.app.view);

    // Initalize the matrix
    this.matrixService.init({ red: 0, green: 0, blue: 0 }, {}, {}, {});

    // Interval to update matrix
    setInterval(() => {
      console.log("tick");
      this.matrixService.updateHue({red: this._redHue, green: this._greenHue, blue: this._blueHue});
      console.log(this.matrixService.matrix);
    }, 25);

    // DEV
    setTimeout(() => {
      this._redHue = 180;
      this._greenHue = 180;
      this._blueHue = 180;
    }, 250);
    setTimeout(() => {
      this._redHue = 0;
      this._greenHue = 0;
      this._blueHue = 0;
    }, 1000);
  }

  public toggle(attr: string, value?: any): void {
    if (value) {
      this[attr] = value;
    } else {
      this[attr] = !this[attr];
    }
  }

  // PIXI functions
  private setupScene(e): void {
    const loader = PIXI.loader;
    const img = new Image();
    img.src = e.target.result;

    const baseTex = new PIXI.BaseTexture(img);
    const tex = new PIXI.Texture(baseTex);
    PIXI.Texture.addToCache(tex, 'sprite');

    this.sprite = PIXI.Sprite.fromImage('sprite');
    this.sprite.scale.set(0.5, 0.5);

    this.app.stage.addChild(this.sprite);
    this.startTicker();
  }

  private startTicker(): void {
    this.app.ticker.add(d => {
      const colorMatrix = new PIXI.filters.ColorMatrixFilter();
      colorMatrix.matrix = this.matrixService.matrix;
      this.sprite.filters = [colorMatrix];
    });
  }

  private addOverlayImage(e): void {
    const loader = PIXI.loader;
    const img = new Image();
    img.src = e.target.result;

    const baseTex = new PIXI.BaseTexture(img);
    const tex = new PIXI.Texture(baseTex);
    PIXI.Texture.addToCache(tex, 'overlay');

    const overlay = PIXI.Sprite.fromImage('overlay');
    overlay.scale.set(0.5, 0.5);

    this.app.stage.addChild(overlay);
  }

  // Sidebar Functions
  public chooseSpriteImage(): void {
    const element = document.getElementById('spriteInput');
    element.click();
    this.sidenavState = false;
  }

  public chooseSpriteImageListener(ev): void {
    const reader = new FileReader();
    reader.onload = e => {
      console.log('loaded');
      this.setupScene(e);
    };
    reader.readAsDataURL(ev.target.files[0]);
  }

  public chooseOverlayImage(): void {
    const element = document.getElementById('overlayInput');
    element.click();
    this.sidenavState = false;
  }

  public chooseOverlayImageListener(ev): void {
    const reader = new FileReader();
    reader.onload = e => {
      console.log('loaded');
      this.addOverlayImage(e);
    };
    reader.readAsDataURL(ev.target.files[0]);
  }

  // Getters
  public get masterHue(): number {
    return this._masterHue;
  }

  public get redHue(): number {
    return this._redHue;
  }

  public get greenHue(): number {
    return this._greenHue;
  }

  public get blueHue(): number {
    return this._blueHue;
  }

  public get masterSat(): number {
    return this._masterSat;
  }

  public get redSat(): number {
    return this._masterSat;
  }

  public get greenSat(): number {
    return this._masterSat;
  }

  public get blueSat(): number {
    return this._masterSat;
  }

  // Setters
  public set masterHue(value: number) {
    this._masterHue = value;

    Object.keys(this.hueOverrides).forEach(key => {
      if (!this.hueOverrides[key]) {
        this[key] = value;
      }
    });
  }

  public set redHue(value: number) {
    this._redHue = value;
  }

  public set greenHue(value: number) {
    this._greenHue = value;
  }

  public set blueHue(value: number) {
    this._blueHue = value;
  }

  public set masterSat(value: number) {
    this._masterSat = value;

    Object.keys(this.satOverrides).forEach(key => {
      if (!this.satOverrides[key]) {
        this[key] = value;
      }
    });
  }

  public set redSat(value: number) {
    this._redSat = value;
  }

  public set greenSat(value: number) {
    this._greenSat = value;
  }

  public set blueSat(value: number) {
    this._blueSat = value;
  }
}
