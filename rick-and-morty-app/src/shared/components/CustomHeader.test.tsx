import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {

    const title = 'Rick and Morty Explorer';
    
    test('should render the title correctly', () => {
        render(<CustomHeader title={title} />);
        expect(screen.getByText(title)).toBeDefined();
    });

    test('should render the description when provided', () => {
        const description = 'Encuentra a tus personajes favoritos';
        render(<CustomHeader title={title} description={description}/>);
        
        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });
    
    test('should not render description when not provided', () => {
        const { container } = render(<CustomHeader title={title}/>);

        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        
        expect(h1?.innerHTML).toBe(title);
        
        const p = divElement?.querySelector('p');
        expect(p).toBeNull();   
    });

    test('should match the snapshot', () => {
        const description = 'Encuentra a tus personajes favoritos';
        const { asFragment } = render(
            <CustomHeader title={title} description={description} />
        );
        
        expect(asFragment()).toMatchSnapshot();
    });
});