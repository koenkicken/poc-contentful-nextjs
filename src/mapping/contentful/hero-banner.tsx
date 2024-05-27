import styles from '../../components/features/decoupled-components/hero-banner/hero-banner.module.scss';

import {ButtonProps} from '@src/components/features/decoupled-components/button/button.typings';
import {DescriptionProps} from "@src/components/features/decoupled-components/description/description.typings";
import {Teaser} from '@src/components/features/decoupled-components/teaser/teaser';
import {TitleProps} from '@src/components/features/decoupled-components/title/title.typings';
import {
  ComponentHeroBannerFragment
} from '@src/data/contentful/hero-banner/__generated/hero-banner.generated';
import {HeroBanner} from '@src/components/features/decoupled-components/hero-banner';


// would it be a good idea to use a state and manage that state through the mapping, then?
// wouldn't this be overkill, since it would mostly be static data? is there another way to easily decouple the data from the components?
// how about ssg? will this work?
/* export const HeroBanner = (props: ComponentHeroBannerFragment) => {
  const { backgroundImage , title, subtitle, buttonText, buttonUrl} = props;
  const titleProps: TitleProps = {
    title: title as string,
    heading: 'h1'
  };

  const descriptionProps: DescriptionProps = {
    description: subtitle as string,
    descriptionClasses: 'mt-6 mb-5 text-xl text-white max-w-xl'
  }

  const buttonProps: ButtonProps = {
    buttonText: buttonText as string,
    buttonUrl: buttonUrl as string,
    // buttonClasses: styles.hero_button // 'mt-6 bg-blue-500 px-5 py-3.5 text-base text-white'
  }

  return (
    <div className={styles.hero_banner}
         style={{ backgroundImage: `url(${backgroundImage?.url})` }}
    >
      <Teaser
        titleProps={titleProps}
        descriptionProps={descriptionProps}
        buttonProps={buttonProps}
      />
    </div>
  )
}; */

console.log("is this mapping actually used?");
