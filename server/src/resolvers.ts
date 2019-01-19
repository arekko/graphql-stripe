import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { req }) => {
      console.log(req.session.userId);

      if (!req.session.userId) {
        return null;
      }
      return await User.findOne({ where: { id: req.session.userId } });
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        password: hashPassword
      }).save();

      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;
    },
    createSubscription: async (_, { source, ccLast4 }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user) {
        throw new Error("");
      }

      let stripeId = user.stripeId;

      if (!stripeId) {
        const customer = await stripe.customers.create({
          email: user.email,
          source,
          plan: process.env.PLAN
        });
        stripeId = customer.id;
      } else {
        await stripe.customers.update(stripeId, { source });

        await stripe.subscriptions.create({
          customer: stripeId,
          plan: process.env.PLAN
        });
      }

      user.stripeId = stripeId;
      user.type = "paid";
      user.ccLast4 = ccLast4;
      await user.save();

      return user;
    },
    changeCreditCard: async (_, { source, ccLast4 }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user || !user.stripeId || user.type !== "paid") {
        throw new Error();
      }

      await stripe.customers.update(user.stripeId, { source });

      user.ccLast4 = ccLast4;
      user.save();
      return user;
    },

    cancelSubscription: async (_, __, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user || !user.stripeId || user.type !== "paid") {
        throw new Error();
      }

      const stripeCustomer = await stripe.customers.retrieve(user.stripeId);
      const [subscription] = stripeCustomer.subscriptions.data;

      await stripe.subscriptions.del(subscription.id);

      stripeCustomer.default_source &&
        (await stripe.customers.deleteCard(
          user.stripeId,
          stripeCustomer.default_source as string
        ));

      user.type = "free-trial";
      // user.stripeId = null;
      user.save();

      return user;
    }
  }
};
