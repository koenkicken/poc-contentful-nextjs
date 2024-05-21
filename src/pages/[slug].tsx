import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { useCtfPageQuery } from '@src/data/contentful/page/__generated/ctf-page.generated';
import CtfPageGgl from '@src/data/contentful/page/ctf-page-gql';
import { getServerSideTranslations } from '@src/lib/get-serverside-translations';
import { prefetchMap } from '@src/lib/prefetch-mappings';
import { prefetchPromiseArr } from '@src/lib/prefetch-promise-array';
import { ComponentReferenceFieldsFragment } from '@src/lib/shared-fragments/__generated/ctf-componentMap.generated';

const SlugPage: NextPage = () => {
  const router = useRouter();
  const slug = (router?.query.slug as string) || '';

  return <CtfPageGgl slug={slug} />;
};

export interface CustomNextPageContext extends NextPageContext {
  params: {
    slug: string;
  };
  id: string;
}

export const getServerSideProps = async ({ locale, params, query }: CustomNextPageContext) => {
  const slug = params.slug;
  const preview = Boolean(query.preview);

  try {
    const queryClient = new QueryClient();

    // Default queries
    await queryClient.prefetchQuery(
      useCtfPageQuery.getKey({ slug, locale, preview }),
      useCtfPageQuery.fetcher({ slug, locale, preview }),
    );

    // Dynamic queries
    const pageData = await useCtfPageQuery.fetcher({ slug, locale, preview })();
    const page = pageData.pageCollection?.items[0];

    // const topSection = page?.topSectionCollection?.items;
    // const extraSection = page?.extraSectionCollection?.items;
    const content: ComponentReferenceFieldsFragment | undefined | null = page?.pageContentCollection?.items as any;

    await Promise.all([
      // ...prefetchPromiseArr({ inputArr: topSection, locale, queryClient }),
      // ...prefetchPromiseArr({ inputArr: extraSection, locale, queryClient }),
      ...prefetchPromiseArr({ inputArr: [content], locale, queryClient }),
    ]);

    if (content) {
      const { __typename, sys } = content;

      if (!__typename)
        return {
          notFound: true,
        };

      const query = prefetchMap?.[__typename];

      if (!query)
        return {
          notFound: true,
        };

      const data: any = await query.fetcher({
        id: sys.id,
        locale,
        preview,
      })();

      // Different data structured can be returned, this function makes sure the correct data is returned
      const inputArr = (__typename => {
        if ('topicBusinessInfo' in data) {
          return data?.topicBusinessInfo?.body?.links.entries.block;
        }

        if ('topicPerson' in data) {
          return [data?.topicPerson];
        }

        if ('topicProduct' in data) {
          return [data?.topicProduct];
        }

        return [];
      })();

      await Promise.all([
        ...prefetchPromiseArr({
          inputArr,
          locale,
          queryClient,
        }),
      ]);
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default SlugPage;
