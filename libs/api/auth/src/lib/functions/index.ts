import * as bcrypt from "bcryptjs";
import {
  UsersInstance,
  SubscriptionsInstance,
  UsersCreationAttributes,
  database, RolesInstance,
  CreditcardsCreationAttributes,
  SubscriptionsCreationAttributes
} from "@iustitia/api/database";

export type CreateUserSubscriptionInterface = Omit<SubscriptionsCreationAttributes, 'userId'>

export interface CreateUserInterface {
  name: string,
  email: string,
  password: string,
  tenant?: string,
  roleName: "Admin" | "User"
  subscription: CreateUserSubscriptionInterface
}

export async function createUser(
  { name, email, password, tenant, roleName, subscription }:
    CreateUserInterface): Promise<{ user: UsersInstance, subscription: SubscriptionsInstance }> {
  const userData: UsersCreationAttributes = {
    email: email,
    password: bcrypt.hashSync(password, 8),
    active: true
  }
  if (tenant) userData.tenant = tenant;
  const user = await database.Users.create(userData);
  if (!tenant) await user.update({ tenant: user.id });

  const role = await database.Roles.findOne({ where: { name: roleName } });
  if (role && user.addRole) await user.addRole(role as RolesInstance);

  await database.Profiles.create({ name, email, userId: user.id });

  const subscriptionRes = await database.Subscriptions.create({
    reason: subscription.reason,
    frequency: subscription.frequency,
    frequencyType: subscription.frequencyType,
    transactionAmount: subscription.transactionAmount,
    status: true,
    type: subscription.type,
    planId: subscription.planId,
    userId: user.id,
  });

  return {
    user: user,
    subscription: subscriptionRes
  };
}

export type CreateUcreateUserPaymentType = {
  userId: string,
  cardInfo: CreditcardsCreationAttributes,
  transactionAmount: number,
  subscriptionId: string
}

export async function createUserPayment({ userId, cardInfo, transactionAmount, subscriptionId }: CreateUcreateUserPaymentType) {
  // const preapproval = await mercadopago.preapproval.create({
  //   "preapproval_plan_id": userPlan.preapprovalPlanId,
  //   "card_token_id": cardInfo.id,
  //   "payer_email": user.email
  // });
  // console.log(preapproval)
  const creditcard = await database.Creditcards.create({
    name: cardInfo.name,
    firstSixDigits: cardInfo.firstSixDigits,
    lastFourDigits: cardInfo.lastFourDigits,
    expirationMonth: cardInfo.expirationMonth,
    expirationYear: cardInfo.expirationYear,
    status: true,
    userId: userId,
  });
  const payment = await database.Payments.create({
    transactionAmount: transactionAmount,
    status: "Paid",
    paidDate: new Date(),
    subscriptionId: subscriptionId,
    creditcardId: creditcard.id,
    userId: userId,
  });

  return {
    creditcard,
    payment
  }
}
