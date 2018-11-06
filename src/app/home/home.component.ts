import { Component, OnInit, ViewChild } from '@angular/core';
import { MatrixService } from '../services/matrix.service';
import { PixiService } from '../services/pixi.service';
import { View } from '../enums/view.enum';

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

  // Brt
  private _masterBrt = 1;
  private _redBrt = 1;
  private _greenBrt = 1;
  private _blueBrt = 1;

  public brtOverrides = {
    redBrt: false,
    greenBrt: false,
    blueBrt: false
  };

  // Con
  private _masterCon = 0;
  private _redCon = 0;
  private _greenCon = 0;
  private _blueCon = 0;

  public conOverrides = {
    redCon: false,
    greenCon: false,
    blueCon: false
  };

  public activeTool = 'hue';
  public viewState = 'standard';

  // Expanding Vars
  public toolsExpanded = true;
  public outputExpanded = true;
  public sidenavState = false;

  constructor(
    public matrixService: MatrixService,
    public pixiService: PixiService
  ) {}

  ngOnInit() {
    this.pixiService.initPixi(this.pixiContainer);

    // Initalize the matrix
    this.matrixService.init(
      { red: 0, green: 0, blue: 0 },
      { red: 0, green: 0, blue: 0 },
      { red: 0, green: 0, blue: 0 },
      { red: 0, green: 0, blue: 0 }
    );

    // Interval to update matrix
    setInterval(() => {
      this.matrixService.updateHue({
        red: this._redHue,
        green: this._greenHue,
        blue: this._blueHue
      });
      this.matrixService.updateSat({
        red: this._redSat,
        green: this._greenSat,
        blue: this._blueSat
      });
      this.matrixService.updateBrt({
        red: this._redBrt,
        green: this._greenBrt,
        blue: this._blueBrt
      });
      this.matrixService.updateCon({
        red: this._redCon,
        green: this._greenCon,
        blue: this._blueCon
      });
    }, 100);
  }

  public toggle(attr: string, value?: any): void {
    if (value) {
      this[attr] = value;
    } else {
      this[attr] = !this[attr];
    }

    // View specific functionality
    if (attr === 'viewState') {
      if (value === 'standard') {
        this.pixiService.viewChange$.next(View.STANDARD);
      } else {
        this.pixiService.viewChange$.next(View.COMPARISION);
      }
    }
  }

  public resetMatrix(): void {
    this.masterHue = 0;
    this.masterSat = 0;
    this.masterBrt = 0;
    this.masterCon = 0;

    const reset = item => {
      Object.keys(item).forEach(key => {
        this[key] = 0;
      });
    };

    reset(this.hueOverrides);
    reset(this.satOverrides);
    reset(this.brtOverrides);
    reset(this.conOverrides);

    this.matrixService.resetMatrix();
  }

  public downloadMatrix(): void {
    const obj = {
      hue: {
        red: this.redHue,
        green: this.greenHue,
        blue: this.blueHue
      },
      sat: {
        red: this.redSat,
        green: this.greenSat,
        blue: this.blueSat
      },
      brt: {
        red: this.redBrt,
        green: this.greenBrt,
        blue: this.blueBrt
      },
      con: {
        red: this.redCon,
        green: this.greenCon,
        blue: this.blueCon
      },
      matrix: this.matrixService.matrix
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj));
    const elm = document.getElementById('downloadAnchorElem');
    elm.setAttribute('href', dataStr);
    elm.setAttribute('download', 'matrix.json');
    elm.click();
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
      this.pixiService.loadCarBase(e);
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
      this.pixiService.loadCarOverlay(e);
    };
    reader.readAsDataURL(ev.target.files[0]);
  }

  public chooseComparisionImage(): void {
    const element = document.getElementById('comparisionInput');
    element.click();
    this.sidenavState = false;
  }

  public chooseComparisionImageListener(ev): void {
    const reader = new FileReader();
    reader.onload = e => {
      this.pixiService.loadComparision(e);
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
    return this._redSat;
  }

  public get greenSat(): number {
    return this._greenSat;
  }

  public get blueSat(): number {
    return this._blueSat;
  }

  public get masterBrt(): number {
    return this._masterBrt;
  }

  public get redBrt(): number {
    return this._redBrt;
  }

  public get greenBrt(): number {
    return this._greenBrt;
  }

  public get blueBrt(): number {
    return this._blueBrt;
  }

  public get masterCon(): number {
    return this._masterCon;
  }

  public get redCon(): number {
    return this._redCon;
  }

  public get greenCon(): number {
    return this._greenCon;
  }

  public get blueCon(): number {
    return this._blueCon;
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

  public set masterBrt(value: number) {
    this._masterBrt = value;

    Object.keys(this.brtOverrides).forEach(key => {
      if (!this.brtOverrides[key]) {
        this[key] = value;
      }
    });
  }

  public set redBrt(value: number) {
    this._redBrt = value;
  }

  public set greenBrt(value: number) {
    this._greenBrt = value;
  }

  public set blueBrt(value: number) {
    this._blueBrt = value;
  }

  public set masterCon(value: number) {
    this._masterCon = value;

    Object.keys(this.conOverrides).forEach(key => {
      if (!this.conOverrides[key]) {
        this[key] = value;
      }
    });
  }

  public set redCon(value: number) {
    this._redCon = value;
  }

  public set greenCon(value: number) {
    this._greenCon = value;
  }

  public set blueCon(value: number) {
    this._blueCon = value;
  }
}
