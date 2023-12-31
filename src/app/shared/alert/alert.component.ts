import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message = '';
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
