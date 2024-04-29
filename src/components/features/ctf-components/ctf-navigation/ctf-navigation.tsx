import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { NavigationFieldsFragment } from './__generated/ctf-navigation.generated';
import { getLinkDisplayText, getLinkHrefPrefix } from './utils';

import { Link } from '@src/components/shared/link';
import { forEach } from 'lodash';

const useStyles = makeStyles((theme: Theme) => ({
  languageIcon: {
    color: '#ff6900',
  },
  menu: {
    alignItems: 'center',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  menuItem: {
    color: '#084772',
    paddingTop: '24px',
    alignItems: 'center',
    cursor: 'default',
    display: 'inline-flex',
    fontSize: '1.4rem',
    fontWeight: 400,
    height: '8rem',
    lineHeight: 1.9,
    marginRight: theme.spacing(8),
    position: 'relative',

    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(9),
    },

    '& a': {
      cursor: 'pointer',
      display: 'inline-block',
      transition: 'transform 0.2s ease-in-out',
    },

    '&:hover, &:focus, &:focus-within': {
      '& > a': {
        transform: 'translateY(-4px)'
      },
      '& $submenu': {
        opacity: 1,
        pointerEvents: 'all',
        transform: 'translateY(0)',
      },
    },
    '& img:hover': {
      cursor: 'pointer'
    }
  },
  submenu: {
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px #00000029',
    borderRadius: '14px',
    left: theme.spacing(10 * -1),
    listStyle: 'none',
    opacity: 0,
    padding: theme.spacing(4, 10),
    pointerEvents: 'none',
    position: 'absolute',
    top: 'calc(100% - 2rem)',
    transform: 'translateY(20%)',
    transition: 'all 0.3s ease-in-out',
  },
  submenuItem: {
    '&:hover, &:focus, &:focus-within': {
      '& > a': {
        transform: 'translateY(-4px)',
      },
    },
  },
}));

export const CtfNavigation = (props: NavigationFieldsFragment) => {
  const classes = useStyles();
  const inspectorMode = useContentfulInspectorMode();

  const navigationContent = props.items[0] as any;

  const renderNavigationLinks = (menuGroup, listClassName) => {
    return menuGroup?.items?.map(menuItem => {
      const href = getLinkHrefPrefix(menuItem);
      const linkText = getLinkDisplayText(menuItem);

      return (
        <li
          key={menuItem.sys.id}
          className={listClassName}
          {...inspectorMode({
            entryId: menuItem.sys.id,
            fieldId: 'pageName',
          })}
        >
          <Link href={href}>{linkText}</Link>
        </li>
      );
    });
  };

  const navigationItems: any[] = [];
  const languageItems: any[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  navigationContent?.menuItemsCollection?.items.forEach((item) => {
      if (item.groupName && (item.children || item.link)) {
        navigationItems.push(item);
      } else {
        languageItems.push(item);
      }
  });

  return (
    <>
      {navigationContent?.menuItemsCollection?.items.length && (
        <nav role="navigation">
          <ul className={classes.menu}>
            {navigationItems.map (
              menuItem =>
                  <li
                    key={menuItem.sys.id}
                    className={classes.menuItem}
                    {...inspectorMode({
                      entryId: menuItem.sys.id,
                      fieldId: 'groupName',
                    })}
                  >
                    {!menuItem.link ? (
                      menuItem.groupName
                    ) : (
                      <Link href={`/${menuItem.link.slug}`}>{menuItem.groupName}</Link>
                    )}
                    {!menuItem.link && menuItem.children && (
                      <ul className={classes.submenu}>
                        {renderNavigationLinks(menuItem.children, classes.submenuItem)}
                      </ul>
                    )}
                  </li>
            )}
            {languageItems.map(
              languageItem =>
                <li
                  key={languageItem.sys.id}
                  className={classes.menuItem}
                  {...inspectorMode({
                    entryId: languageItem.sys.id,
                    fieldId: 'groupName',
                  })}>
                  <img src={languageItem.localeImage.url} alt={languageItem.locale} width="16" height="11"/>
                </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};