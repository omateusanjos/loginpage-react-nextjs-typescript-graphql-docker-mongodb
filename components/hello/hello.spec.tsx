import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Hello } from '.';

describe('Hello', () => {
    it('should render Hello', () => {
        render(<Hello />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});

