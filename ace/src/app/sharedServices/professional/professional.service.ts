import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Professional, ProCategory } from '../../interfaces/professional';
import { baseDataUrl, prosSuffixUrl } from './../../dataUrls';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {

  constructor(private http: HttpClient) { }

  public getProfessionals(category: string) {
    return this.http.get<Professional[]>(`${baseDataUrl}${prosSuffixUrl}`).pipe(
      map((pros) => {
        if (!category) { return pros; }

        return pros.filter((pro: Professional) => pro.categories.some((currentCategory: ProCategory) => {
          return currentCategory.categoryName === category ;
        }));
      }),
    );
  }
}
