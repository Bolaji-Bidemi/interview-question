import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './your-redux-store'; // Replace with your Redux store import
import App from './App';

describe('App', () => {
  it('renders the table with user data', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Verify that the table headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();

    // Assuming you have test data, verify that the table body is populated correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('www.example.com')).toBeInTheDocument();
  });

  it('updates the search term and filters users', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Update the search input and verify the table is updated accordingly
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    // Verify that the filtered user data is rendered correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();

    // Verify that other users are not rendered
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('janesmith')).not.toBeInTheDocument();
  });


});
