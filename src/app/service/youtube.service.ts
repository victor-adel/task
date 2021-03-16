import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}
  getvideos(): Observable<any> {
    const API_KEY = 'AIzaSyCmOjSS01ZdLbNw6Cep6qWOoTKn2Y-hNwo';
    const API_URL = 'https://www.googleapis.com/youtube/v3/search';
    const channal = 'UCWv7vMbMWH4-V0ZXdmDpPBA';

    const url = `${API_URL}?&key=${API_KEY}&channelId=${channal}&part=snippet,id&order=date&maxResults=50`;
    return this.http.get<any>(url);
  }
  getvideoDetails(id: any) {
    const API_KEY = 'AIzaSyCmOjSS01ZdLbNw6Cep6qWOoTKn2Y-hNwo';
    const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
    return this.http.get(URL);
  }
}
