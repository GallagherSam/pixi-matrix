import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Colors } from '../interfaces/colors.interface';
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
  };

  public sat: Colors = {
    red: null,
    green: null,
    blue: null
  };

  public brt: Colors = {
    red: null,
    green: null,
    blue: null
  };

  public con: Colors = {
    red: null,
    green: null,
    blue: null
  };

  constructor() {}

  public compareHue(hue: Colors) {
    // R
    if (hue.red !== this.hue.red) {
      this.hue.red = hue.red;
      this.events.next({ prop: IProp.HUE, color: IColors.RED });
    }

    // G
    if (hue.green !== this.hue.green) {
      this.hue.green = hue.green;
      this.events.next({ prop: IProp.HUE, color: IColors.GREEN });
    }

    // B
    if (hue.blue !== this.hue.blue) {
      this.hue.blue = hue.blue;
      this.events.next({ prop: IProp.HUE, color: IColors.BLUE });
    }
  }

  public compareSat(sat: Colors) {
    if (sat.red !== this.sat.red) {
      this.sat.red = sat.red;
      this.events.next({ prop: IProp.SAT, color: IColors.RED });
    }

    if (sat.green !== this.sat.green) {
      this.sat.green = sat.green;
      this.events.next({ prop: IProp.SAT, color: IColors.GREEN });
    }

    if (sat.blue !== this.sat.blue) {
      this.sat.blue = sat.blue;
      this.events.next({ prop: IProp.SAT, color: IColors.BLUE });
    }
  }

  public compareBrt(brt: Colors) {
    if (brt.red !== this.brt.red) {
      this.brt.red = brt.red;
      this.events.next({ prop: IProp.BRT, color: IColors.RED });
    }

    if (brt.green !== this.brt.green) {
      this.brt.green = brt.green;
      this.events.next({ prop: IProp.BRT, color: IColors.GREEN });
    }

    if (brt.blue !== this.brt.blue) {
      this.brt.blue = brt.blue;
      this.events.next({ prop: IProp.BRT, color: IColors.BLUE });
    }
  }

  public compareCon(con: Colors) {
    if (con.red !== this.con.red) {
      this.con.red = con.red;
      this.events.next({ prop: IProp.CON, color: IColors.RED });
    }

    if (con.green !== this.con.green) {
      this.con.green = con.green;
      this.events.next({ prop: IProp.CON, color: IColors.GREEN });
    }

    if (con.blue !== this.con.blue) {
      this.con.blue = con.blue;
      this.events.next({ prop: IProp.CON, color: IColors.BLUE });
    }
  }

  public initHue(hue: Colors) {
    this.hue.red = hue.red;
    this.hue.green = hue.green;
    this.hue.blue = hue.blue;
  }

  public initSat(sat: Colors) {
    this.sat.red = sat.red;
    this.sat.green = sat.green;
    this.sat.blue = sat.blue;
  }

  public initBrt(brt: Colors) {
    this.brt.red = brt.red;
    this.brt.green = brt.green;
    this.brt.blue = brt.blue;
  }

  public initCon(con: Colors) {
    this.con.red = con.red;
    this.con.green = con.green;
    this.con.blue = con.blue;
  }
}
