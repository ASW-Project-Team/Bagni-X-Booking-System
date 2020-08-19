import {Component, Input, OnInit} from '@angular/core';

/**
 * Utility component that generate an image with 16:9 aspect ratio given
 * the input, and takes all the available width.
 */
@Component({
  selector: 'app-img-landscape',
  templateUrl: './img-landscape.component.html',
  styleUrls: ['./img-landscape.component.scss']
})
export class ImgLandscapeComponent implements OnInit {
  @Input('src') imageUrl: String;

  constructor() { }

  ngOnInit(): void {
  }

}
