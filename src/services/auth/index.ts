import {
  InMemoryWebStorage,
  User,
  UserManager,
  WebStorageStateStore
} from 'oidc-client';

import config from './config';

export interface AuthServiceInteface {
  init(): Promise<boolean>;
  logIn(): Promise<void>;
  isAuthenticated(): boolean;
  isTokenExpired(): boolean;
  getAuthorizationHeader(): Promise<string>;
  onUserLoad(callback: (user: User) => void): void;
}

class AuthService implements AuthServiceInteface {
  public user: User | null;

  private manager: UserManager;

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
    return this.isAuthenticated() && !this.isTokenExpired();
  }

  public async logIn(): Promise<void> {
    try {
      await this.manager.signinRedirect({ data: { path: location.href } });
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

  public onUserLoad(callback: (user: User) => void): void {
    this.manager.events.addUserLoaded(callback);
  }

  private setUser(user: User): void {
    this.user = user;
  }
}

export default new AuthService();
export { User };
