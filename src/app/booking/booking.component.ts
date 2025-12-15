import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  selectedDate!: Date;
  selectedTime = '';

  error = '';
  success = '';
  message = '';
  minDate: Date = new Date();

  bookings: any[] = [];

  morningSlots = ['09:00', '10:00', '11:00'];
  afternoonSlots = ['12:00', '13:00', '14:00', '15:00', '16:00'];
  eveningSlots = ['17:00', '18:00', '19:00', '20:00'];

  constructor(private authService: AuthService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadBookings();
    this.loadAdminMessage();
  }

  loadAdminMessage() {
    this.apiService.getMessage().subscribe(data => {
      if (data.length && data[0].active) {
        this.message = data[0].text;
      }
    });
  }

  // 🔄 Load ALL bookings (used by user & admin)
  loadBookings(): void {
    this.apiService.getBookings().subscribe(data => {
      this.bookings = data.reverse(); // latest first
    });
  }

  selectSlot(time: string): void {
    if (this.isSlotDisabled(time)) return;
    this.selectedTime = time;
  }

  // ⏰ Disable past time slots for today
  isPastTimeSlot(time: string): boolean {
    if (!this.selectedDate) return false;

    const today = new Date();
    const selected = new Date(this.selectedDate);

    if (today.toDateString() !== selected.toDateString()) {
      return false;
    }

    const [h, m] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(h, m, 0, 0);

    return slotTime < today;
  }

  // 🚫 Disable already booked slots
  isSlotAlreadyBooked(time: string): boolean {
    if (!this.selectedDate) return false;

    return this.bookings.some(b => {
      const booked = new Date(b.dateTime);
      const selected = new Date(this.selectedDate);

      const sameDate =
        booked.toDateString() === selected.toDateString();

      const bookedTime =
        booked.getHours() + ':' +
        booked.getMinutes().toString().padStart(2, '0');

      return sameDate && bookedTime === time;
    });
  }

  isSlotDisabled(time: string): boolean {
    return this.isPastTimeSlot(time) || this.isSlotAlreadyBooked(time);
  }

  // ✅ BOOK SLOT (GLOBAL STORAGE FOR ADMIN)
  bookSlot(): void {
    if (!this.selectedDate || !this.selectedTime) {
      this.error = 'Select date and time';
      return;
    }

    const user = JSON.parse(localStorage.getItem('loggedUser')!);

    const bookingDateTime = new Date(this.selectedDate);
    const [h, m] = this.selectedTime.split(':').map(Number);
    bookingDateTime.setHours(h, m, 0, 0);

    const booking = {
      userName: user.name,
      email: user.email,
      dateTime: bookingDateTime.toISOString()
    };

    this.apiService.createBooking(booking).subscribe(() => {
      this.loadBookings();
      this.success = 'Slot booked successfully 💈';
      this.selectedTime = '';
    });
  }

  // ❌ Cancel booking
  cancelBooking(index: number): void {
    this.bookings.splice(index, 1);

    localStorage.setItem(
      'salon_bookings',
      JSON.stringify(this.bookings)
    );
  }
}
