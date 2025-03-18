import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza.service';
import { PizzaFormComponent } from '../../components/pizza-form/pizza-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PizzaCardComponent } from '../../components/pizza-card/pizza-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, MatIconModule, PizzaCardComponent, LoaderComponent],
})
export class HomeComponent implements OnInit {
  pizzas: Pizza[] = [];
  loading = true;
  error = false;

  constructor(
    private pizzaService: PizzaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.loading = true;
    this.error = false;

    this.pizzaService.getAllPizzas().subscribe({
      next: (data) => {
        this.pizzas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading pizzas', err);
        this.error = true;
        this.loading = false;
        this.showSnackBar('Failed to load pizzas');
      },
    });
  }

  openPizzaForm(pizza?: Pizza): void {
    const dialogRef = this.dialog.open(PizzaFormComponent, {
      width: '500px',
      data: { pizza },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.updatePizza(result);
        } else {
          this.createPizza(result);
        }
      }
    });
  }

  createPizza(pizza: Pizza): void {
    this.pizzaService.createPizza(pizza).subscribe({
      next: (newPizza) => {
        this.pizzas.push(newPizza);
        this.showSnackBar('Pizza created successfully');
      },
      error: (err) => {
        console.error('Error creating pizza', err);
        this.showSnackBar('Failed to create pizza');
      },
    });
  }

  updatePizza(pizza: Pizza): void {
    if (!pizza.id) return;

    this.pizzaService.updatePizza(pizza.id, pizza).subscribe({
      next: (updatedPizza) => {
        const index = this.pizzas.findIndex((p) => p.id === updatedPizza.id);
        if (index !== -1) {
          this.pizzas[index] = updatedPizza;
        }
        this.showSnackBar('Pizza updated successfully');
      },
      error: (err) => {
        console.error('Error updating pizza', err);
        this.showSnackBar('Failed to update pizza');
      },
    });
  }

  deletePizza(id?: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this pizza?')) {
      this.pizzaService.deletePizza(id).subscribe({
        next: () => {
          this.pizzas = this.pizzas.filter((p) => p.id !== id);
          this.showSnackBar('Pizza deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting pizza', err);
          this.showSnackBar('Failed to delete pizza');
        },
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
