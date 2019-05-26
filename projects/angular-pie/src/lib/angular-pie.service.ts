import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularPieService {
  x: number;
  y: number;
  sliceX = 100;
  sliceY = 24;
  show = false;
  size = 180;
  innerSize = 80;
  selected = 0;
  active = 0;
  content = [];
  slices = [];

  constructor() {}

  public call(event, pieContent) {
    if (event.which === 1) {
      this.setPiePostition(event);
      this.generateContent(pieContent);
      this.show = true;
    }
  }
  private setPiePostition(event) {
    if (event.clientX < this.size / 2) {
      this.x = 0;
    } else if (event.clientX + this.size / 2 > window.innerWidth) {
      this.x = window.innerWidth - this.size;
    } else {
      this.x = event.clientX - this.size / 2;
    }

    if (event.clientY < this.size / 2) {
      this.y = 0;
    } else if (event.clientY + this.size / 2 > window.innerHeight) {
      this.y = window.innerHeight - this.size;
    } else {
      this.y = event.clientY - this.size / 2;
    }
    this.selected = 0;
    this.active = 0;
  }
  private generateContent(pieContent) {
    this.content = [];
    this.slices = [];
    const length = pieContent.length;
    const center = {
      x: this.size / 2,
      y: this.size / 2
    };
    const point = {
      x: this.size / 10,
      y: this.size / 2
    };

    const angle = 360 / length;
    const radiansAngle = angle * (Math.PI / 180);
    pieContent.forEach((item, index) => {
      const pos = {
        x:
          Math.cos(radiansAngle * index) * (point.x - center.x) -
          Math.sin(radiansAngle * index) * (point.y - center.y) +
          center.x -
          this.sliceX / 2,
        y:
          Math.sin(radiansAngle * index) * (point.x - center.x) +
          Math.cos(radiansAngle * index) * (point.y - center.y) +
          center.y -
          this.sliceY / 2
      };
      const xAddition = pos.x - center.x + this.sliceX / 2;
      const yAddition = (pos.y - center.y + this.sliceY / 2) / 6;
      this.content.push({
        content: item,
        index: index + 1,
        x: pos.x + xAddition,
        y: pos.y + yAddition
      });
      this.slices.push({ index });
    });
  }
  private getDirection(event): number {
    const xDiff = this.x + this.size / 2 - event.clientX;
    const yDiff = this.y + this.size / 2 - event.clientY;
    const distance = xDiff * xDiff + yDiff * yDiff; // < 5*5 === True if within 5px distance
    let angle = (Math.atan2(yDiff, xDiff) * 180) / Math.PI;
    if (angle < 0) {
      angle = 360 + angle;
    }
    const activationRange = 360 / this.slices.length;
    if (distance < (this.innerSize / 4) * (this.innerSize / 4) === false) {
      let tempReturn = 0;
      this.slices.forEach((item, index) => {
        if (index === 0) {
          if (angle < activationRange / 2 || angle > 360 - activationRange / 2) {
            tempReturn = 1;
            return;
          }
        } else {
          if (
            angle > activationRange * index - activationRange / 2 &&
            angle < activationRange * index + activationRange / 2
          ) {
            tempReturn = index + 1;
            return;
          }
        }
      });
      this.active = 0;
      return tempReturn;
    } else {
      this.active = 0;
      return 0;
    }
  }
  activate(event) {
    const direction = this.getDirection(event);
    this.activateD(direction);
    this.active = this.getDirection(event);
  }
  activateD(direction) {
    this.active = direction;
    if (this.active !== 0) {
      const funcName = this.content[this.active - 1].content.func;
      const args = this.content[this.active - 1].content.args;
      this.executeFunctionByName(funcName, this, args);
    }
    setTimeout(() => {
      this.show = false;
    }, 200);
  }
  mouseUp(event) {
    const direction = this.getDirection(event);
    if (direction === 0) {
      this.activateD(direction);
    }
  }
  select(event) {
    this.selected = this.getDirection(event);
  }
  f1(text) {
    console.log('f1: ' + text);
  }
  f2(text, value) {
    console.log('f2: ' + text + value);
  }
  executeFunctionByName(functionName, context, args) {
    const namespaces = functionName.split('.');
    const func = namespaces.pop();
    for (const i of namespaces.length) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }
}
