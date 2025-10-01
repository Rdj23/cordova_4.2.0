import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton, IonList,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { CleverTap } from '@awesome-cordova-plugins/clevertap/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonButton, IonList,
    IonGrid, IonRow, IonCol
  ]
})
export class HomePage {
  identity = '';
  name = '';
  email = '';

  kvKey = '';
  kvValue = '';

  constructor(private ct: CleverTap) {}

  autoLoginOnBlur() {
    const profile: any = {};
    if (this.identity) profile.Identity = this.identity;
    if (this.name) profile.Name = this.name;
    if (this.email) profile.Email = this.email;
    if (Object.keys(profile).length) {
      this.ct.onUserLogin(profile);
    }
  }

  onUserLogin() {
    const profile: any = {};
    if (this.identity) profile.Identity = this.identity;
    if (this.name) profile.Name = this.name;
    if (this.email) profile.Email = this.email;
    if (!Object.keys(profile).length) return;
    this.ct.onUserLogin(profile);
  }

  profileSet() {
    if (!this.kvKey) return;
    this.ct.profileSet({ [this.kvKey]: this.kvValue });
    this.kvKey = '';
    this.kvValue = '';
  }

  testCTA() {
    this.ct.recordEventWithNameAndProps('Test CTA', {
      source: 'home',
      identity: this.identity || null,
    });
  }
}
