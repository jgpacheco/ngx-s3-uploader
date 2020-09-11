import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public uploaded($event): void {
    console.log('===> Uploaded callback:');
    console.log($event);
  }

  public uploadError($event): void {
    console.log('===> UploadError callback:');
    console.log($event);
  }
}
