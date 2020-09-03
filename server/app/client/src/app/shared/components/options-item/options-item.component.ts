import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-options-item',
  templateUrl: './options-item.component.html',
  styleUrls: ['./options-item.component.scss']
})
export class OptionsItemComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('icon') icon: string;
  @Input('is-mdi') isMdi: boolean = true;
  @Input('is-last') isLast: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
