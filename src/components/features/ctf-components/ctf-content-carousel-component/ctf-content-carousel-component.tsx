'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// eslint-disable-next-line import/no-unresolved
import { Pagination } from 'swiper/modules';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  ComponentContentCarouselFieldsFragment
} from '@src/components/features/ctf-components/ctf-content-carousel-component/__generated/ctf-content-carousel-component.generated';
import CtfTextBanner
  from '@src/components/features/ctf-components/ctf-content-text-banner-component/ctf-content-text-banner-component';


// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved

export const CtfContentCarouselComponent = (
  props: ComponentContentCarouselFieldsFragment,
) => {
  const {
    title,
    subtitle,
    blockBody,
    block2Body,
    block3Body,
    blockImage,
    block2Image,
    block3Image,
  } = props;
  const combinedData = [
    {
      image: blockImage,
      body: blockBody,
      id: 'my-id',
    },
    {
      image: block2Image,
      body: block2Body,
      id: 'another-id',
    },
    {
      image: block3Image,
      body: block3Body,
      id: 'last one',
    },
  ];
  return (
    <div className="p-14">
      <CtfTextBanner
        title={title as string}
        description={subtitle as string}
       />
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mt-6 h-auto w-full"
      >
        {combinedData?.map((entry: any) => (
          <SwiperSlide className="w-full px-4 pb-10" key={entry.id}>
            <div className="flex flex-col justify-center gap-x-36 md:flex-row">
              <img
                className="mx-auto pb-6 md:mx-0 md:pb-0"
                src={entry.image?.url}
                width="200px"
                height="200px"
                alt="alt"
              />
              <div className="my-auto flex w-[545px] flex-col gap-4 px-14 md:px-0 ">
                <h4 className="font-semibold primary-color">
                  Guillaume Tran Thahn
                </h4>
                <p className="font-semibold">
                  Head of Software Development – Dassault Aviation
                </p>
                <div className="text-s">
                  {documentToReactComponents(entry.body?.json)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
