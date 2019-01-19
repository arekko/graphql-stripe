import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { RouteComponentProps } from "react-router-dom";
import { Form } from "./Form";

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
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
          <Form
            buttonText="Register"
            onSubmit={async data => {
              const response = await mutate({ variables: data });
              console.log(response);
              this.props.history.push("/login");
            }}
          />
        )}
      </Mutation>
    );
  }
}
