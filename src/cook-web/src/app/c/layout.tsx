'use client';

// Probably don't need this.
// import 'core-js/full';

import './layout.css';
import { shifu } from '@/c-service/Shifu';
import '@/c-utils/pollyfill';
import './ShiNiang/index';
import { useEffect } from 'react';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Install plugins when running on the client
    if (typeof window !== 'undefined' && window['shifuPlugins']) {
      for (const plugin of window['shifuPlugins']) {
        shifu.installPlugin(plugin);
      }
    }
  }, []);

  return <>{children}</>;
}
