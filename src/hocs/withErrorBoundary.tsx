import { ComponentType } from 'react';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

const withErrorBoundary = <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

export default withErrorBoundary;
