import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../service/youtube.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css'],
})
export class VideoDetailsComponent implements OnInit {
  id: any;
  view = faEye;
  like = faThumbsUp;
  videos: any;
  currentRate: any = 0;
  duration: any;
  durationFormated: any;
  favouriteArray: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService,
    private modalService: NgbModal
  ) {}
  @Output() Rate: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.route.paramMap.subscribe((prams) => {
      console.log(prams.get('id'));
      this.id = prams.get('id');
    });
    this.youtube.getvideoDetails(this.id).subscribe((r: any) => {
      this.videos = r.items;
      this.currentRate =
        localStorage.getItem(this.videos[0].snippet.title) || 0;
      this.duration = this.videos[0].contentDetails.duration;
      this.formatDuration();
    });
  }
  somethingChanged(rate: any) {
    this.currentRate = rate;
    localStorage.setItem(this.videos[0].snippet.title, this.currentRate);
  }

  formatDuration() {
    if (this.duration.indexOf('H') > '0') {
      this.durationFormated = this.duration
        .replace('PT', '')
        .replace('H', ':')
        .replace('M', ':')
        .replace('S', '');
    } else if (this.duration.indexOf('M') > '0') {
      this.durationFormated = this.duration
        .replace('PT', '')
        .replace('M', ':')
        .replace('S', '');
    } else {
      this.durationFormated = `00:${this.duration
        .replace('PT', '')
        .replace('S', '')}`;
    }
  }

  addToFavourite() {
    if (localStorage.getItem('favourite') === null) {
      this.favouriteArray.push(this.videos[0].snippet.title);
      this.favouriteArray = [...new Set(this.favouriteArray)];
      localStorage.setItem('favourite', JSON.stringify(this.favouriteArray));
    } else {
      this.favouriteArray = JSON.parse(localStorage.getItem('favourite')!);
      this.favouriteArray.push(this.videos[0].snippet.title);
      this.favouriteArray = [...new Set(this.favouriteArray)];
      localStorage.setItem('favourite', JSON.stringify(this.favouriteArray));
    }
  }
}
