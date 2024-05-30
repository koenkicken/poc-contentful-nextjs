import React from 'react';

import {
  DefaultQueryParameters
} from '@src/data/contentful/component.typings';
import {
  useJoinUsComponentQuery
} from '@src/data/contentful/join-us/__generated/join-us.generated';
import { JoinUs } from '@src/components/features/decoupled-components/join-us/join-us';


export function JoinUsGql({
  id,
  locale,
  preview,
}: DefaultQueryParameters) {
  const data = ( useJoinUsComponentQuery({
    id: id,
    locale: locale,
    preview: preview,
  })) as any;

  return <JoinUs {...data.data?.joinUs} />;
}
