import { type Rect } from "../../utils";

/**
 * @internal
 */
export interface ListboxOptions {
    readonly itemHeight: number;
    readonly numOfItems: number;
    verticalSpacing: number;
}

/**
 * @internal
 */
export interface ListboxRect {
    readonly top: number;
    readonly left: number;
    readonly width: number;
    readonly height: number;
}

interface HTMLElementLike {
    getBoundingClientRect(): DOMRect;
}

interface WindowLike {
    readonly scrollY: number;
    readonly scrollX: number;
}

interface DocumentElementLike {
    readonly clientHeight: number;
}

/**
 * Calculates the number of whole items which fits into this height. The result
 * is clamped to a maximum of 7 items.
 *
 * @internal
 */
export function numItems(
    itemHeight: number,
    availableHeight: number,
    verticalSpacing: number,
): number {
    const itemsFit = Math.floor(
        (availableHeight - verticalSpacing) / itemHeight,
    );

    return Math.min(itemsFit, 7);
}

/**
 * @internal
 */
export function tryBelow(
    itemHeight: number,
    numOfItems: number,
    anchor: Pick<Rect, "x" | "y" | "width" | "height">,
    viewport: Pick<Rect, "y" | "height">,
    verticalSpacing: number,
): ListboxRect | undefined {
    /*
     *    Viewport
     *    +-----------------+ <--- (viewport.y)
     *    |                 |
     *    |   +---------+   | <--- (anchor.y)
     *    |   | Anchor  |   |
     *    |   +---------+   | <--- p2
     *    |                 |
     *    +-----------------+ <--- p1
     */
    const p1 = viewport.y + viewport.height;
    const p2 = anchor.y + anchor.height;
    const availableHeight = p1 - p2;
    const itemsFit = numItems(itemHeight, availableHeight, verticalSpacing);

    if (itemsFit < 3) {
        return undefined;
    }

    const fittedHeight = itemHeight * Math.min(numOfItems, itemsFit);

    return {
        left: anchor.x,
        top: anchor.y + anchor.height,
        width: anchor.width,
        height: fittedHeight,
    };
}

/**
 * @internal
 */
export function tryAbove(
    itemHeight: number,
    numOfItems: number,
    anchor: Pick<Rect, "x" | "y" | "width">,
    viewport: Pick<Rect, "y">,
    verticalSpacing: number,
): ListboxRect | undefined {
    /*
     *    Viewport
     *    +-----------------+ <--- p1
     *    |                 |
     *    |   +---------+   | <--- p2
     *    |   | Anchor  |   |
     *    |   +---------+   |
     *    |                 |
     *    +-----------------+
     */
    const p1 = viewport.y;
    const p2 = anchor.y;
    const availableHeight = p2 - p1;
    const itemsFit = numItems(itemHeight, availableHeight, verticalSpacing);

    if (itemsFit < 3) {
        return undefined;
    }

    const fittedHeight = itemHeight * Math.min(numOfItems, itemsFit);

    return {
        left: anchor.x,
        top: anchor.y - fittedHeight - verticalSpacing,
        width: anchor.width,
        height: fittedHeight,
    };
}

/**
 * @internal
 */
export function computeListboxRect(
    anchor: HTMLElementLike,
    options: ListboxOptions,
    root: DocumentElementLike = document.documentElement,
    { scrollY, scrollX }: WindowLike = window,
): ListboxRect | undefined {
    const { itemHeight, numOfItems, verticalSpacing } = options;
    const rect = anchor.getBoundingClientRect();
    const anchorRect = {
        x: Math.floor(rect.x + scrollX),
        y: Math.floor(rect.top + scrollY),
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
    };
    const viewportRect = {
        y: scrollY,
        height: root.clientHeight,
    };

    const below = tryBelow(
        itemHeight,
        numOfItems,
        anchorRect,
        viewportRect,
        verticalSpacing,
    );
    if (below) {
        return below;
    }

    const above = tryAbove(
        itemHeight,
        numOfItems,
        anchorRect,
        viewportRect,
        verticalSpacing,
    );
    if (above) {
        return above;
    }

    return undefined;
}
