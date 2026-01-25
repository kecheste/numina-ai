import { headers } from "next/headers";
import { getDatabase } from "@/lib/mongodb";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  const db = await getDatabase();

  switch (event.type) {
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Find user by Stripe customer ID
      const user = await db
        .collection("users")
        .findOne({ stripeCustomerId: customerId });

      if (user) {
        await db.collection("users").updateOne(
          { stripeCustomerId: customerId },
          {
            $set: {
              isPremium: subscription.status === "active",
              subscriptionStatus:
                subscription.status === "active" ? "active" : "cancelled",
              subscriptionId: subscription.id,
            },
          },
        );
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await db.collection("users").updateOne(
        { stripeCustomerId: customerId },
        {
          $set: {
            isPremium: false,
            subscriptionStatus: "cancelled",
          },
        },
      );
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
