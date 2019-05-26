import { Component, OnInit } from '@angular/core';
import { AngularPieService } from './angular-pie.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'lib-angular-pie',
  templateUrl: './angular-pie.component.html',
  styleUrls: ['./angular-pie.component.sass']
})
export class AngularPieComponent implements OnInit {
  constructor(public pie: AngularPieService) {}

  ngOnInit() {}
}
