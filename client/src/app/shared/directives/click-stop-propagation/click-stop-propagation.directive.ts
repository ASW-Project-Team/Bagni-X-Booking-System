import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

/**
 * @file The directive is used to stop the propagation of the event to the parent,
 * if clickable, and to disable the ripple, in case a ripple is enabled into the parent.
 * In this case, a boolean associated with the output of the directive must be set to the
 * disableRipple property of the parent.
 */
@Directive({
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {
  @Input() disableParentRipple: boolean = false;
  @Output() disableParentRippleChange = new EventEmitter<boolean>();

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  @HostListener("mousedown", ["$event"])
  public onMouseDown(): void {
    this.disableParentRipple = true;
    this.disableParentRippleChange.emit(true);
  }

  @HostListener("mouseup", ["$event"])
  public onMouseUp(): void {
    this.disableParentRipple = false;
    this.disableParentRippleChange.emit(false);

  }

  @HostListener("touchstart", ["$event"])
  public onTouchStart(): void {
    this.disableParentRipple = true;
    this.disableParentRippleChange.emit(true);
  }

  @HostListener("touchend", ["$event"])
  public onTouchEnd(): void {
    this.disableParentRipple = false;
    this.disableParentRippleChange.emit(false);
  }
}
