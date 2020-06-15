import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders input', () => {
  const { getByPlaceholderText } = render(<App />);
  const inputElement = getByPlaceholderText(/type anything/i);
  
  expect(inputElement).toBeInTheDocument();
});

test('renders list', () => {
  const { getByRole } = render(<App />);
  const ulElement = getByRole('list');
  
  expect(ulElement).toBeInTheDocument();
});
