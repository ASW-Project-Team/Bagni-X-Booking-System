import {Component, ContentChild, ElementRef, Input, OnInit, TemplateRef} from '@angular/core';
import {AppbarAction} from "../appbars.model";

@Component({
  selector: 'app-nested-appbar',
  templateUrl: './nested-appbar.component.html',
  styleUrls: ['./nested-appbar.component.scss']
})
export class NestedAppbarComponent implements OnInit {
  @Input() backRoute: string;
  @Input() backPageName: string;
  @Input() title: string;
  @Input() actions: AppbarAction[];
  @ContentChild('rightContent') rightContent: TemplateRef<ElementRef>;

  constructor() { }

  ngOnInit(): void { }
}
