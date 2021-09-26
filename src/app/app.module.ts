import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { NumberComponent } from './number/number.component';
import { StarDisplayComponent } from './star-display/star-display.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NumberComponent,
    StarDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
