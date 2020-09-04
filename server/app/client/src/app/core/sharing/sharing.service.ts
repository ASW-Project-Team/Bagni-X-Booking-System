import { Injectable } from '@angular/core';
import {NewsModel} from "../../shared/models/news.model";

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  /**
   * Tries to share the news using the sharing API for smartphone. If
   * not possible, copies a sharable text to the clipboard. Returns false
   * if it is not possible to use the sharing api.
   * @param news the news
   * @return true if the sharing api is available.
   */
  public shareNews(news: NewsModel): boolean {
    let sharingApiAvailable = false;

    const sharedUrl = "http://localhost:4200/news/" + news._id;
    const sharedTitle = "Bagni X - " + news.title;
    const description = "Scopri questa e altre news sul nostro sito."


    if (navigator.share) {
      navigator.share({
        title: sharedTitle,
        text: description,
        url: sharedUrl
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);

      sharingApiAvailable = true;
    } else {
      // fallback
      this.copyToClipboard(sharedTitle + " " + sharedTitle);
    }

    return sharingApiAvailable;
  }


  /**
   * Copies a text to the clipboard of the user, such as with ctrl+c.
   * @param text the copied text
   */
  public copyToClipboard(text: string): void {
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = text;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');

    // el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
  }
}
