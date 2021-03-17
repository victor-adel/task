import { Component, OnInit } from '@angular/core';

import { YoutubeService } from '../service/youtube.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent {
  sort = faSort;
  videos: any;
  tittle: any;
  p: number = 1;

  constructor(private youtube: YoutubeService) {}
  ngOnInit() {
    this.youtube.getvideos().subscribe((r) => {
      this.videos = r.items;
    });
  }
  search() {
    if (this.tittle === '') {
      this.ngOnInit();
    } else {
      this.videos = this.videos.filter((video: any) => {
        return video.snippet.title.match(this.tittle);
      });
    }
  }
}
