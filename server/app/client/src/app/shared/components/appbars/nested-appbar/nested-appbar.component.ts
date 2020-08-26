import {Component, Input, OnInit} from '@angular/core';
import {AppbarAction} from "../../../models/component-specific/appbar.action";

@Component({
  selector: 'app-nested-appbar',
  templateUrl: './nested-appbar.component.html',
  styleUrls: ['./nested-appbar.component.scss']
})
export class NestedAppbarComponent implements OnInit {
  @Input('back-route') backRoute: string;
  @Input('back-page-name') backPageName: string;


  @Input('title') title: string;
  // actions identifies what the ending part of the appbar should do
  @Input('actions') actions: AppbarAction[];

  constructor() { }

  ngOnInit(): void {
  }

}
