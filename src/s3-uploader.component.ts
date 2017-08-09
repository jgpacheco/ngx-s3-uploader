import {Component, HostListener, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { S3UploaderService } from './s3-uploader.service';

@Component({
    selector: 's3-uploader',
    template: `
        <input #fileInput style='display: none;' type='file' (change)='onChange()'>
        <ng-content></ng-content>
    `,
})
export class S3UploaderComponent {
    @Output() public success: EventEmitter<any> = new EventEmitter();
    @Output() public error: EventEmitter<any> = new EventEmitter();

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private s3UploaderService: S3UploaderService) {}

    @HostListener('click') onClick(): void {
        this.fileInput.nativeElement.click();
    }

    private onChange(): void {
        const file = this.fileInput.nativeElement.files[0];

        this.s3UploaderService.upload(file)
            .subscribe(
                (data) => {
                    this.success.next(data);
                },
                (error) => {
                    this.error.next(error);
                });
    }
}
