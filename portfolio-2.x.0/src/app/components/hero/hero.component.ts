import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  links = [
    {
      icon: 'pi pi-linkedin',
      href: 'https://www.linkedin.com/in/niver-mtz/',
    },
    {
      icon: 'pi pi-github',
      href: 'https://github.com/NiverMtz',
    },
    {
      icon: 'pi pi-twitter',
      href: 'https://twitter.com/NiverMtz',
    },
    {
      icon: 'pi pi-facebook',
      href: 'https://www.facebook.com/NiverMtz',
    },
  ];
}
