import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../models/component-specific/page.model";

@Component({
  selector: 'app-main-appbar',
  templateUrl: './main-appbar.component.html',
  styleUrls: ['./main-appbar.component.scss']
})
export class MainAppbarComponent implements OnInit {
  @Input('pages') pages: Page[];

  constructor() { }

  ngOnInit(): void {
  }
}
