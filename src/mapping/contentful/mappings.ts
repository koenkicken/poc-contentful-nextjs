import dynamic from 'next/dynamic';

// mapping basically determines which mapping to use, so the origin of the dataset is set over here
// should we differentiate between the method of fetching the data? Should we use one by default?
// can the origin of the data be different based on conditions in this mapping?

export const componentMap = {
  Teaser: dynamic(() =>
    import(
      '@src/mapping/contentful/teaser'
      ).then((module) => module.Teaser),
  ),
  Testimonial: dynamic(() =>
    import(
      '@src/components/features/ctf-components/testimonial/ctf-testimonial'
      ).then((module) => module.CtfTestimonial),
  ),
  ImageCarousel: dynamic(() =>
    import(
      '@src/mapping/contentful/infinite-carousel'
      ).then((module) => module.InfiniteCarousel),
  ),
  TwoGrid: dynamic(() =>
    import(
      '@src/data/contentful/two-grid/ctf-two-grid'
      ).then((module) => module.CtfTwoGrid),
  ),
  HeroBanner: dynamic(() =>
    import(
      '@src/mapping/contentful/hero-banner'
      ).then((module) => module.HeroBannerComponent),
  ),
  SolutionSection: dynamic(() =>
    import(
      '@src/components/features/decoupled-components/solution/solution'
      ).then((module) => module.Solution),
  ),
  ReferenceClients: dynamic(() =>
    import(
      '@src/components/features/decoupled-components/reference-client/reference-client'
      ).then((module) => module.ReferenceClient),
  ),
  JoinUs: dynamic(() =>
    import(
      '@src/components/features/decoupled-components/join-us/join-us'
      ).then((module) => module.JoinUs),
  ),
};

export const componentGqlMap = {
  Teaser: dynamic(() =>
    import(
      '@src/data/contentful/teaser/ctf-teaser-gql'
      ).then((module) => module.CtfTeaserGql),
   ),
  Testimonial: dynamic(() =>
    import(
      '@src/components/features/ctf-components/testimonial/ctf-testimonial-gql'
      ).then((module) => module.CtfTestimonialGql),
  ),
  ImageCarousel: dynamic(() =>
    import(
      '@src/data/contentful/infinite-carousel/ctf-infinite-carousel-gql'
      ).then((module) => module.CtfInfiniteCarouselGql),
  ),
  TwoGrid: dynamic(() =>
    import(
      '@src/data/contentful/two-grid/ctf-two-grid-gql'
      ).then((module) => module.CtfTwoGridGql),
  ),
  // gql file is loaded, which loads the component with the data
  HeroBanner: dynamic(() =>
    /* import(
      '@src/data/contentful/hero-banner/hero-banner-gql'
      ).then((module) => module.HeroBannerGql),
     */
    import(
      '@src/mapping/contentful/hero-banner'
      ).then((module) => module.HeroBannerComponent),
  ),
  SolutionSection: dynamic(() =>
    import(
      '@src/data/contentful/solution/solution-gql'
      ).then((module) => module.SolutionGql),
  ),
  ReferenceClients: dynamic(() =>
    import(
      '@src/data/contentful/reference-client/reference-client-gql'
      ).then((module) => module.ReferenceClientGql),
  ),
  JoinUs: dynamic(() =>
    import(
      '@src/data/contentful/join-us/join-us-gql'
      ).then((module) => module.JoinUsGql),
  ),
};
