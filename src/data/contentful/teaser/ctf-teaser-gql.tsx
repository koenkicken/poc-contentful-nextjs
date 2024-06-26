import React from 'react';

import { useCtfComponentTeaserQuery } from '@src/data/contentful/teaser/__generated/ctf-teaser.generated';
import { Teaser } from '@src/mapping/contentful/teaser';
import {DefaultQueryParameters} from "@src/data/contentful/component.typings";

export function CtfTeaserGql(props: DefaultQueryParameters) {
  const data = useCtfComponentTeaserQuery({
    id: props.id,
    locale: props.locale,
    preview: props.preview,
  }) as any;

  if (data.data?.teaser) {
    data.data.teaser.sectionType = props.sectionType;
    return <Teaser {...data.data.teaser}/>;
  }
  return <></>
}
