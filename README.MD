# ngx-s3-uploader

[![NPM version][npm-version-image]][npm-url] [![MIT License][license-image]][license-url]

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

**Warning**

While it is possible to do so, we recommend you not hard code credentials inside an application or browser script. Hard coding credentials poses a risk of exposing your access key ID and secret access key. See [Best Practices][aws-docs-iam-best-practices] in the IAM User Guide.

The recommended way to obtain AWS credentials for your browser scripts is to use the Amazon Cognito Identity credentials. See [Identity Pools][aws-docs-identity-pools] for instructions to create identity pools.

```typescript
    import { S3UploaderModule } from 'ngx-s3-uploader';

    @NgModule({
        imports: [
            S3UploaderModule.forRoot({
              region: 'REGION',
              bucket: 'BUCKET_NAME',
              credentials: { identityPoolId: 'IDENTITY_POOL_ID' },
            })
        ],
        ...
    })
    export class AppModule {}
```

Alternatively you can authenticate with the [Web Federated Identity][aws-docs-federated] method.

```typescript
    import { S3UploaderModule } from 'ngx-s3-uploader';

    @NgModule({
        imports: [
            S3UploaderModule.forRoot({
              region: 'REGION',
              bucket: 'BUCKET_NAME',
              credentials: { roleArn: 'ROLE_ARN', roleName: 'ROLE_SESSION_NAME', providerId: 'PROVIDER_ID', token: 'ACCESS_TOKEN' },
            })
        ],
        ...
    })
    export class AppModule {}
```
As the role session name is adviced to pass the name or identifier that is associated with the user.

Now you can use s3-uploader directive in your Angular application:

```html
  <s3-uploader (success)="uploaded($event)" (error)="uploadError($event)"></s3-uploader>
```

`success` will be called in case of success with the response data from the successful upload.

A [map][aws-upload-property-url] containing:

- Location (String) -- the URL of the uploaded object.
- ETag (String) -- the ETag of the uploaded object.
- Bucket (String) -- the bucket to which the object was uploaded.
- Key (String) -- the key to which the object was uploaded.

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

You can also use this service to update _logins_ when using Amazon Cognito Identity:

```typescript
    import { S3UploaderService } from 'ngx-s3-uploader';

    @Component({})
    export class AppComponent {
        constructor(private s3UploaderService: S3UploaderService) {}

        private facebookLogin(): void {
            FB.login((response) => {
              if (response.authResponse) {
                this.s3UploaderService.authenticate('graph.facebook.com', response.authResponse.accessToken);
              } else {
                console.log('There was a problem logging you in.');
              }
            });
        }
    }
```


## TODO
- Allow access token to be updated after initialization when [Web Federated Identity][aws-docs-federated] method is used.

## License

MIT © [Jaime](mailto:jaime.glez.pacheco@gmail.com)

[angular-s3-upload-url]: https://github.com/cheynewallace/angular-s3-upload
[aws-developer-guide-url]: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started.html
[aws-docs-iam-best-practices]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege.html
[aws-docs-identity-pools]: http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html
[aws-docs-federated]: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-federated-id.html
[aws-upload-property-url]: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
[license-image]: https://img.shields.io/npm/l/express.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://www.npmjs.com/package/ngx-s3-uploader
[npm-version-image]: https://badge.fury.io/js/ngx-s3-uploader.svg
