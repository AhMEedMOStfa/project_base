import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppIntializerService {
  constructor(private translate: TranslateService, private http: HttpClient) {}
  initialize(): Promise<any> {
    const activeLang = localStorage.getItem('lang')?.toString() || 'ar';
    return Promise.all([firstValueFrom(this.loadTranslation(activeLang))]);
  }
  loadTranslation(lang: string) {
    return this.http.get<any>(`i18n/${lang}.json`).pipe(
      map((response: any) => {
        this.translate.setTranslation(lang, response);
        this.translate.setDefaultLang('ar');
        this.translate.use(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang == 'en' ? 'ltr' : 'rtl';
      })
    );
  }
}
