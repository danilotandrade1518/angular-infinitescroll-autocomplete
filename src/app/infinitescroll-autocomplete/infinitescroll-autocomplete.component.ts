import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-infinitescroll-autocomplete',
  templateUrl: './infinitescroll-autocomplete.component.html',
  styleUrls: ['./infinitescroll-autocomplete.component.scss'],
})
export class InfinitescrollAutocompleteComponent implements OnInit, OnDestroy {
  @Input() value: any;
  @Input() items = [];
  @Input() totalItems = 0;
  @Input() itemKey = 'value';
  @Input() minInputLength = 2;
  @Input() timeToEvent = 800;
  @Input() loading = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() scrollAtBottom = new EventEmitter();

  focused = false;
  inputValue = '';
  private searchStringSubscription: Subscription;
  private searchString: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

  constructor() { }

  ngOnInit() {
    this.subscribeSearchString();
  }

  ngOnDestroy() {
    this.searchStringSubscription.unsubscribe();
  }

  handleSearchChange(event) {
    const keyCode = event.which;
    const alphaNumericKeyCodes = Array.from(Array.from(Array(Math.ceil((91 - 48) / 1)).keys()), x => 48 + x * 1);
    const validKeys = [8, 46, ...alphaNumericKeyCodes];

    if ( validKeys.includes(keyCode) ) {
      this.items = [];

      this.searchString.next(event);
    }
  }

  onScroll(event) {
    const scrollPosition = event.target.offsetHeight + event.target.scrollTop;

    if (scrollPosition >= event.target.scrollHeight) {
      this.scrollAtBottom.emit();
    }
  }

  onInputFocus() {
    this.focused = true;
  }

  itemSelected(value) {
    if (value) {
      this.value = value;
      this.valueChange.emit(this.value);
      this.inputValue = this.value[this.itemKey];
    }
    this.focused = false;
  }

  private subscribeSearchString() {
    const checkInitLoading = event => this.loading = (event.target.value.length >= this.minInputLength);
    const checkStopLoadingAndFilter = event => {
      this.loading = false;
      const valueLength = event.target.value.length;

      return valueLength >= this.minInputLength;
    };

    this.searchStringSubscription = this.searchString.pipe(
      tap(checkInitLoading),
      debounceTime(this.timeToEvent),
      filter(checkStopLoadingAndFilter),
      tap(event => this.searchChange.emit(event.target.value)),
    ).subscribe();
  }
}
