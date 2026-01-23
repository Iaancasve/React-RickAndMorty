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
        // Verifica que el contenido del párrafo sea exactamente la descripción
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });
    
    test('should not render description when not provided', () => {
        const { container } = render(<CustomHeader title={title}/>);

        // Busca el contenedor con la clase específica que pide el test
        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        
        expect(h1?.innerHTML).toBe(title);
        
        // Verifica que no exista la etiqueta p si no hay descripción
        const p = divElement?.querySelector('p');
        expect(p).toBeNull();   
    });
});