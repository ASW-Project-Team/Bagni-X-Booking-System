import {Component, Input, OnInit} from '@angular/core';

/**
 * The fab used inside the app is not a standard material fab; it contains
 * a text and an icon, and it is larger and responsive.
 */

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {
  @Input('title') title: string;
  @Input('icon-name') iconName: string; // used if the custom icon pack is used
  @Input('is-mdi') isMdi: boolean = true;
  @Input('route') route: string;

  constructor() { }

  ngOnInit(): void {
  }

}
