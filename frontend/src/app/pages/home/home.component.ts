import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ActivitiesComponent, FaqComponent],
  template: `
    <app-hero />
    <app-about />
    <app-activities />
    <app-faq />
  `
})
export class HomeComponent {}
