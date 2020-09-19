import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploadComponent,
      multi: true
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor {
  file: File | null = null;
  @Input() helperText: string = 'Scegli immagine';
  onChange: Function;
  @ViewChild('fileInput') fileInput;

  constructor( private host: ElementRef<HTMLInputElement> ) { }

  loadFile() {
    this.fileInput.nativeElement.click();
  }

  /**
   * Intercepts the file upload
   */
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }


  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }
}
