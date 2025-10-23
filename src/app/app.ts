import { Component, signal } from '@angular/core';
import { BannerContentService } from '@poc-mfe/shared';

@Component({
  selector: 'banner-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {

  constructor(private _bannerContent: BannerContentService) {}

  get banner() {
    return this._bannerContent.content();
  }
}
