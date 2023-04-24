import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('test if component circle works properly', () => {
  it('component circle has no text', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle has letters', () => {
    const circle = renderer.create(<Circle letter={'letter'} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle has head element', () => {
    const circle = renderer.create(<Circle head={'head'} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle has react-element in head', () => {
    const circle = renderer.create(<Circle head={<Circle isSmall />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle has tail element', () => {
    const circle = renderer.create(<Circle tail={'tail'} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle has react-element in tail', () => {
    const circle = renderer.create(<Circle tail={<Circle isSmall />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle has index', () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle is small', () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle is in default state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle is in changing state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('component circle is in modified state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
