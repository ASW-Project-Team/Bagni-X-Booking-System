import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-list-item',
  templateUrl: './settings-list-item.component.html',
  styleUrls: ['./settings-list-item.component.scss']
})
export class SettingsListItemComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('icon') icon: string;
  @Input('is-mdi') isMdi: boolean = true;
  @Input('is-last') isLast: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
