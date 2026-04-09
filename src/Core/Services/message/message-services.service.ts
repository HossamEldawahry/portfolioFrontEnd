import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateMessageRequest, IMessage } from '../../Models/imessage';
import { apiV1BaseUrl } from '../../server/baseUrl';
import { Observable } from 'rxjs';
import { IPagesResult } from '../../Models/ipages-result';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {
  private readonly messageUrl = `${apiV1BaseUrl}/messages`;

  constructor(private _httpClient: HttpClient) { }

  sendMessage(message: ICreateMessageRequest) {
    return this._httpClient.post(this.messageUrl, message);
  }

  getMessages(): Observable<IMessage[]> {
    return this._httpClient.get<IMessage[]>(this.messageUrl);
  }

  getMessagesPaged(page: number, pageSize: number): Observable<IPagesResult<IMessage>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this._httpClient.get<IPagesResult<IMessage>>(`${this.messageUrl}/paged`, { params });
  }

  getMessageById(id: number): Observable<IMessage> {
    return this._httpClient.get<IMessage>(`${this.messageUrl}/${id}`);
  }

  updateMessage(id: number, payload: Record<string, unknown>): Observable<void> {
    return this._httpClient.put<void>(`${this.messageUrl}/${id}`, payload);
  }

  deleteMessage(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.messageUrl}/${id}`);
  }
}
