import * as React from "react";
import { Query } from "react-apollo";
import { MeQuery } from "../../schemaTypes";
import { Redirect } from "react-router-dom";
import SubscribeUser from "./SubscribeUser";
import { meQuery } from "../../graphql/queries/me";

export class Account extends React.PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }
          if (!data) {
            return <div>data is undefined</div>;
          }

          if (!data.me) {
            return <Redirect to="/login" />;
          }

          if (data.me.type === "free-trial") {
            return <SubscribeUser />;
          }

          return <div>thanks for buying our product</div>;
        }}
      </Query>
    );
  }
}
