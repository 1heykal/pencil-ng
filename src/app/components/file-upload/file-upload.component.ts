import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiResponseVM } from '../../ViewModels/ApiResponseVM';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit {
  private uploadService = inject(FileUploadService);

  currentFile?: File;
  @Input() currentFileName?: string;
  progress = 0;
  message = '';
  filesInfo?: Observable<any>;

  @Output() addedFilePath = new EventEmitter<string>();

  ngOnInit(): void {
    this.filesInfo = this.uploadService.getFiles(this.currentFileName ?? '');
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.filesInfo = this.uploadService.getFiles(
              this.currentFile?.name ?? ''
            );
            this.addedFilePath.emit(event.body.data[0].name);
          }
        },
        error: (err: any) => {
          console.log(err);
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Coud not upload the file!';
          }

          this.currentFile = undefined;
          this.progress = 0;
        },

        // complete: () => {
        //   this.currentFile = undefined;
        // },
      });
    }
  }
}
