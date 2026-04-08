import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  activities = [
    { icon: '🎓', title: 'Skill Development', desc: 'Vocational training programs tailored for MSME workers and entrepreneurs to enhance productivity.' },
    { icon: '🏭', title: 'Manufacturing Support', desc: 'Technical assistance and guidance for setting up and scaling manufacturing units.' },
    { icon: '🤝', title: 'Industry Networking', desc: 'Connecting MSMEs with larger industries, buyers, and supply chain partners.' },
    { icon: '🏛️', title: 'Government Liaison', desc: 'Facilitating registration, subsidies, and policy compliance with government schemes.' },
    { icon: '💰', title: 'Finance Access', desc: 'Helping MSMEs access loans, grants and financial schemes from banks and institutions.' },
    { icon: '📊', title: 'Market Development', desc: 'Identifying domestic and export market opportunities for MSME products.' },
  ];
}
