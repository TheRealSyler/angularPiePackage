## Angular Pie

# Installation

```npm
npm i angular-pie
```

# Usage

Import the `AngularPieComponent` to `app.modules.ts`.

````typescript
import { AngularPieComponent } from 'angular-pie';

@NgModule({
  declarations: [... , AngularPieComponent],
})

````
#
Add `<lib-angular-pie></lib-angular-pie>` to the `app.component.html`, then add a mousedown event to call the menu.

````html
<div (mousedown)="callPie($event)" [style.width.px]="'100%'" [style.height.px]="'100%'">
    <lib-angular-pie></lib-angular-pie>
</div>
````
#
Import the `AngularPieService` to the `app.component.ts`, then create a call function, add the pie slices and options.

```typescript
import { Component } from '@angular/core';
import { AngularPieService, PieOptions, PieSlice } from 'angular-pie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
    pieSlices: PieSlice[] = [{ title: 'Slice 1' }, { title: 'Slice 2' }, { title: 'Slice 3' }, { title: 'Slice 4' }];
    pieOptions: PieOptions = {};
    constructor(pie: AngularPieService) {}
  
    callPieMenu(event: MouseEvent) {
        
        this.pie.call(event: MouseEvent, this.pieSlices: PieSlice[], this.pieOptions: PieOptions);
    }
}
```

# Slice Functions
Adding functions to a slice is simple, create a function, then add the function name, arguments and execution context to to slice that will activate the function.

> Note: the context argument is set to `this` in this example because the function is part of `this`.

```typescript
pieSliceWithFunction: PieSlice = { title: 'Slice 1', func: 'sliceFunction', args: ['string arg', 123], context: this }
pieSliceWithFunction2: PieSlice = { title: 'Slice 2', func: 'sliceFunction', args: ['different String', 321], context: this }
pieSlices: PieSlice[] = [ this.pieSliceWithFunction, this.pieSliceWithFunction2, { title: 'Slice 3' }, { title: 'Slice 4' }];

pieOptions: PieOptions = {};

constructor(private pie: AngularPieService) {}

callPie(event) {
    this.pie.call(event, this.pieSlices, this, this.pieOptions);
}

public sliceFunction(stringArg, numberArg) {
    console.log(stringArg);
    console.log(numberArg);
}
```

# Pie Options
| Name                              | Type    | Default   | Description                                                                                                                                |
| --------------------------------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| borderColor                       | string  | #334157   | Slice border color when not Selected, Color in hex format.                                                                                 |
| borderColorHover                  | string  | #517197   | Slice border color when Selected, Color in hex format.                                                                                     |
| borderWidth                       | number  | 2         | Width of Slice Border, in pixel.                                                                                                           |
| borderRadius                      | number  | 12        | Slice border Radius, in pixel.                                                                                                             |
| color                             | string  | #151619   | Color when slice is Not active or Selected, Color in hex format.                                                                           |
| colorHover                        | string  | #334157   | Color when slice is selected, Color in hex format.                                                                                         |
| colorActive                       | string  | #5595ee   | Color when slice is Active, Color in hex format.                                                                                           |
| circleBorderColor                 | string  | #151619   | Color if the inner circle border, Color in hex format.                                                                                     |
| circleBackgroundColor             | string  | #00000000 | Color of the inner circle transparent by default, Color in hex format.                                                                     |
| circleBorderWidth                 | number  | 2         | Width of the inner circle border, in pixel.                                                                                                |
| oneActiveColor                    | boolean | true      | If true the border color will change to the active color (colorActive) when activated, Else the border color remains the same.             |
| font                              | string  | Verdana   | Font family of slice title.                                                                                                                |
| fontSize                          | string  | 1         | Font size of slice title, in rem.                                                                                                          |
| size                              | number  | 180       | Size of slice container, in pixel                                                                                                          |
| circleSize                        | number  | 80        | Size of the inner circle in, in pixel.                                                                                                     |
| sliceX                            | number  | 100       | Slice width in pixel.                                                                                                                      |
| sliceY                            | number  | 24        | Slice height in pixel.                                                                                                                     |
| hideDelay                         | number  | 200       | Time the menu stays open after activation, in milliseconds.                                                                                |
| round                             | boolean | false     | Slice width in pixel.                                                                                                                      |
| selectionDistance                 | number  | 40        | Selection Distance, in pixel.                                                                                                              |
| activationDistance                | number  | 60        | Activation Distance, in pixel, only acitve if activateAfterActivationDistance is set to true.                                              |
| activationColorDistance           | number  | 55        | Active color activation disatance, in pixel, only acitve if activateAfterActivationDistance is set to true.                                |
| activateAfterActivationDistance   | boolean | false     | If true the menu gets activated after the activationDistance.                                                                              |
| disableInnerMouseleaveActivation  | boolean | true      | If false the pie menu gets activated when the cursor leaves the inner circle.                                                              |
| disableMouseUpActivation          | boolean | true      | If false the pie menu gets activated when the mouse up event gets fired outside the inner circle.                                          |
| disableCircleMousedownActvivation | boolean | true      | If false the pie menu gets activated when the mouse down event gets fired in the inner circle.                                             |
| disableOuterActivation            | boolean | false     | If false the pie menu gets activated when the cursor leaves the outer circle, the outer circle width is size + SliceX same for the height. |
| disableInnnerMouseup              | boolean | false     | If false the pie menu get activated when the mouse up event gets fired in the inner circle.                                                |

# Pie Slice Options

| Name       | Optional | Type       | Description                                                                                                                                                                                             |
| ---------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title      | No       | string     | Slice Title.                                                                                                                                                                                            |
| func       | Yes      | string     | Function Name of the function that gets fired when this slice gets activated.expected format is 'example' or 'function.example' do NOT include parentheses. arguments are passed in the args parameter. |
| args       | Yes      | any[ ]     | Function Arguments if the function that gets fired when this slice gets activated. expected format is ['arg1', 2, {arg: 3}]                                                                             |
| context    | Yes      | any        | Function Execution Context.                                                                                                                                                                             |
| disableImg | Yes      | boolean    | False by default, only enable when an image is nedded.                                                                                                                                                  |
| imgData    | Yes      | Custom { } | Used to set the image properties of this slice.                                                                                                                                                         |

### imgData Object
| Name   | Optional | Type   | Description                                |
| ------ | -------- | ------ | ------------------------------------------ |
| src    | No       | string | Image Source                               |
| left   | Yes      | number | Left position relative to Slice, in pixel. |
| top    | Yes      | number | Top position relative to Slice, in pixel.  |
| height | Yes      | number | Image height, in pixel.                    |
| width  | Yes      | number | Image width, in pixel.                     |
---