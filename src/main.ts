import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// maybe replac with this
// @HostListener('window:scroll', ['$event']) // for window scroll events
// onScroll(event) {
//   ...
// }

window.onscroll = function() {myFunction()};
var header = document.getElementById("header");

var sticky = header?.offsetTop;

function myFunction() {
  if (sticky != undefined && window.pageYOffset > sticky) {
    header?.classList.add("sticky");
  } else {
    header?.classList.remove("sticky");
  }
}