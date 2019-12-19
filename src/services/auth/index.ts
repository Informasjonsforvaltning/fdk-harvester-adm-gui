import {
  InMemoryWebStorage,
  User,
  UserManager,
  WebStorageStateStore
} from 'oidc-client';
import decode from 'jwt-decode';

import config from './config';

const ALLOWED_AUTHORITIES = ['system:root:admin'];

export interface AuthServiceInteface {
  init(): Promise<boolean>;
  logIn(): Promise<void>;
  logOut(redirectUri?: string): Promise<void>;
  isAuthenticated(): boolean;
  isTokenExpired(): boolean;
  isInstantiated(): boolean;
  getAuthorizationHeader(): Promise<string>;
  getUser(): User | null;
  isAuthorised(): boolean;
}

interface AccessToken {
  authorities: string;
}

class AuthService implements AuthServiceInteface {
  public user: User | null;

  private manager: UserManager;

  private instantiated: boolean = false;

  constructor() {
    this.manager = new UserManager({
      ...config,
      userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() })
    });

    this.manager.events.addUserLoaded(this.setUser.bind(this));
  }

  public async init(): Promise<boolean> {
    try {
      await this.manager.clearStaleState();
      this.user = await this.manager.signinSilent();
    } catch (e) {
      console.error(e);
      await this.logIn();
    }
    this.instantiated = true;
    return this.isAuthenticated() && !this.isTokenExpired();
  }

  public async logIn(): Promise<void> {
    try {
      await this.manager.signinRedirect({ data: { path: location.href } });
    } catch (e) {
      console.error(e);
    }
  }

  public async logOut(redirectUri?: string): Promise<void> {
    try {
      await this.manager.signoutRedirect({
        post_logout_redirect_uri: redirectUri
      });
    } catch (e) {
      console.error(e);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.user && !!this.user.access_token;
  }

  public isTokenExpired(): boolean {
    return !!this.user && !!this.user.expired;
  }

  public isInstantiated(): boolean {
    return !!this.instantiated;
  }

  public async getAuthorizationHeader(): Promise<string> {
    if (this.isTokenExpired()) {
      this.user = await this.manager.signinSilent();
    }
    if (this.user && this.isAuthenticated() && !this.isTokenExpired()) {
      const { token_type, access_token } = this.user;
      return `${token_type} ${access_token}`;
    }
    return '';
  }

  public getUser(): User | null {
    return this.user;
  }

  private setUser(user: User): void {
    this.user = user;
  }

  private decodeAccessToken(token: string): AccessToken {
    return decode(token);
  }

  public isAuthorised(): boolean {
    return this.isAuthenticated() && !this.isTokenExpired() && this.user
      ? this.hasRequiredAuthorities(this.user.access_token)
      : false;
  }

  public hasRequiredAuthorities(token: string): boolean {
    const authorities: string[] = (
      this.decodeAccessToken(token).authorities || ''
    ).split(',');
    return (
      ALLOWED_AUTHORITIES.map((authority: string) =>
        authorities.includes(authority)
      ).filter(Boolean).length === ALLOWED_AUTHORITIES.length
    );
  }
}

export default new AuthService();
export { User };
