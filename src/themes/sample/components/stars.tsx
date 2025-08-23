import styled from 'styled-components';
import { Star } from '../assets/star';
import { VisuallyHidden } from './visually-hidden';

type StarsProps = {
  rating: number;
  size?: number;
  testId?: string;
};

export const Stars = ({ rating, size = 32, testId }: StarsProps) => {
  return (
    <StarRating data-testid={testId}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} height={size} width={size} $isActive={index < rating} />
      ))}
      <VisuallyHidden>{rating}/5 stars</VisuallyHidden>
    </StarRating>
  );
};

const StarRating = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const StarIcon = styled(Star)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.blue[500] : theme.colors.gray[100])};
`;
