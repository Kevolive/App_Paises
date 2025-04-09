import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

placeholder = input('Buscar')
debounceTime = input(300);
inicialValue = input<string>();

value = output<string>();

inputValue = linkedSignal<string>(() => this.inicialValue() ?? '');


debounceEffetc = effect((onCleanup) => {
  const value = this.inputValue();

  const timeout = setTimeout(() => {
    this.value.emit(value);
  }, this.debounceTime());

  onCleanup(() => {
    clearTimeout(timeout);
  })
})




}
