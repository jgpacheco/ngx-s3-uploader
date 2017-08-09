import { Inject, OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { S3 } from 'aws-sdk';

export interface S3UploaderConfig {
    apiVersion?: string;
    region: string;
    bucket: string;
    credentials: { accessKeyId: string, secretAccessKey: string };
}

export const CONFIG = new OpaqueToken('config');

export class S3UploaderService {

    private client: S3;

    constructor(@Inject(CONFIG) private config: S3UploaderConfig) {
        this.client = new S3({
            apiVersion: config.apiVersion || '2006-03-01',
            region: config.region,
            credentials: config.credentials,
        });
    }

    public upload(file: File, acl = 'public-read', bucket?: string): Observable<any> {
        return Observable.create((observer) => {
            this.client.upload(
                { Key: file.name, Body: file, ACL: acl, ContentType: file.type, Bucket: bucket || this.config.bucket },
                (error, data) => {
                    if (error) { return observer.error(error); }

                    observer.next(data);
                    observer.complete();
                });
        });
    }

}
