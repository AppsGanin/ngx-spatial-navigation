const KEY_CODE_MAP: Record<number, string> = {
    37: 'left',   // ArrowLeft
    39: 'right',  // ArrowRight
    38: 'up',     // ArrowUp
    40: 'down',   // ArrowDown
};

interface ElementCoordinates {
    top: number;
    bottom: number;
    left: number;
    right: number;
    centerX: number;
    centerY: number;
}

function getElementCoordinates(element: HTMLElement): ElementCoordinates {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
    };
}

function isFocusable(element: HTMLElement): boolean {
    // Check if element has navFocusable directive
    if (element.hasAttribute('navFocusable')) {
        return !element.classList.contains('lrud-ignore');
    }

    // Check if element is naturally focusable
    const focusableElements = [
        'a', 'button', 'input', 'select', 'textarea',
        'area', 'iframe', '[tabindex]'
    ];

    const tagName = element.tagName.toLowerCase();
    if (focusableElements.includes(tagName)) {
        return element.offsetParent !== null;
    }

    return element.hasAttribute('tabindex') && element.offsetParent !== null;
}

function getAllFocusableElements(scope: HTMLElement): HTMLElement[] {
    const focusableSelector = '[navFocusable], button, a, [tabindex], input, select, textarea, area, iframe';
    return Array.from(scope.querySelectorAll(focusableSelector)).filter(
        (element) => isFocusable(element as HTMLElement) && (element as HTMLElement).offsetParent !== null
    ) as HTMLElement[];
}

function calculateDistance(from: ElementCoordinates, to: ElementCoordinates, direction: string): number {
    switch (direction) {
        case 'left':
            if (to.right > from.left) return Infinity;
            const leftDistance = from.left - to.right;
            const leftVerticalDistance = Math.abs(from.centerY - to.centerY);
            return leftDistance + leftVerticalDistance * 0.5;

        case 'right':
            if (to.left < from.right) return Infinity;
            const rightDistance = to.left - from.right;
            const rightVerticalDistance = Math.abs(from.centerY - to.centerY);
            return rightDistance + rightVerticalDistance * 0.5;

        case 'up':
            if (to.bottom > from.top) return Infinity;
            const upDistance = from.top - to.bottom;
            const upHorizontalDistance = Math.abs(from.centerX - to.centerX);
            const isDirectlyAbove = to.left < from.right && to.right > from.left;
            if (isDirectlyAbove) {
                return upDistance + upHorizontalDistance * 0.1;
            } else {
                return upDistance + upHorizontalDistance * 1.5;
            }

        case 'down':
            if (to.top < from.bottom) return Infinity;
            const downDistance = to.top - from.bottom;
            const downHorizontalDistance = Math.abs(from.centerX - to.centerX);
            const isDirectlyBelow = to.left < from.right && to.right > from.left;
            if (isDirectlyBelow) {
                return downDistance + downHorizontalDistance * 0.1;
            } else {
                return downDistance + downHorizontalDistance * 1.5;
            }

        default:
            return Infinity;
    }
}

export function getNextFocus(
    currentFocus: HTMLElement,
    keyCode: number,
    scope?: HTMLElement
): HTMLElement | null {
    const direction = KEY_CODE_MAP[keyCode];
    if (!direction) {
        return null;
    }

    const searchScope = scope || document.documentElement;
    const focusableElements = getAllFocusableElements(searchScope);

    if (focusableElements.length === 0) {
        return null;
    }

    const currentCoordinates = getElementCoordinates(currentFocus);
    let nextElement: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const element of focusableElements) {
        if (element === currentFocus) {
            continue;
        }

        const elementCoordinates = getElementCoordinates(element);
        const distance = calculateDistance(currentCoordinates, elementCoordinates, direction);

        if (distance < minDistance) {
            minDistance = distance;
            nextElement = element;
        }
    }

    return nextElement;
}

export function getFirstFocusableElement(scope?: HTMLElement): HTMLElement | null {
    const searchScope = scope || document.documentElement;
    const focusableElements = getAllFocusableElements(searchScope);

    if (focusableElements.length === 0) {
        return null;
    }

    focusableElements.sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        const aTop = aRect.top;
        const bTop = bRect.top;
        if (Math.abs(aTop - bTop) > 10) {
            return aTop - bTop;
        }
        return aRect.left - bRect.left;
    });

    return focusableElements[0];
}
