import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncerSubscription? : Subscription;
  private debouncer : Subject<string> = new Subject<string>();

  @Input()
  public placeholder : string = '';

  @Input()
  public initialVal: string = '';

  @Output() public onValue = new EventEmitter<string>();

  @Output() public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
    
  }

  public emitValue(val :string): void {
    this.onValue.emit(val);
  }

  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
