import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  InMemoryWebStorage,
  User,
  UserManager,
  WebStorageStateStore
} from 'oidc-client';

async function run(): Promise<void> {
  const manager: UserManager = new UserManager({
    response_mode: 'query',
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() })
  });
  let path: string = '/';
  try {
    const isInIframe: boolean = location !== parent.location;
    const user: User = await (isInIframe
      ? manager.signinSilentCallback()
      : manager.signinRedirectCallback());
    if (user && user.state && user.state.path) {
      path = user.state.path.replace(location.origin, '');
    }
  } catch (e) {
    console.error(e);
  } finally {
    location.replace(path);
  }
}

run();
