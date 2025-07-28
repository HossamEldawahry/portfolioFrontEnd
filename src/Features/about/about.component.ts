import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../Core/Services/profile/profile-service.service';
import { IProfile } from '../../Core/Models/iprofile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
profile: IProfile | undefined;
  constructor(private _profileService: ProfileServiceService) {}
  ngOnInit(): void {
    this._profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}
