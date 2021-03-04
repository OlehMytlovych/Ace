import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseDataUrl, catsSuffixUrl } from 'src/app/dataUrls';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<string[]>(`${baseDataUrl}${catsSuffixUrl}`);
  }
}
