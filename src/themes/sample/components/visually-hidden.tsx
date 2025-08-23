import React from 'react';
import styled from 'styled-components';

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export function VisuallyHidden({ children }: VisuallyHiddenProps): JSX.Element {
  return <StyledVisuallyHidden>{children}</StyledVisuallyHidden>;
}

const StyledVisuallyHidden = styled.span`
  border-width: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
