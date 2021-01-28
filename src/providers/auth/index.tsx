import React, {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';
import { compose } from 'redux';

import service from '../../services/auth-service';

const AuthContext = createContext<any>(null);

export type ServiceProps = { authService: typeof service };

type AuthProps<P> = P & ServiceProps;

const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [isInitialised, setIsInitialised] = useState(false);

  const init = async () => {
    try {
      await service.init({ loginRequired: true });
      setIsInitialised(true);
    } catch (e) {
      // TODO: #0001 - handle service errors and log them to Sentry
    }
  };

  useEffect(() => {
    init();
  }, []);

  return isInitialised ? (
    <AuthContext.Provider value={{ service }}>{children}</AuthContext.Provider>
  ) : (
    <></>
  );
};

export const withAuth = <P extends AuthProps<any>, C extends ComponentType<P>>(
  Child: C
): ComponentType<Omit<P, keyof ServiceProps>> => (props: any) => (
  <AuthContext.Consumer>
    {({ service: authService }) => (
      <Child {...props} authService={authService} />
    )}
  </AuthContext.Consumer>
);

export default compose<FC>()(AuthProvider);
