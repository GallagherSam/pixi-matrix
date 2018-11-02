import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Hue
  private _masterHue: number = 0;
  public redHue: number = 0;
  public blueHue: number = 0;
  public greenHue: number = 0;

  public hueOverrides = {
    redHue: false,
    blueHue: false,
    greenHue: false
  }

  public activeTool: string = "hue";
  public viewState: string = 'standard';

  // Expanding Vars
  public toolsExpanded: boolean = true;
  public outputExpanded: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  public toggle(attr: string, value?: any): void {
    if (value) {
      this[attr] = value;
    } else {
      this[attr] = !this[attr];
    }
  }

  // Setters
  public set masterHue(value: number) {
    this._masterHue = value;

    Object.keys(this.hueOverrides).forEach(key => {
      if (!this.hueOverrides[key]) {
        this[key] = value;
      }
    })

  }

  // Getters
  public get masterHue(): number {
    return this._masterHue;
  }

}
