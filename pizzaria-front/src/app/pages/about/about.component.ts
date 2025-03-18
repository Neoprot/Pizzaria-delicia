import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [MatCardModule, MatIconModule],
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Lorem ipsum',
      position: 'Founder & Head Chef',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae dolor eros. Maecenas rutrum efficitur tempor.',
      image: 'assets/images/chef1.jpg',
    },
    {
      name: 'Lorem ipsum',
      position: 'Pizza Chef',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae dolor eros. Maecenas rutrum efficitur tempor.',
      image: 'assets/images/chef2.jpg',
    },
    {
      name: 'Lorem ipsum',
      position: 'Manager',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae dolor eros. Maecenas rutrum efficitur tempor.',
      image: 'assets/images/manager.jpg',
    },
  ];
}
