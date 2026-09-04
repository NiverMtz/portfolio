import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
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
  declarations: [AppComponent, LandingComponent, HeroComponent, CommentComponent, MyProjectComponent, MyProjectsComponent, ContactComponent, ChatbotComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
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
    RippleModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
