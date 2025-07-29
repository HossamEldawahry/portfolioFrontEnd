import { Component, OnInit } from '@angular/core';
import { IProfile } from '../../../Core/Models/iprofile';
import { ProfileServiceService } from '../../../Core/Services/profile/profile-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  implements OnInit{
  profile: IProfile | undefined;
  constructor(private _profileService: ProfileServiceService) {
  }
  ngOnInit(): void {
    this._profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        if (this.profile) {
          this.profile.imageUrl = this.profile.imageUrl; // Assuming imageUrl is already a complete URL
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}
