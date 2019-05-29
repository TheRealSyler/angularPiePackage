import { PieSlice } from './pie-slice';
import { PieOptions } from './pie-options';
import { Injectable } from '@angular/core';
import { PieSliceInternal } from './pie-slice-internal';

@Injectable({
  providedIn: 'root'
})
export class AngularPieService {
  /**
   * INTERNAL
   */
  x: number;
  /**
   * INTERNAL
   */
  y: number;
  /**
   * INTERNAL
   */
  show = false;
  private activated = false;
  private selected = 0;
  private active = 0;
  /**
   * INTERNAL
   */
  innerCircleZindex = 2100;
  /**
   * INTERNAL
   */
  slices: PieSliceInternal[] = [];
  /**
   * INTERNAL
   */
  options: PieOptions = {
    borderColor: '#334157',
    borderColorHover: '#517197',
    borderWidth: 2,
    borderRadius: 12,
    color: '#151619',
    colorHover: '#334157',
    colorActive: '#5595ee',
    circleBorderColor: '#151619',
    circleBackgroundColor: '#00000000',
    circleBorderWidth: 2,
    oneActiveColor: true,
    font: 'Verdana',
    fontSize: 1,
    size: 180,
    circleSize: 80,
    sliceX: 100,
    sliceY: 24,
    hideDelay: 200,
    round: false,
    selectionDistance: 40,
    activationDistance: 60,
    activationColorDistance: 55,
    activateAfterActivationDistance: false,
    disableInnerMouseleaveActivation: true,
    disableMouseUpActivation: true,
    disableCircleMousedownActvivation: true,
    disableOuterActivation: false,
    disableInnnerMouseup: false
  };
  private emptySlice: PieSlice = {
    title: '',
    func: '',
    args: [],
    context: null,
    imgData: { src: '', left: 0, top: 0, height: 0, width: 0 },
    disableImg: true
  };
  constructor() {}
  /**
   * calls pie menu.
   * @param event mouse event.
   * @param pieSlices array that contains data for each slice.
   * @param context probably this.
   */
  public call(event: MouseEvent, pieSlices: PieSlice[], options: PieOptions) {
    if (!this.show) {
      this.activated = false;
      this.innerCircleZindex = 2100;
      this.setOptions(options);
      this.setPiePostition(event);
      this.generateContent(pieSlices);
      this.setColors();
      this.show = true;
    }
  }
  private setOptions(options) {
    if (options) {
      for (const [key] of Object.entries(this.options)) {
        if (options[key]) {
          this.options[key] = options[key];
        }
      }
    }
  }
  private setColors() {
    this.slices.forEach((slice, index) => {
      if (!this.activated) {
        if (this.selected === index + 1) {
          this.slices[index].borderColor = this.options.borderColorHover;
          this.slices[index].color = this.options.colorHover;
        } else {
          this.slices[index].borderColor = this.options.borderColor;
          this.slices[index].color = this.options.color;
        }
      }
      if (this.active === index + 1) {
        this.slices[index].color = this.options.colorActive;
        if (this.options.oneActiveColor) {
          this.slices[index].borderColor = this.options.colorActive;
        }
      }
    });
  }
  private setPiePostition(event) {
    if (event.clientX < this.options.size / 2) {
      this.x = 0;
    } else if (event.clientX + this.options.size / 2 > window.innerWidth) {
      this.x = window.innerWidth - this.options.size;
    } else {
      this.x = event.clientX - this.options.size / 2;
    }

    if (event.clientY < this.options.size / 2) {
      this.y = 0;
    } else if (event.clientY + this.options.size / 2 > window.innerHeight) {
      this.y = window.innerHeight - this.options.size;
    } else {
      this.y = event.clientY - this.options.size / 2;
    }
    this.selected = 0;
    this.active = 0;
  }
  private generateContent(pieContent) {
    this.slices = [];
    const length = pieContent.length;
    const center = {
      x: this.options.size / 2,
      y: this.options.size / 2
    };
    const point = {
      x: this.options.size / 10,
      y: this.options.size / 2
    };
    const angle = 360 / length;
    const radiansAngle = angle * (Math.PI / 180);
    pieContent.forEach((item, index) => {
      const pos = {
        x:
          Math.cos(radiansAngle * index) * (point.x - center.x) -
          Math.sin(radiansAngle * index) * (point.y - center.y) +
          center.x -
          this.options.sliceX / 2,
        y:
          Math.sin(radiansAngle * index) * (point.x - center.x) +
          Math.cos(radiansAngle * index) * (point.y - center.y) +
          center.y -
          this.options.sliceY / 2
      };
      let xAddition = pos.x - center.x + this.options.sliceX / 2;
      let yAddition = (pos.y - center.y + this.options.sliceY / 2) / 6;
      if (this.options.round) {
        xAddition = 0;
        yAddition = 0;
      }
      for (const [key] of Object.entries(this.emptySlice)) {
        if (item[key] === undefined) {
          item[key] = this.emptySlice[key];
        }
      }
      this.slices.push({
        content: item,
        borderColor: this.options.borderColor,
        color: this.options.color,
        index: index + 1,
        x: pos.x + xAddition,
        y: pos.y + yAddition
      });
    });
  }
  private getDirection(event): number {
    if (!this.activated) {
      const xDiff = this.x + this.options.size / 2 - event.clientX;
      const yDiff = this.y + this.options.size / 2 - event.clientY;
      const distance = xDiff * xDiff + yDiff * yDiff; // < 5*5 === True if within 5px distance
      let angle = (Math.atan2(yDiff, xDiff) * 180) / Math.PI;
      if (angle < 0) {
        angle = 360 + angle;
      }
      const sliceSelectionRangeInDeg = 360 / this.slices.length;

      if (distance > this.options.selectionDistance * this.options.selectionDistance) {
        let tempReturn = 0;
        this.slices.forEach((item, index) => {
          if (index === 0) {
            if (angle < sliceSelectionRangeInDeg / 2 || angle > 360 - sliceSelectionRangeInDeg / 2) {
              tempReturn = 1;
              return;
            }
          } else {
            if (
              angle > sliceSelectionRangeInDeg * index - sliceSelectionRangeInDeg / 2 &&
              angle < sliceSelectionRangeInDeg * index + sliceSelectionRangeInDeg / 2
            ) {
              tempReturn = index + 1;
              return;
            }
          }
        });
        if (this.options.activateAfterActivationDistance) {
          if (distance > this.options.activationColorDistance * this.options.activationColorDistance) {
            this.active = tempReturn;
          }
          if (distance > this.options.activationDistance * this.options.activationDistance) {
            this.active = tempReturn;
            this.executeActivate();
            return null;
          }
          return tempReturn;
        } else {
          this.active = 0;
          return tempReturn;
        }
      } else {
        this.active = 0;
        return 0;
      }
    } else {
      return this.active;
    }
  }
  /**
   * INTERNAL
   */
  activate(event) {
    if (!this.activated) {
      const direction = this.getDirection(event);
      if (direction !== null) {
        this.active = direction;
        this.executeActivate();
      }
    }
  }
  private executeActivate() {
    this.activated = true;
    this.setColors();
    if (this.active !== 0) {
      const { func, args, context } = this.slices[this.active - 1].content;
      this.executeFunctionByName(func, context, args);
    }
    setTimeout(() => {
      this.show = false;
    }, this.options.hideDelay);
  }
  /**
   * INTERNAL
   */
  deactivate() {
    setTimeout(() => {
      this.show = false;
    }, this.options.hideDelay);
  }
  /**
   * INTERNAL
   */
  mouseUp(event) {
    if (!this.options.disableMouseUpActivation) {
      const direction = this.getDirection(event);
      if (direction === 0 || this.selected !== 0) {
        this.activate(event);
      }
    }
  }
  /**
   * INTERNAL
   */
  circleMouseUp(event) {
    if (!this.options.disableInnnerMouseup) {
      this.activate(event);
    }
  }
  /**
   * INTERNAL
   */
  circleMousedown() {
    if (this.options.disableCircleMousedownActvivation) {
      this.deactivate();
    }
  }
  /**
   * INTERNAL
   */
  outerActivationCircle(event) {
    if (!this.options.disableOuterActivation) {
      this.activate(event);
    }
  }
  /**
   * INTERNAL
   */
  circleMouseleave(event) {
    if (!this.options.disableInnerMouseleaveActivation) {
      this.activate(event);
    } else {
      this.innerCircleZindex = 2025;
    }
  }
  /**
   * INTERNAL
   */
  setActiveColor(event) {
    const direction = this.getDirection(event) - 1;
    if (this.slices[direction]) {
      this.slices[direction].color = this.options.colorActive;
      if (this.options.oneActiveColor) {
        this.slices[direction].borderColor = this.options.colorActive;
      }
    }
  }
  /**
   * INTERNAL
   */
  select(event) {
    this.selected = this.getDirection(event);
    this.setColors();
  }
  /**
   * calls a function based on a function name and context.
   * @param functionName function Name Examlpe: 'example.function'
   * @param context probably this
   * @param args function arguments Example arguments:  [ 'example string', 123, { example: ['object'] } ]
   */
  public executeFunctionByName(functionName: string, context: this, args: any[]) {
    if (context !== null) {
      const namespaces: string[] = functionName.split('.');
      const func = namespaces.pop();
      for (const i of namespaces) {
        context = context[namespaces[i]];
      }
      if (context[func]) {
        return context[func].apply(context, args);
      }
    }
  }
}
