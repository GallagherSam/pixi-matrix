import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Colors } from "../interfaces/colors.interface";
import { MemoryMessage } from '../interfaces/memory-message.interface';
import { IProp } from '../enums/prop.enum';
import { IColors } from '../enums/colors.enum';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  public events: Subject<MemoryMessage> = new Subject();

  public hue: Colors = {
    red: null,
    green: null,
    blue: null
  }

  constructor() { }

  public compareHue(hue: Colors) {

    // R
    if (hue.red !== this.hue.red) {
      this.hue.red = hue.red;
      this.events.next({prop: IProp.HUE, color: IColors.RED});
    }

    // G
    if (hue.green !== this.hue.green) {
      this.hue.green = hue.green;
      this.events.next({prop: IProp.HUE, color: IColors.GREEN});
    }
    
    // B
    if (hue.blue !== this.hue.blue) {
      this.hue.blue = hue.blue;
      this.events.next({prop: IProp.HUE, color: IColors.BLUE});
    }

  }

  public initHue(hue: Colors) {
    this.hue.red = hue.red;
    this.hue.green = hue.green;
    this.hue.blue = hue.blue;
  }
}
