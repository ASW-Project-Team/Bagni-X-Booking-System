import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-http-status-indicator',
  templateUrl: './http-status-indicator.component.html',
  styleUrls: ['./http-status-indicator.component.scss']
})
export class HttpStatusIndicatorComponent implements OnInit {
  @Input() error: string;
  @Input() loading: boolean;
  @Input() loadingText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
