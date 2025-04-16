import { Suspense } from 'react';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Your404Component />
    </Suspense>
  );
}
