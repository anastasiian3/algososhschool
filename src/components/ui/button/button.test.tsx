import React from 'react';
import { Button } from './button';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

describe('test if component button works properly', () => {
  it('component button has text', () => {
    const button = renderer.create(<Button text={'text'} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('component button has no text', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('component button is disabled', () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('component button is loading', () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('component button can be clicked', () => {
    const onClick = jest.fn();
    render(
      <Button
        text='text'
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
