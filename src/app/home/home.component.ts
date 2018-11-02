import { Component, OnInit } from "@angular/core";
import { MatrixService } from "../services/matrix.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // Hue
  private _masterHue: number = 0;
  private _redHue: number = 0;
  private _blueHue: number = 0;
  private _greenHue: number = 0;

  public hueOverrides = {
    redHue: false,
    blueHue: false,
    greenHue: false
  };

  public activeTool: string = "hue";
  public viewState: string = "standard";

  // Expanding Vars
  public toolsExpanded: boolean = true;
  public outputExpanded: boolean = true;

  constructor(public matrixService: MatrixService) {}

  ngOnInit() {}

  public toggle(attr: string, value?: any): void {
    if (value) {
      this[attr] = value;
    } else {
      this[attr] = !this[attr];
    }
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

  // Setters
  public set masterHue(value: number) {
    this._masterHue = value;

    Object.keys(this.hueOverrides).forEach(key => {
      if (!this.hueOverrides[key]) {
        this[key] = value;
      }
    });

    this.matrixService.updateHue(this.redHue, this.greenHue, this.blueHue);
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
}
