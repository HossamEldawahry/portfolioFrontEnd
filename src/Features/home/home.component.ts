import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../Core/Services/profile/profile-service.service';
import { IProfile } from '../../Core/Models/iprofile';
import { imageBaseUrl } from '../../Core/server/baseUrl';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  profile: IProfile | undefined;
  constructor(private _profileService: ProfileServiceService) {}

  ngOnInit(): void {
    this._profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.profile!.imageUrl = imageBaseUrl + this.profile!.imageUrl;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}
