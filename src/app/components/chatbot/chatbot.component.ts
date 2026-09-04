import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService, ChatMessage } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  @ViewChild('body') private bodyRef?: ElementRef<HTMLElement>;

  open = false;
  loading = false;
  error = false;
  draft = '';
  messages: ChatMessage[] = [];

  constructor(private chatbot: ChatbotService) {}

  toggle(): void {
    this.open = !this.open;
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || this.loading) {
      return;
    }

    this.messages = [...this.messages, { role: 'user', content: text }];
    this.draft = '';
    this.error = false;
    this.loading = true;
    this.scrollDown();

    // Solo mandamos los últimos turnos para acotar tokens/costo.
    const history = this.messages.slice(-10);

    this.chatbot.send(history).subscribe({
      next: (reply) => {
        this.loading = false;
        if (reply) {
          this.messages = [
            ...this.messages,
            { role: 'assistant', content: reply },
          ];
        } else {
          this.error = true;
        }
        this.scrollDown();
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.scrollDown();
      },
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private scrollDown(): void {
    setTimeout(() => {
      const el = this.bodyRef?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 0);
  }
}
