import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CognitoIdentityCredentials, WebIdentityCredentials } from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { config } from 'aws-sdk/global';

export interface S3UploaderConfig {
  apiVersion?: string;
  region: string;
  bucket: string;
  credentials: {
    accessKeyId?: string,
    secretAccessKey?: string,
    identityPoolId?: string,
    logins?: any,
    roleArn?: string,
    roleName?: string,
    providerId?: string,
    token?: string,
  };
}

export const CONFIG = new InjectionToken<S3UploaderConfig>('config');

@Injectable()
export class S3UploaderService {

  private client: S3;

  constructor( @Inject(CONFIG) private s3UploaderConfig: S3UploaderConfig) {
    let credentials = {
      accessKeyId: s3UploaderConfig.credentials.accessKeyId,
      secretAccessKey: s3UploaderConfig.credentials.secretAccessKey,
    };

    // if the identity pool id  is populated I use the Cognito credentials to authenticate
    if (s3UploaderConfig.credentials.identityPoolId) {
      credentials = new CognitoIdentityCredentials({
        IdentityPoolId: s3UploaderConfig.credentials.identityPoolId,
        Logins: this.s3UploaderConfig.credentials.logins || {},
      });
    }

    // if role is populated I use the Web Federated Identity to authenticate
    if (s3UploaderConfig.credentials.roleArn) {
      credentials = new WebIdentityCredentials({
        RoleArn: s3UploaderConfig.credentials.roleArn,
        RoleSessionName: s3UploaderConfig.credentials.roleName,
        ProviderId: this.s3UploaderConfig.credentials.providerId,
        WebIdentityToken: this.s3UploaderConfig.credentials.token
      });
    }

    config.region = s3UploaderConfig.region;
    config.credentials = credentials;

    this.client = new S3();
  }

  // Authenticate with Cognito credentials
  public authenticate(providerName: string, token: string): void {
    if (config.credentials instanceof CognitoIdentityCredentials) {
      config.credentials['params']['Logins'] = {};
      config.credentials['params']['Logins'][providerName] = token;

      // Expire credentials to refresh them on the next request.
      config.credentials['expired'] = true;
    }
  }

  public upload(file: File, acl = 'public-read', bucket?: string): Observable<any> {
    return Observable.create((observer) => {
      this.client.upload(
        { Key: file.name, Body: file, ACL: acl, ContentType: file.type, Bucket: bucket || this.s3UploaderConfig.bucket },
        (error, data) => {
          if (error) { return observer.error(error); }

          observer.next(data);
          observer.complete();
        });
    });
  }
}
