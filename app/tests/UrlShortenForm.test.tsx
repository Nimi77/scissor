import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UrlShortenForm from "../components/UrlShortenForm";

jest.mock('axios');

describe('UrlShortenForm Component', () => {
  it('renders the form correctly', () => {
    render(<UrlShortenForm />);
    expect(screen.getByPlaceholderText('Paste a link to shorten it')).toBeInTheDocument();
  });

  it('displays an error when an invalid URL is submitted', async () => {
    render(<UrlShortenForm />);
    fireEvent.change(screen.getByPlaceholderText('Paste a link to shorten it'), {
      target: { value: 'invalid-url' },
    });
    fireEvent.click(screen.getByText('Shorten'));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid URL.')).toBeInTheDocument();
    });
  });
});
