import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    CoreModule,
    PostsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: '**',
        component: HomeComponent // TODO: add 404 page, maybe to core
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
