import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Pizza } from '../../models/pizza.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class PizzaFormComponent implements OnInit {
  pizzaForm!: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PizzaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pizza: Pizza }
  ) {
    this.dialogTitle = data.pizza ? 'Edit Pizza' : 'Create Pizza';
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const pizza = this.data.pizza;

    this.pizzaForm = this.fb.group({
      name: [pizza?.name || '', [Validators.required, Validators.minLength(3)]],
      description: [
        pizza?.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
      ingredients: this.fb.array(
        pizza?.ingredients?.map((ing) =>
          this.fb.control(ing, Validators.required)
        ) || [this.fb.control('', Validators.required)]
      ),
      price: [pizza?.price || '', [Validators.required, Validators.min(0.01)]],
    });
  }

  get ingredients(): FormArray {
    return this.pizzaForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.pizzaForm.valid) {
      const formValue = this.pizzaForm.value;

      const pizza: Pizza = {
        id: this.data.pizza?.id,
        name: formValue.name,
        description: formValue.description,
        ingredients: formValue.ingredients,
        price: formValue.price,
      };

      this.dialogRef.close(pizza);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
