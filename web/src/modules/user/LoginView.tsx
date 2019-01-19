import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";
import { meQuery } from "src/graphql/queries/me";
import { userFragment } from "../../graphql/fragments/userFragment";
import { Form } from "./Form";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        update={(cache, { data }) => {
          if (!data || !data.login) {
            return;
          }
          cache.writeQuery({
            query: meQuery,
            data: { me: data.login }
          });
        }}
        mutation={loginMutation}
      >
        {(mutate, { client }) => (
          <Form
            buttonText="Login"
            onSubmit={async data => {
              // optional
              client.resetStore();
              const response = await mutate({ variables: data });
              console.log(response);
              this.props.history.push("/account");
            }}
          />
        )}
      </Mutation>
    );
  }
}
