import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-display',
  standalone: true,
  template: `
    @if (errorMessage) {
      <div class="error-banner">
        <span style="font-size: 1.5rem;">⚠️</span>
        <p><strong>¡Vaya! Algo no salió como esperábamos:</strong></p>
        <p>{{ errorMessage }}</p>
        <button (click)="clearError()">Intentar de nuevo</button>
      </div>
    }
  `,
  styles: [`
    .error-banner { 
      background-color: #fff5f5; 
      border: 1px solid #e53e3e; 
      color: #9b2c2c; 
      padding: 1.5rem; 
      margin: 1rem 0; 
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    button {
      margin-top: 10px;
      padding: 8px 16px;
      cursor: pointer;
      background-color: #e53e3e;
      color: white;
      border: none;
      border-radius: 4px;
    }
  `]
})
export class ErrorDisplayComponent {
  @Input() errorMessage: string | null = null;

  clearError() {
    this.errorMessage = null; 
    this.retry.emit();        
  }

  @Output() retry = new EventEmitter<void>();
}