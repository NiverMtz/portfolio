import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { HeroComponent } from './components/hero/hero.component';
import { ButtonModule } from 'primeng/button';
import { CustomHttpTranslateLoader } from './core/common/custom-http-translate-loader';
import { environment } from 'src/environments/environment';
import { CommentComponent } from './components/comment/comment.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { RippleModule } from 'primeng/ripple';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { RouterModule } from '@angular/router';

export function httpLoaderFactory(
  helper: HttpBackend
): CustomHttpTranslateLoader {
  return new CustomHttpTranslateLoader(
    new HttpClient(helper),
    environment.i18n,
    '.json'
  );
}

@NgModule({
  declarations: [AppComponent, LandingComponent, HeroComponent, CommentComponent, MyProjectComponent, MyProjectsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpBackend],
      }
    }),
    SharedModule,
    ButtonModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
