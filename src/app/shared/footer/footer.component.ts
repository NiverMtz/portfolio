import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  today: number = Date.now();
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
