import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/services/api.service';

@Component({
  selector: 'app-admin-message-dialog',
  templateUrl: './admin-message-dialog.component.html',
  styleUrl: './admin-message-dialog.component.css'
})
export class AdminMessageDialogComponent {

  message = '';

  constructor(
    private dialogRef: MatDialogRef<AdminMessageDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message || '';
  }

  save(): void {
    if (!this.data.id) {
      console.error('Message ID is missing');
      return;
    }

    const payload = {
      text: this.message,
      active: true
    };

    this.apiService.updateMessage(this.data.id, payload)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }


  close(): void {
    this.dialogRef.close(false);
  }
}


