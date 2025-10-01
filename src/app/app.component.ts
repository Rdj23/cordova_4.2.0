import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CleverTap } from '@awesome-cordova-plugins/clevertap/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private clevertap: CleverTap
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Notify CleverTap that the device is ready
      this.clevertap.notifyDeviceReady();
      this.clevertap.setDebugLevel(3);
      console.log('CleverTap Initialized');
    });
  }
}