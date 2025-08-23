import { ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  background: ${({ theme }) => theme.colors.blue[500]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;
