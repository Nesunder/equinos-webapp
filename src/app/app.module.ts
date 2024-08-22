import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [provideHttpClient(), ThemeService],
  bootstrap: []
})
export class AppModule { }
