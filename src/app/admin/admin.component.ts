import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminMessageDialogComponent } from '../Dialog/admin-message-dialog/admin-message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookings: any[] = [];
  displayedColumns = ['user', 'time', 'action'];
  messageId!: number;
  adminMessage = '';

  constructor(private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog) { }


  saveMessage() {
    const payload = {
      text: this.adminMessage,
      active: true
    };

    this.apiService.updateMessage(this.messageId, payload).subscribe();
  }

  loadMessage(): void {
    this.apiService.getMessage().subscribe((data: any[]) => {

      // If message already exists
      if (data && data.length > 0) {
        this.adminMessage = data[0].text;
        this.messageId = data[0].id;
        return;
      }

      // If message does NOT exist → create one
      const defaultMessage = {
        text: '',
        startTime: '',
        endTime: '',
        active: false
      };

      this.apiService.createMessage(defaultMessage)
        .subscribe((created: any) => {
          this.adminMessage = created.text;
          this.messageId = created.id; // ✅ GUARANTEED ID
        });
    });
  }




  ngOnInit(): void {
    this.loadBookings();
    this.loadMessage();
  }


  loadBookings() {
    this.apiService.getBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  rejectBooking(id: number) {
    this.apiService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }
  logout(): void {
    this.authService.logout();
  }
  openMessagePopup(): void {

    if (!this.messageId) {
      console.warn('Message not ready yet');
      return;
    }

    const dialogRef = this.dialog.open(AdminMessageDialogComponent, {
      width: '400px',
      data: {
        id: this.messageId,
        message: this.adminMessage
      }
    });

    dialogRef.afterClosed().subscribe(updated => {
      if (updated) {
        this.loadMessage();
      }
    });
  }



}
