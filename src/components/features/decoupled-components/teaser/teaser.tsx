import styles from './teaser.module.scss';

import { Button } from '@src/components/features/decoupled-components/button/button';
import { Description } from '@src/components/features/decoupled-components/description/description';
import { TeaserProps } from '@src/components/features/decoupled-components/teaser/teaser.typings';
import { Title } from '@src/components/features/decoupled-components/title/title';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';


export const Teaser = (props: TeaserProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: props.id });
  return <div className={`${styles.teaser || ''} ${props.teaserClasses || ''}`}>
    { props.iconUrl ?
      <a href={props.iconUrl}>
        { props.icon &&
            <img
              className={styles.teaser__icon}
              alt="icon"
              src={props.icon.url}
              {...inspectorProps({ fieldId: 'image' })}
            />
        }
      </a>
      :
        props.icon &&
          <img
            className={styles.teaser__icon}
            alt="icon"
            src={props.icon.url}
            {...inspectorProps({ fieldId: 'image' })}
          />
    }
    <div className={styles.teaser__content}>
      <div className={styles.teaser__info}>
          <Title {...props.titleProps} />
          { props.subTitleProps &&
            <Title {...props.subTitleProps} />
          }
          <Description {...props.descriptionProps} />
      </div>
      { props.buttonProps &&
        <Button {...props.buttonProps} />
      }
    </div>
  </div>;
};
