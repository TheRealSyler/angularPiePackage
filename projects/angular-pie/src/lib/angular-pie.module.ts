import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularPieComponent } from './angular-pie.component';

@NgModule({
  declarations: [AngularPieComponent],
  imports: [BrowserModule],
  exports: [AngularPieComponent]
})
export class AngularPieModule {}
