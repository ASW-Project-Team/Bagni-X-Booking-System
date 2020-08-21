import { Component, OnInit } from '@angular/core';

/**
 * Creates a loading screen with a spinner, that occupies all the
 * available space in the page.
 */

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {

  // todo random screen with timer
  constructor() { }

  ngOnInit(): void {
  }

}
