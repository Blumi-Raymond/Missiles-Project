import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  standalone: true
})
export class ChangeColorDirective {

  constructor(er: ElementRef) {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)

    er.nativeElement.style.color = 'rgb(' + r + ',' + g + ',' + b + ')'
    this.myElement = er
  }
  myElement: ElementRef | undefined
  @HostListener('click')
  color() {
    this.myElement!.nativeElement.style.color = 'blue'
  }
}





