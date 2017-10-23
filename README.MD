# ngx-s3-uploader
[![NPM version][npm-version-image]][npm-url]
[![MIT License][license-image]][license-url]

The library is inspired by [AngularJS To S3 Upload App][angular-s3-upload-url]

## Installation

To install this library, run:

```bash
$ npm install ngx-s3-uploader --save
```

## Usage

```typescript
    import { S3UploaderModule } from 'ngx-s3-uploader';

    @NgModule({
        imports: [
            S3UploaderModule.forRoot({
              region: 'REGION',
              bucket: 'BUCKET_NAME',
              credentials: { accessKeyId: 'ACCESS_KEY_ID', secretAccessKey: 'SECRET_ACCESS_KEY' },
            })
        ],
        ...
    })
    export class AppModule {}
```

You can find more information about AWS SDK [here][aws-developer-guide-url].



Now you can use s3-uploader directive in your Angular application:

```
  <s3-uploader (success)="uploaded($event)" (error)="uploadError($event)"></s3-uploader>
```

`success` will be called in case of success with the response data from the successful upload.

A [map][aws-upload-property-url] containing:
* Location (String) — the URL of the uploaded object.
* ETag (String) — the ETag of the uploaded object.
* Bucket (String) — the bucket to which the object was uploaded.
* Key (String) — the key to which the object was uploaded.

`error` will be called if an error occurred.



If you need direct access to the service you can inject it using Dependency Injection:

```typescript
    import { S3UploaderService } from 'ngx-s3-uploader';

    @Component({})
    export class AppComponent {
        constructor(private s3UploaderService: S3UploaderService) {}

        private upload(file): void {
            this.s3UploaderService.upload(file, 'ACL_TO_APPLY', 'BUCKET_NAME<optional>')
                .subscribe(
                    (data) => {
                        //...
                    },
                    (error) => {
                        //...
                    });
        }
    }
```

## TODO
- Support for [Amazon Cognito Identity][loading-browser-credentials-cognito-url].

## License

MIT © [Jaime](mailto:jaime.glez.pacheco@gmail.com)

[npm-url]: https://www.npmjs.com/package/ngx-s3-uploader
[npm-version-image]: https://img.shields.io/npm/v/npm.svg?style=flat

[license-image]: https://img.shields.io/npm/l/express.svg?style=flat
[license-url]: LICENSE

[angular-s3-upload-url]: https://github.com/cheynewallace/angular-s3-upload
[aws-developer-guide-url]: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/building-sdk-for-browsers.html
[loading-browser-credentials-cognito-url]: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-cognito.html
[aws-upload-property-url]: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
