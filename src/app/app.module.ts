import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { LayoutPartsModule } from './layout-parts/layout-parts.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    LayoutPartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
