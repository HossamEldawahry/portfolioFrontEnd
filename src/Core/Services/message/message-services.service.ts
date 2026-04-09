import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateMessageRequest } from '../../Models/imessage';
import { apiV1BaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {
  private readonly messageUrl = `${apiV1BaseUrl}/messages`;

  constructor(private _httpClient: HttpClient) { }

  sendMessage(message: ICreateMessageRequest) {
    return this._httpClient.post(this.messageUrl, message);
  }
}
