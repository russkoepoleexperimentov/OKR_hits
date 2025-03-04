import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[phoneMask]'
})
export class PhoneMaskDirective {
    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = this.el.nativeElement;
        let digits = input.value.replace(/\D/g, '');

        if (digits && digits[0] !== '7') {
            digits = '7' + digits;
        }
        digits = digits.substring(0, 11);

        let formatted = '+7 ';
        if (digits.length > 1) {
            formatted += '(' + digits.substring(1, 4);
        }
        if (digits.length >= 4) {
            formatted += ') ' + digits.substring(4, 7);
        }
        if (digits.length >= 7) {
            formatted += '-' + digits.substring(7, 9);
        }
        if (digits.length >= 9) {
            formatted += '-' + digits.substring(9, 11);
        }

        input.value = formatted;
    }
}
