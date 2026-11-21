import "server-only";
import { betterAuth } from "better-auth";
import { APIError, getOAuthState } from "better-auth/api";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { ObjectId } from "mongodb";
import { db, mongoClient } from "./mongodb";

const SIGNUP_ROLES = ["customer", "vendor"] as const;
type SignupRole = (typeof SIGNUP_ROLES)[number];

function pickRole(value: unknown): SignupRole {
  // Public sign-up can only ever create customers or vendors. "admin" (or
  // anything else) silently falls back to customer.
  return SIGNUP_ROLES.includes(value as SignupRole) ? (value as SignupRole) : "customer";
}

const appUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "WedPlan",
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [appUrl],
  database: mongodbAdapter(db, { client: mongoClient }),

  user: {
    modelName: "users",
    additionalFields: {
      // input: true so sign-up can send it; the create hook below whitelists
      // the value and the update hook strips it from every later update.
      role: { type: "string", required: false, defaultValue: "customer", input: true },
      isBlocked: { type: "boolean", required: false, defaultValue: false, input: false },
      businessName: { type: "string", required: false, input: true },
      subscriptionPlan: { type: "string", required: false, defaultValue: "free", input: false },
      subscriptionExpiresAt: { type: "date", required: false, input: false },
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 60 * 5 },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          // Email sign-up sends { role } in the body; Google sign-up sends it
          // through signIn.social({ additionalData: { role } }).
          let requested: unknown = (ctx?.body as { role?: unknown } | undefined)?.role;
          if (!requested) {
            const state = await getOAuthState().catch(() => null);
            requested = state?.role;
          }
          const role = pickRole(requested);
          return {
            data: {
              ...user,
              role,
              isBlocked: false,
              subscriptionPlan: "free",
              businessName: role === "vendor" ? user.businessName : undefined,
            },
          };
        },
      },
      update: {
        before: async (data) => {
          // Users can never change their own role, block state or plan
          // through Better Auth (e.g. authClient.updateUser).
          const safe = { ...data } as Record<string, unknown>;
          for (const key of ["role", "isBlocked", "subscriptionPlan", "subscriptionExpiresAt"]) delete safe[key];
          return { data: safe };
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          // Blocked accounts cannot start new sessions (email or Google).
          const owner = await db
            .collection("users")
            .findOne({ _id: new ObjectId(session.userId) }, { projection: { isBlocked: 1 } });
          if (owner?.isBlocked) {
            throw new APIError("FORBIDDEN", { message: "Your account has been blocked. Contact support." });
          }
        },
      },
    },
  },

  plugins: [
    // Issues short-lived JWTs (GET /api/auth/token) that the Express API
    // verifies against the public keys at /api/auth/jwks.
    jwt({
      jwt: {
        issuer: appUrl,
        audience: appUrl,
        expirationTime: "15m",
        definePayload: ({ user }) => ({ id: user.id, email: user.email, role: user.role }),
      },
    }),
    nextCookies(), // must stay last
  ],
});

export type Session = typeof auth.$Infer.Session;
export type SessionUser = Session["user"];
