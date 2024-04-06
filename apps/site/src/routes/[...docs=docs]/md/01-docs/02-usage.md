# Usage

## Basic concept

As explained in [deconstruction](https://highsea.vercel.app/docs/deconstruction), the best way to reason about **tailwind** colors it through `(H,S,L)` variation.

A color is defined by its base `hue` at shade `500`, then across the range there are slight variations of `H`, but mostly the key definition of the next shade is the `S,L` tuple. Across the `hue` spectrum, there are adaptations so that eye perceptions are similar. Because of how color, screens and eyes work, a given _actual_ `lightness` will not translate to the same _percieved_ `lightness` based on where on the spectrum the `hue` fits. The TLDR is that for neonish colors (eg lime, yellow, cyan), the `S,L` have to be toned down, while for more muted colors (eg red, orange, purple) they have to be toned up.

## Generating a color

It is as simple as picking a `hue` on the spectrum - it corresponds to the `H` value used for shade `500`, and the rest of the range is automatically creating by interpolating with the two neighbouring **tailwind** colors

## Generating a palette

If you are satisfied with the color displayed in the picker, you can add it to you palette. The **tailwind** colors are also provided so that you can add them to your palette and see how they look together with your base colors.

## Integration in your project

The `HEX` codes are made available for you to copy in your `tailwind.config.js` file, exaclty where depends if you want to extend or override the base colors.
