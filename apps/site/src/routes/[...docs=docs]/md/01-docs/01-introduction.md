# Introduction

## Purpose

_highsea_ is a color palette generator for [tailwindcss](https://**tailwind**css.com/docs/customizing-colors)

It all started with this quote from the docs:

> If you’re wondering how we automatically generated the 50–950 shades of each color, bad news — color is complicated and to get the absolute best results we picked all of Tailwind’s default colors by hand, meticulously balancing them by eye and testing them in real designs to make sure we were happy with them.

It felt obvious that while the colors were meticulous balance must have had an underlying system. If these colors were deemed best, there must have been a reason while the **tailwind** designers thought they were best - so the original point was to find that reason.

**highsea** will help you generate a color palette that seamlessly integrates within the **tailwind** colors, so that you can use them in conjunction if one of the base colors fits into your design.

## Roadmap

### Upgrading grays

Due to the lower number of data points, generating grays is more complicated. Furthermore, `neutral` has been excluded from the interpolation mechanism as its `H` is set to `0` but could be any value since `S` is also set to `0`. Consequently it schews the computations by considering it to be a reddish color. As is however, gray generation does work and allows generation of other hues that fit; it's just not as intellectually satisfactory ;)

More work is planned to study grays deeper, but due to the less saturated nature of this range, it is possible that a more thorough system will result in barely different grays, a couple extra points here or there may not make for a difference that is humanly percievable. Upside is you can use them anyway, no revolution is coming.

### Alternative base palette

Moving forward, **highsea** will offer an alternative palette to the base **tailwind** one. This will be based on the learnings of deconstructing the original palette, and automating the generation to a more rationalized design. While they will not be _quite as seamlessly_ interating with the **tailwind**, the differences will be very minor so both palettes should easily work together.
