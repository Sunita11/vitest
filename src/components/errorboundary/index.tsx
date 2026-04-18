import * as React from "react";

interface MyState {
  hasError: boolean;
}

interface MyProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}
class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStatefromError(error: MyState): MyState {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo.componentStack, React.captureOwnerStack());
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
