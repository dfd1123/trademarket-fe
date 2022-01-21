/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import userRoutes from '@/router/userRoutes';
import commonRoutes from '@/router/common';

export default function RouterView() {
  const routing = useRoutes([
    ...commonRoutes,
    ...userRoutes,
    {path: '*', element: <Navigate to='/404' />},
  ]);

  return <>{routing}</>;
}


