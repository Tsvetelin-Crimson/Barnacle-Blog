import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ]
})
export class CoreModule { }
