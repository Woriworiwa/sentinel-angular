import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SatelliteImageComponent } from './satellite-image/satellite-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SatelliteImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
