/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import user from '@/router/user';
import common from '@/router/common';

export default function RouterView() {
  const routing = useRoutes([
    ...common,
    ...user,
    {path: '*', element: <Navigate to='/404' />},
  ]);

  return <div id="wrapper">{routing}</div>;
}


