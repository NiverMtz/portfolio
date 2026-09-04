import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  success: boolean;
  reply?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private readonly endpoint = environment.chatEndpoint;

  constructor(private http: HttpClient) {}

  /** Envía el historial reciente y devuelve la respuesta del asistente. */
  send(messages: ChatMessage[]): Observable<string> {
    return this.http
      .post<ChatResponse>(this.endpoint, { messages })
      .pipe(map((res) => (res.reply ?? '').trim()));
  }
}
