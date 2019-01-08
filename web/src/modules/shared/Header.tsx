import * as React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { meQuery } from "../../graphql/queries/me";
import { MeQuery } from "../../schemaTypes";

export class Header extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "space-around",
          padding: 10
        }}
      >
        <Link to="/">
          <h2>Stripe Example</h2>
        </Link>

        <Query<MeQuery>  query={meQuery}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }

            if (!data.me) {
              return (
                <div>
                  <div>
                    <Link to="/login">Login</Link>
                  </div>
                  <div>
                    <Link to="/register">Register</Link>
                  </div>
                </div>
              );
            }

            return (
              <div>
                <Link to="/account">Account</Link>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
