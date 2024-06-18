"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SignUpSuccessContent = dynamic(() => import('./SignUpSuccessContent'), { suspense: true });

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpSuccessContent />
    </Suspense>
  );
}
