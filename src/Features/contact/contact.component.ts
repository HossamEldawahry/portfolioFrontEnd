import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageServicesService } from '../../Core/Services/message/message-services.service';
import { IMessage } from '../../Core/Models/imessage';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
name !: FormControl;
email !: FormControl;
subject !: FormControl;
content !: FormControl;
formMessage !: FormGroup;
constructor(private _messageService: MessageServicesService, private toastr: ToastrService) {
}
ngOnInit(): void {
  this.initControls();
  this.initForm();
}
initControls()
{
  this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  this.email = new FormControl('', [Validators.required, Validators.email]);
  this.subject = new FormControl('', [Validators.required, Validators.minLength(5)]);
  this.content = new FormControl('', [Validators.required, Validators.minLength(10)]);
}
initForm()
{
  this.formMessage = new FormGroup({
    name: this.name,
    email: this.email,
    subject: this.subject,
    content: this.content
  });
}
onSubmit(){
if(this.formMessage.invalid) {
  this.formMessage.markAllAsTouched(); // Mark all controls as touched to show validation errors
      Object.keys(this.formMessage.controls).forEach(control => this.formMessage.controls[control].markAsDirty()); // Mark all controls as dirty to show validation errors
    this.toastr.error('❌ الرجاء ملء جميع الحقول بشكل صحيح', 'خطأ في الادخال');
  }else{
    this.sendMessage(this.formMessage.value);
    this.formMessage.reset(); // Reset the form after successful submission
    this.formMessage.markAsPristine(); // Mark the form as pristine after reset
  }

}
sendMessage(message: IMessage)
{
  this._messageService.sendMessage(message).subscribe({
    next: (response) => {
      this.toastr.success('✅ تم إرسال الرسالة بنجاح' , 'نجاح', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: true
      })
      console.log('Message sent successfully:', response);
    },
    error: (error) => {
      this.toastr.error('❌ فشل في إرسال الرسالة', 'خطأ', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
      console.error('Error sending message:', error);
    }
  });
}
}
