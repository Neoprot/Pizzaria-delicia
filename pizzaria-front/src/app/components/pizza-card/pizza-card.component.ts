import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss'],
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CurrencyPipe,
  ],
})
export class PizzaCardComponent {
  @Input() pizza!: Pizza;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Pizza>();

  onDelete(): void {
    this.delete.emit(this.pizza.id);
  }

  onEdit(): void {
    this.edit.emit(this.pizza);
  }
}
