import {Component} from '@angular/core';
import {TermSuggestion} from './services/term-suggestion';
import {TermSuggestionImpl} from './services/term-suggestion.impl';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-term-suggestion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIcon,
    ReactiveFormsModule,
    MatInput,
    MatButtonModule,
    MatListModule
  ],
  providers: [
    { provide: TermSuggestion, useClass: TermSuggestionImpl }
  ],
  templateUrl: './term-suggestion.component.html',
  styleUrl: './term-suggestion.component.scss'
})
export class TermSuggestionComponent {
  suggestions: string[] = [];
  choices: string[] = ['gros', 'gras', 'graisse', 'aggressif', 'go'];
  term = new FormControl<string>('gros', { nonNullable: true });
  suggestionNumber = new FormControl<number>(2, { nonNullable: true });

  constructor(private termSuggestion: TermSuggestion) {
  }

  addChoice(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.choices.push(value);
    }
    event.chipInput!.clear();
  }

  removeChoice(choice: string) {
    const index = this.choices.indexOf(choice);
    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

  getSuggestions() {
    this.suggestions = this.termSuggestion.getSuggestions(
      this.term.value || this.term.defaultValue,
      this.choices,
      this.suggestionNumber.value
    );
  }
}
