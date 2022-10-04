import path from 'path';

import { createDeployment } from '@vercel/client';

import { ProvisionStep } from './types';

type DeployToVercelProps = {
  spaceId: string;
  cmaToken: string;
  deliveryApiKey: string;
  previewApiKey: string;
  vercelDeployToken?: string;
};

type DeployToVercelPayload = {
  deploymentUrl: string;
};

export const deployToVercel: ProvisionStep<DeployToVercelProps, DeployToVercelPayload> = async ({
  spaceId,
  cmaToken,
  deliveryApiKey,
  previewApiKey,
  vercelDeployToken,
}) => {
  let deployment;

  if (!vercelDeployToken) {
    return {
      state: 'error',
      error: 'Failed to deploy to Vercel - missing token',
    };
  }

  for await (const event of createDeployment(
    {
      token: vercelDeployToken,
      path: path.join(__dirname, '../../'),
      teamId: 'contentful-apps',
    },
    {
      name: 'colorful-demo-fintech',
      projectSettings: {
        devCommand: null,
        buildCommand: null,
        outputDirectory: null,
      },
      env: {
        CONFIG_CONTENTFUL_MAIN_SPACE_ID: spaceId,
        CONFIG_CONTENTFUL_MAIN_SPACE_TOKEN: deliveryApiKey,
        CONFIG_CONTENTFUL_MAIN_SPACE_PREVIEW_TOKEN: previewApiKey,
        CONFIG_CONTENTFUL_MAIN_SPACE_MANAGEMENT_TOKEN: cmaToken,
      },
      build: {
        env: {
          CONFIG_CONTENTFUL_MAIN_SPACE_ID: spaceId,
          CONFIG_CONTENTFUL_MAIN_SPACE_TOKEN: deliveryApiKey,
          CONFIG_CONTENTFUL_MAIN_SPACE_PREVIEW_TOKEN: previewApiKey,
          CONFIG_CONTENTFUL_MAIN_SPACE_MANAGEMENT_TOKEN: cmaToken,
        },
      },
    },
  )) {
    if (event.type === 'error') {
      console.error(event);

      if (event.payload.status === 401 || event.payload.status === 403) {
        return {
          state: 'error',
          error:
            'The Vercel token that you have provided could not be used to create a deployment. Double check that the token is valid.',
        };
      }

      return {
        state: 'error',
        error: 'Failed to deploy to Vercel - createDeployment error',
      };
    }

    if (event.type === 'ready') {
      deployment = event.payload;
      break;
    }
  }

  return {
    state: 'success',
    payload: {
      deploymentUrl: deployment.url,
    },
  };
};
