// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { CleverTap } from '@awesome-cordova-plugins/clevertap/ngx';

import { PushNotifications } from '@capacitor/push-notifications';

bootstrapApplication(AppComponent, {
  providers: [provideIonicAngular(), provideRouter(routes), CleverTap],
}).then(() => {
  // Ask once per install
  const asked = localStorage.getItem('askedPushPerm');
  if (!asked) {
    PushNotifications.requestPermissions().then(({ receive }) => {
      localStorage.setItem('askedPushPerm', '1');
      console.log('Push permission:', receive); // 'granted' | 'denied'
    });
  }
});
