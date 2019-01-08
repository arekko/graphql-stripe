import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";
import { meQuery } from "src/graphql/queries/me";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      type
    }
  }
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { email, password } = this.state;
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center"
            }}
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <button
              onClick={async () => {
                // optional
                client.resetStore();
                const response = await mutate({ variables: this.state });
                console.log(response);
                this.props.history.push("/account");
              }}
            >
              login
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}
