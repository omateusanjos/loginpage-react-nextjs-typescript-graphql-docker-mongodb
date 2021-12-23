import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';


describe('Form', () => {
    it('should render Form', () => {
        render(<Form />);
        expect(screen.getByText('Exibir')).toBeInTheDocument();
    });
});

