'use client';

import { Component, ReactNode } from 'react';
import ErrorText from '@/components/shared/ErrorText';

type Props = { children: ReactNode };
type State = { hasError: boolean, error: Error | null };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Component error:', error);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorText reset={this.reset} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
