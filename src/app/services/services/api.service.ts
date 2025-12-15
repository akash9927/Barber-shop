import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // ===== USERS =====
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/users/${id}`, user);
  }

  // ===== BOOKINGS =====
  // getBookings(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.BASE_URL}/bookings`);
  // }

  createBooking(booking: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/bookings`, booking);
  }

  // deleteBooking(id: number): Observable<any> {
  //   return this.http.delete(`${this.BASE_URL}/bookings/${id}`);
  // }
  deleteBooking(id: number) {
    return this.http.delete(`http://localhost:3000/bookings/${id}`);
  }

  // ===== CLOSED SLOTS =====
  getClosedSlots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/closedSlots`);
  }

  closeSlot(slot: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/closedSlots`, slot);
  }




  // ===== BOOKINGS =====
  getBookings() {
    return this.http.get<any[]>('http://localhost:3000/bookings');
  }
  // ===== ADMIN MESSAGE =====
  getMessage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/messages`);
  }

  updateMessage(id: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/messages/${id}`,
      payload
    );
  }
  createMessage(payload: any) {
    return this.http.post('http://localhost:3000/messages', payload);
  }



}
