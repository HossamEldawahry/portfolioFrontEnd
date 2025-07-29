import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '../../Models/imessage';
import { messageBaseUrl } from '../../server/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {
  message: IMessage | undefined;
  constructor(private _httpClient: HttpClient) { }
  sendMessage(message: IMessage) {
    return this._httpClient.post(`${messageBaseUrl}/Create`, message);
  }
}
