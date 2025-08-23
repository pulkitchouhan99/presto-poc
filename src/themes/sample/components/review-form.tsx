import { useState, FormEvent } from 'react';
import styled, { css } from 'styled-components';

import { Button } from './button';

export const ReviewForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ReviewSubmitted>Thank you for your review!</ReviewSubmitted>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor='rating'>Rating</Label>
        <Select id='rating'>
          <option value='5'>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor='title'>Title</Label>
        <Input type='text' id='title' />
      </FormGroup>

      <FormGroup>
        <Label htmlFor='description'>Description</Label>
        <Textarea id='description' />
      </FormGroup>

      <FormGroup>
        <Label htmlFor='author'>Author</Label>
        <Input type='text' id='author' />
      </FormGroup>

      <Button type='submit'>Submit</Button>
    </Form>
  );
};

const Form = styled.form`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
  max-width: 400px;
`;

const FormGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  width: 100%;
`;

const Label = styled.label`
  cursor: pointer;
  display: block;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: bold;
  padding-top: ${({ theme }) => theme.spacing[8]};
  width: 80px;
`;

const inputStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  flex: 1;
  padding: ${({ theme }) => theme.spacing[8]};

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue[500]};
    outline: none;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}
  height: 160px;
`;

const ReviewSubmitted = styled.div`
  background: ${({ theme }) => theme.colors.blue[500]};
  padding: ${({ theme }) => theme.spacing[8]};
`;
