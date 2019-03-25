import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InfinitescrollAutocompleteComponent } from './infinitescroll-autocomplete/infinitescroll-autocomplete.component';
import { LoadComponent } from './load/load.component';
import { ApiCallService } from './services/api-call.service';
import { AuthKeysService } from './services/auth-keys.service';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadComponent,
    InfinitescrollAutocompleteComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ApiCallService, AuthKeysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
