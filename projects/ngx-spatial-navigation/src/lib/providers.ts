import { Provider } from '@angular/core';

/**
 * Provides spatial navigation functionality.
 * This is the modern way to initialize the library in Angular 19+ applications.
 */
export function provideSpatialNavigation(): Provider[] {
    return [
        // Add any global providers here if needed in the future
        // For now, the directives are standalone, so this is mainly for consistency
        // and potential future global configuration.
    ];
}
