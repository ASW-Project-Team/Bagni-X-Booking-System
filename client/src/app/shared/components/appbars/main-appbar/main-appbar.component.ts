import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../appbars.model";

@Component({
  selector: 'app-main-appbar',
  templateUrl: './main-appbar.component.html',
  styleUrls: ['./main-appbar.component.scss']
})
export class MainAppbarComponent implements OnInit {
  username: string;
  isAdmin: boolean = false;
  pages: MenuItem[];

  ngOnInit() { }
}
