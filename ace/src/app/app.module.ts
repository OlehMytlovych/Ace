import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { JobsModule } from './jobs/jobs.module';
import { PartnersModule } from './partners/partners.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { CategoriesEffects } from './store/effects/categories.effects';
import { UserAuthEffects } from './store/effects/user-auth.effects';

import { ProgressSpinnerComponent } from './sharedServices/overlay-spinner/progress-spinner/progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayService } from './sharedServices/overlay-spinner/overlay/overlay.service';
import { LoadingEffects } from './store/effects/loading.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    JobsModule,
    PartnersModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([CategoriesEffects, UserAuthEffects, LoadingEffects]),
  ],
  providers: [Title, OverlayService],
  bootstrap: [AppComponent],
})
export class AppModule { }
