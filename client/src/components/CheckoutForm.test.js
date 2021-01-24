import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('form header renders', () => {
  render(<CheckoutForm />);

  const header = screen.getByText(/checkout form/i);

  expect(header).toBeInTheDocument();
});

test('form shows success message on submit with form details', async () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const addressInput = screen.getByLabelText(/address/i);
  const cityInput = screen.getByLabelText(/city/i);
  const stateInput = screen.getByLabelText(/state/i);
  const zipInput = screen.getByLabelText(/zip/i);
  const checkoutBtn = screen.getByText(/checkout/i, { selector: 'button' });

  await userEvent.type(firstNameInput, 'test');
  await userEvent.type(lastNameInput, 'success');
  await userEvent.type(addressInput, '123 Hello Wld');
  await userEvent.type(cityInput, 'us');
  await userEvent.type(stateInput, 'earth');
  await userEvent.type(zipInput, '56789');

  expect(firstNameInput).toHaveValue('test');
  expect(lastNameInput).toHaveValue('success');
  expect(addressInput).toHaveValue('123 Hello Wld');
  expect(cityInput).toHaveValue('us');
  expect(stateInput).toHaveValue('earth');
  expect(zipInput).toHaveValue('56789');

  await userEvent.click(checkoutBtn);

  const successMessage = screen.getByTestId('successMessage');

  if (successMessage) await expect(successMessage).toBeInTheDocument();
});
