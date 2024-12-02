import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../Services/auth.service';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { LoggedUserProfile } from '../../../ViewModels/LoggedUserProfile';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { UserProfile } from '../../../ViewModels/UserProfile';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatDividerModule,
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  private userService = inject(GenericApiHandlerService);
  isUserLogged: boolean = false;

  followButtonText: string = 'Follow';
  private authService = inject(AuthService);
  private router = inject(Router);

  userProfileInfo!: UserProfile;
  username!: string | null;
  private activatedRoute = inject(ActivatedRoute);

  private titleService = inject(Title);

  ngOnInit(): void {
    this.authService
      .isUserLoggedSubject()
      .subscribe((val) => (this.isUserLogged = val));

    this.username = this.activatedRoute.snapshot.paramMap.get('username');

    this.activatedRoute.paramMap.subscribe((pm) => {
      this.username = pm.get('username');

      if (this.username && this.username.toLowerCase() !== 'profile') {
        this.username = this.username.substring(1);
      }

      let routeValue = this.username ?? 'profile';

      this.userService.get(`Account/${routeValue}`).subscribe((res) => {
        this.userProfileInfo = res.data as UserProfile;

        const title =
          this.activatedRoute.snapshot.data['title'] ||
          `${this.userProfileInfo.firstName} ${this.userProfileInfo.lastName} | Pencil`;

        this.titleService.setTitle(title);

        if (
          !this.userProfileInfo.photoPath ||
          this.userProfileInfo.photoPath === ''
        )
          this.userProfileInfo.photoPath = 'user-circle-thin.svg';
        else
          this.userProfileInfo.photoPath = `https://localhost:7089/Images/${this.userProfileInfo.photoPath}`;

        if (this.userProfileInfo.sameUser) this.router.navigate(['/Profile']);

        if (this.userProfileInfo.followed) {
          this.followButtonText = 'Following';
        }
      });
    });
  }

  editProfile() {
    if (this.userProfileInfo.sameUser)
      this.router.navigateByUrl('/profile/edit');
  }

  follow() {
    if (!this.userProfileInfo.followed) {
      this.userService
        .post('following/follow', {
          followedid: this.userProfileInfo.id,
        })
        .subscribe(() => {
          this.followButtonText = 'Following';
          this.userProfileInfo.followersCount++;
          this.userProfileInfo.followed = !this.userProfileInfo.followed;
        });
    } else {
      this.userService
        .delete('following/unfollow', this.userProfileInfo.id)
        .subscribe(() => {
          this.followButtonText = 'Follow';
          this.userProfileInfo.followersCount--;
          this.userProfileInfo.followed = !this.userProfileInfo.followed;
        });
    }
  }
}
