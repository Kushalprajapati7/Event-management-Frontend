import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/eventInterface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) {}

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(`${this.apiUrl}/add`, event);
  }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/${id}`);
  }

  updateEvent(id: string, event: IEvent): Observable<IEvent> {
    return this.http.put<IEvent>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registerUser(eventId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/register`, { userId });
  }

  getRegistrations(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${eventId}/registrations`);
  }
}
