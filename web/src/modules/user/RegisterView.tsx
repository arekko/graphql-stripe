import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { RouteComponentProps } from "react-router-dom";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
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
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
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
                const response = await mutate({ variables: this.state });
                console.log(response);
                this.props.history.push("/login");
              }}
            >
              register
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}
