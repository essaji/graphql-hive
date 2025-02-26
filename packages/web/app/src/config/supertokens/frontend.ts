import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import EmailVerification from 'supertokens-auth-react/recipe/emailverification';
import SessionReact from 'supertokens-auth-react/recipe/session';
import Provider from 'supertokens-auth-react/lib/build/recipe/thirdparty/providers';
import { env } from '@/env/frontend';
import { appInfo } from '@/lib/supertokens/app-info';
import { CustomProviderConfig } from 'supertokens-auth-react/lib/build/recipe/thirdparty/providers/types';
import { createThirdPartyEmailPasswordReactOktaProvider } from '@/lib/supertokens/third-party-email-password-react-okta-provider';
import {
  createThirdPartyEmailPasswordReactOIDCProvider,
  getOIDCOverrides,
} from '@/lib/supertokens/third-party-email-password-react-oidc-provider';

export const frontendConfig = () => {
  const providers: Array<Provider | CustomProviderConfig> = [];

  if (env.auth.github === true) {
    providers.push(ThirdPartyEmailPasswordReact.Github.init());
  }
  if (env.auth.google === true) {
    providers.push(ThirdPartyEmailPasswordReact.Google.init());
  }

  if (env.auth.okta !== null) {
    if (
      env.auth.okta.hidden === false ||
      globalThis.window?.location.pathname === '/auth/callback/okta' ||
      // Until we support the Okta Integration Network (OIN)
      // We want to hide the log in with Okta button on the hosted platform by default to not confuse people
      // We only want to show it conditionally in order to verify the integration is working for the OIN application process.
      (env.auth.okta.hidden === true &&
        // Only show Okta via query parameter
        new URLSearchParams(globalThis.window?.location.search ?? '').get('show_okta') === '1')
    ) {
      providers.push(createThirdPartyEmailPasswordReactOktaProvider());
    }
  }

  const url = new URL(globalThis.window.location.toString());

  if (env.auth.organizationOIDC === true) {
    // Open ID Connect linked to organization
    // We only add it conditionally, so it does not show a button on the login page
    if (url.pathname === '/auth/oidc' || url.pathname === '/auth/callback/oidc') {
      providers.push(createThirdPartyEmailPasswordReactOIDCProvider());
    }
  }

  return {
    appInfo: appInfo(),
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers,
        },
        async getRedirectionURL(context) {
          if (context.action === 'SUCCESS') {
            // Allow only local pages to be redirected to
            if (context.redirectToPath !== undefined && /^\/[^/]+/.test(context.redirectToPath)) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath;
            }
            return '/';
          }
        },
        override: env.auth.organizationOIDC ? getOIDCOverrides() : undefined,
      }),
      EmailVerification.init({
        mode: env.auth.requireEmailVerification ? 'REQUIRED' : 'OPTIONAL',
      }),
      SessionReact.init(),
    ],
  };
};
