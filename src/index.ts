import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { S3UploaderComponent } from './s3-uploader.component';
import { S3UploaderService, S3UploaderConfig, CONFIG } from './s3-uploader.service';

export * from './s3-uploader.component';
export * from './s3-uploader.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        S3UploaderComponent,
    ],
    exports: [
        S3UploaderComponent,
    ]
})
export class S3UploaderModule {
    static forRoot(config: S3UploaderConfig): ModuleWithProviders {
        return {
            ngModule: S3UploaderModule,
            providers: [
                { provide: CONFIG, useValue: config },
                S3UploaderService
            ]
        };
    }
}
