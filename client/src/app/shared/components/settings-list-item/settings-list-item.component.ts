import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-list-item',
  templateUrl: './settings-list-item.component.html',
  styleUrls: ['./settings-list-item.component.scss']
})
export class SettingsListItemComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() isMdi: boolean = true;
  @Input() isLast: boolean = false;

  @Input() clickable: boolean = true;
  @Input() action: Function;
  @Input() actionIcon: string;

  disableParentRipple: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
