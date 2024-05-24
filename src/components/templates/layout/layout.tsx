import { CssBaseline, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import React, { useState, useEffect, ReactElement } from 'react';

import { Header } from '../header';
import React, { useEffect, ReactElement, useState } from 'react';
import { Header } from '@src/mapping/contentful/header';

import { CtfFooterGql } from '@src/components/features/ctf-components/ctf-footer/ctf-footer-gql';


const useStyles = makeStyles((theme: Theme) => ({
  content: {
    ...theme.typography.body1,
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface LayoutPropsInterface {
  preview: boolean;
  children: ReactElement[];
}

export const Layout: React.FC<LayoutPropsInterface> = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {

    router.events.on('routeChangeComplete', () => {
      if (document.activeElement === null) {
        return;
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, [router.events]);

  return (
    <>
      <CssBaseline />

      {/* content */}
      <div className={classes.content}>{children}</div>

      <CtfFooterGql/>
    </>
  );
};
