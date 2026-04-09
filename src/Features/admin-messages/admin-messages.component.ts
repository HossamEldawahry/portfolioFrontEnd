import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IMessage } from '../../Core/Models/imessage';
import { MessageServicesService } from '../../Core/Services/message/message-services.service';

@Component({
  selector: 'app-admin-messages',
  imports: [CommonModule],
  templateUrl: './admin-messages.component.html',
  styleUrl: './admin-messages.component.scss'
})
export class AdminMessagesComponent implements OnInit {
  messages: IMessage[] = [];
  selectedMessage?: IMessage;

  constructor(private messagesService: MessageServicesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messagesService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
      }
    });
  }

  viewMessage(id: number): void {
    this.messagesService.getMessageById(id).subscribe({
      next: (message) => (this.selectedMessage = message)
    });
  }

  markAsRead(message: IMessage): void {
    this.messagesService.updateMessage(message.id, { ...message, isRead: true, status: 'Read' }).subscribe({
      next: () => {
        this.toastr.success('تم تحديث الحالة');
        this.loadMessages();
      }
    });
  }

  deleteMessage(id: number): void {
    this.messagesService.deleteMessage(id).subscribe({
      next: () => {
        this.toastr.success('تم حذف الرسالة');
        if (this.selectedMessage?.id === id) {
          this.selectedMessage = undefined;
        }
        this.loadMessages();
      }
    });
  }

  messageStatusLabel(message: IMessage): string {
    const raw = message.status?.trim();
    if (raw) {
      const lower = raw.toLowerCase();
      if (lower === 'read') {
        return 'مقروءة';
      }
      if (lower === 'new' || lower === 'unread') {
        return 'جديدة';
      }
      return raw;
    }
    return message.isRead ? 'مقروءة' : 'جديدة';
  }
}
