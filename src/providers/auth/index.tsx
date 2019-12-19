import React, { ComponentType, createContext, PureComponent } from 'react';

import AuthService, { AuthServiceInteface } from '../../services/auth';

const AuthContext = createContext<any>(null);

interface Props {}

interface State {
  service: AuthServiceInteface;
  instantiated: boolean;
}

class AuthProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      service: AuthService,
      instantiated: false
    };
  }

  public async componentDidMount(): Promise<void> {
    const { service } = this.state;
    await service.init();
    this.setState({ instantiated: service.isInstantiated() });
  }

  public render(): JSX.Element {
    const { children } = this.props;
    const { service } = this.state;
    return service.isInstantiated() ? (
      <AuthContext.Provider value={{ service }}>
        {children}
      </AuthContext.Provider>
    ) : (
      <></>
    );
  }
}

export function withAuth(Child: ComponentType<any>): ComponentType<any> {
  return (props: any) => (
    <AuthContext.Consumer>
      {({ service }) => <Child {...props} authService={service} />}
    </AuthContext.Consumer>
  );
}

export default AuthProvider;
