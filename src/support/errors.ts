/**
 * Custom error thrown when an element cannot be found in the DOM
 */
export class ElementNotFoundError extends Error {
    constructor(selector: string) {
        super(`Element not found: ${selector}`);
        this.name = 'ElementNotFoundError';
    }
}

/**
 * Custom error thrown when navigation fails
 */
export class NavigationError extends Error {
    constructor(url: string) {
        super(`Failed to navigate to: ${url}`);
        this.name = 'NavigationError';
    }
}

/**
 * Custom error thrown when an operation times out
 */
export class TimeoutError extends Error {
    constructor(action: string, selector: string, timeout: number) {
        super(`Timeout after ${timeout}ms waiting for ${action} on element: ${selector}`);
        this.name = 'TimeoutError';
    }
}

/**
 * Custom error thrown when an element is not interactable (not visible, disabled, etc.)
 */
export class ElementNotInteractableError extends Error {
    constructor(action: string, selector: string) {
        super(`Element not interactable for ${action}: ${selector}`);
        this.name = 'ElementNotInteractableError';
    }
}

/**
 * Custom error thrown when text content operations fail
 */
export class TextContentError extends Error {
    constructor(selector: string, expected?: string, actual?: string) {
        const message = expected
            ? `Text content mismatch on ${selector}. Expected: "${expected}", Actual: "${actual}"`
            : `Failed to get text content from: ${selector}`;
        super(message);
        this.name = 'TextContentError';
    }
}

/**
 * Custom error thrown when form validation fails
 */
export class ValidationError extends Error {
    constructor(field: string, value: string, reason: string) {
        super(`Validation failed for ${field} with value "${value}": ${reason}`);
        this.name = 'ValidationError';
    }
}