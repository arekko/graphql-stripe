import * as React from "react";
import { gql } from "apollo-boost";
import { userFragment } from "../..//graphql/fragments/userFragment";
import { Mutation } from "react-apollo";
import { CancelSubscriptionMutation } from "../../schemaTypes";

const cancelSubscriptionMutation = gql`
  mutation CancelSubscriptionMutation {
    cancelSubscription {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export default class CancelSubscription extends React.PureComponent {
  render() {
    return (
      <Mutation<CancelSubscriptionMutation>
        mutation={cancelSubscriptionMutation}
      >
        {mutate => (
          <button onClick={() => mutate()}>cancel subscription</button>
        )}
      </Mutation>
    );
  }
}
