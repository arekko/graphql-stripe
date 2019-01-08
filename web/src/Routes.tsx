import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import SubscribeUser from "./modules/account/SubscribeUser";
import { Account } from "./modules/account/Account";
import { Header } from "./modules/shared/Header";
import { LoginView } from "./modules/user/LoginView";
import { RegisterView } from "./modules/user/RegisterView";

export class Routes extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <Header />
                <Route path="/register" component={RegisterView} />
                <Route path="/account" component={Account} />
                <Route
                  exact={true}
                  path="/"
                  render={() => <div>Homepage</div>}
                />
              </React.Fragment>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
