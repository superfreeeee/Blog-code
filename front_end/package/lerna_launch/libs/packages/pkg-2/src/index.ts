import { greetingPkg1 } from 'superfree-testpkg-1';

export const greetingPkg2 = () => {
  console.log(`[greetingPkg2] addition`);
  greetingPkg1('@youxiantest/pkg-2');
  console.log('[greetingPkg2] invoke greetingPkg2 from @youxiantest/pkg-2');
};
