import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericApiHandlerService } from '../../../Services/generic-api-handler.service';
import { LoggedUserProfile } from '../../../ViewModels/LoggedUserProfile';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FileUploadComponent],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.scss',
})
export class ProfileEditorComponent implements OnInit {
  private profileService = inject(GenericApiHandlerService);
  private formBuilder = inject(FormBuilder);
  private userService = inject(GenericApiHandlerService);
  private router = inject(Router);

  baseUrl = environment.BaseURL;

  userProfileInfo!: LoggedUserProfile;

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    username: ['', Validators.required],
    bio: [''],
    photoPath: [''],
    birthDate: [''],
    gender: [''],
  });

  updateProfile() {
    this.profileService
      .put('account/profile', '', this.profileForm.value)
      .subscribe((res) => {
        if (res === null) this.router.navigate(['/Profile']);
      });
  }

  uploadImage() {
    this.userService.post('ImageUpload', this.profileForm.value.photoPath);
  }

  ngOnInit(): void {
    this.profileService.setTitle('Profile');

    this.userService.get('Account/Profile').subscribe((res) => {
      this.userProfileInfo = res.data as LoggedUserProfile;

      this.profileForm.setValue({
        firstName: this.userProfileInfo.firstName,
        lastName: this.userProfileInfo.lastName,
        username: this.userProfileInfo.username,
        bio: this.userProfileInfo.bio ?? '',
        photoPath: this.userProfileInfo.photoPath ?? '',
        birthDate: this.userProfileInfo.birthDate + '',
        gender: this.userProfileInfo.gender,
      });
    });
  }

  setPhotoPath(name: string) {
    this.profileForm.value.photoPath = name;
  }
}
