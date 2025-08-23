import { useState } from 'react';
import styled from 'styled-components';
import { DataBridgeVersion, RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

import { mockProductReviews } from '../../../data/mockProductReviews';
import { ThemeWrapper } from '../components/theme-wrapper';
import { Stars } from '../components/stars';
import { ReviewForm } from '../components/review-form';
import { Button } from '../components/button';

const rating = Math.round(
  mockProductReviews.reduce((acc, review) => acc + review.rating, 0) / mockProductReviews.length
);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US');
};

const Primary: RemoteBoundaryComponent = () => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  return (
    <ThemeWrapper>
      <>
        <ReviewSummary data-testid='review-summary'>
          <Stars rating={rating} testId='review-stars' />
          <strong data-testid='review-count'>{mockProductReviews.length} reviews</strong>
          {!isReviewFormOpen && (
            <Button onClick={() => setIsReviewFormOpen(true)} data-testid='submit-review-button'>
              Submit a review
            </Button>
          )}
        </ReviewSummary>

        {isReviewFormOpen && (
          <ReviewFormWrapper data-testid='review-form-wrapper'>
            <ReviewForm />
          </ReviewFormWrapper>
        )}

        <ul data-testid='reviews-list'>
          {mockProductReviews.map((review) => (
            <ReviewItem key={review.id} data-testid={`review-item-${review.id}`}>
              <ReviewHeader>
                <Stars rating={review.rating} size={16} />
                <strong>{review.author}</strong>
                <time dateTime={review.date}>{formatDate(review.date)}</time>
              </ReviewHeader>
              <ReviewContent>{review.description}</ReviewContent>
            </ReviewItem>
          ))}
        </ul>
      </>
    </ThemeWrapper>
  );
};

Primary.DataBridgeVersion = DataBridgeVersion;

export default Primary;

const ReviewSummary = styled.div`
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[16]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
`;

const ReviewItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
`;

const ReviewHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing[16]};
`;

const ReviewFormWrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
`;

const ReviewContent = styled.div`
  margin: ${({ theme }) => theme.spacing[8]} 0;
`;
