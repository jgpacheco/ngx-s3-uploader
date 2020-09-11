import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { S3UploaderModule } from 'ngx-s3-uploader';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    S3UploaderModule.forRoot({
      region: 'REGION',
      bucket: 'BUCKET_NAME',
      credentials: { accessKeyId: 'ACCESS_KEY_ID', secretAccessKey: 'SECRET_ACCESS_KEY' },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
