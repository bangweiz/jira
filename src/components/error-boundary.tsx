import { Component, PropsWithChildren, ReactElement } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;

interface Props {
  fullbackRender: FallbackRender;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fullbackRender, children } = this.props;
    if (error) {
      return fullbackRender({ error });
    } else {
      return children;
    }
  }
}
