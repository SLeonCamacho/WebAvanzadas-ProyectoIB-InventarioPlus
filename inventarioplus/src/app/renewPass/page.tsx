"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const RenewPassContent = dynamic(() => import('./RenewPassContent'), { suspense: true });

export default function RenewPassPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenewPassContent />
    </Suspense>
  );
}
