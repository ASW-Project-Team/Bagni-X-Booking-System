import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('selectedPage') selectedPage: string;

  constructor() { }

  ngOnInit(): void {
    // todo valuta la selected page, modifica di conseguenza la bar
  }

}
