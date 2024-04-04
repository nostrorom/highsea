# Staff Software Engineer at Tailwind Labs

## Introduction

Hi Adam, and hi to you too, other reader of this page whose name is unknown to me !

I'm Arnaud, and here is my application to the position of Staff Software Engineer - I'm an early convert to Tailwind and would be thrilled to work at the Labs.

So here are my take on the things you were interested in:

### What you’re excited about, and the work you’d be most looking forward to in this role.

If there's a key thread running through my life, it's a constant desire to dicover, understand, learn and experience new things about:

- the world: like riding solo on a motorbike from France to Kyrgyzstan, Navy Officer in the South Pacific
- people: learning foreign language (6-10ish depending on how you count) delving into history
- science: checkout documentaries on Rosetta Mission, PBS Spacetime (quantum physics)
- myself: business consultant, seaman, coach, actor, developer

Probably the most thrilling aspect of software development are the infinite learning opportunities and the constant evolutions; and I do appreciate that KISS is not that S, as in many things achieving simplicity and conciseness is more challenging than writing a bajillion lines of code.

In particular I have a fondness for Svelte, Tailwind and Rust. I adopted Tailwind since v2.something, and it has always made me want to tinker with. Very soon after I have started working on an app called highsea (hehehe) to have more flexibility - as many side-projects it has remained for personal use and not (yet) taken off to conquer the world.

I have revived it these past days, as it is relevant to this open position. The UI is very much so-so (alright, downright ugly - but my focus was on functionality), but the key ideas are:

- automate color range creation
- improve `markdown` integration

### Interesting projects you’ve worked on, especially things that are relevant to the work we do here.

Well, **highsea** is the most relevant, discussed more in details here. I started it years ago whn I read _bad news — color is complicated and to get the absolute best results we picked all of Tailwind’s default colors by hand_ and thought _challenge accepted_.

There are two key aspects:

#### Color Palette Generator

The idea is to enable people to fill the gaps in the color range (eg, more shades of green), while integrating seamlessly with the Tailwind range. Right now this is done by finding the `H` values of the neighbouring tailwind, then interpolating the `S` and `L` for the rest of the range.

There is a discernable pattern for where the hand-crafted colors change, for a given shade eg `300`, you can see the `S,L` tuple vary along the `H` variation, getting lower in the neonish hues (yellows, greens, cyans) and higher in the more muted tones (reds, purples, blues) to achieve the same _perception_ of brightness.

I am fully certain that there is a way to automate these variations by going more in to color theory and mathematics. I have [this article](https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html) bookmarked for future reference.

#### Markdown/Tailwind

Making use of `prose` from `@tailwind/typography`, I wanted to be able to conveniently define my `md` styles and safelist them. The safelist is less necessary here, but I am working on ways to enable more variability (eg `bg-${mycolor}`) and safelist it to protect from the purge.

Here it's actually managed in a config object, more readable for all the tag definitions, from which you can extract a safelist and then apply in the component:

```ts
// highsea config
const config = {
	h1: 'font-bold text-2xl pt-10',
	h2: 'pt-12 pb-4 text-xl font-bold text-indigo-600',
	h3: 'text-2xl pt-6 pb-1 mb-4 border-b border-gray-300 dark:border-gray-800 ',
	h4: 'text-2xl pt-4 pb-2 opacity-50',
	p: 'py-2',
	a: 'text-amber-400 text-indigo-600 hover:border-b border-amber-400 dark:border-indigo-600',
	// ...
};

export const prose = prosify(config);

export const safelist = prose.split(' ');

// in tailwind.config.js
import { safelist } from './src/styles/md';

/** @type {import('tailwindcss').Config} */
export default {
	//...
	plugins: [require('@tailwindcss/typography')],
	safelist,
	// ...
};
```

#### Other projects

Other than that, I have been working for the past two years at [radiofrance](https://www.radiofrance.fr/), to rewrite from scratch the audio player. A splendid project, having fun with a lot of modern tools (Svelte, Vite, Typescript, GraphQL, Turborepo, Changesets, GitlabCI), working on a very high volume product (millions of users) with a focus on lightness, robustness and speed. It's a great working environment, with an emphasis on experimentation, thinking and conception.

### Open-source contributions, whether it’s your own project, a pull request you’re proud of, or a well-written bug report you filed.

Highsea is still meant to be one, whether this application pans out or not I'll bring it forward. My FOSS-fu is still pretty weak, I guess deep down the impostor syndrome is holding me back. I'm keeping an eye on [histoire](https://github.com/histoire-dev/histoire) and would like to help it grow - it hits the right stack for me (Svelte/Vite/Tailwind).

I have some inner-source contributions at radiofrance that I'm happy about, contributing other teams on my free time, mostly with DX (automation like [danger](https://danger.systems/js/), CI pipelines, release workflows [changesets](https://github.com/changesets/changesets))

I have also sparked several Svelte meetups in Paris, including one at radiofrance, and I'd like to make the community more active.

Lastly, not a PR but I was happy I made this post [advocating for legacy compatibility](https://github.com/sveltejs/kit/pull/6265), sadly to no avail so far, but I won't let it die down and will take up this svelte/vite-plugin-legacy issue at some point.

### Previous experience, especially any leadership responsibilities you’ve held in other roles.

At 24 I was an Officer of the Watch in the French Navy, with the responsibility of steering a warship and leading teams during exercises, a great experience! I've had various opportunities in consulting and development to lead some juniors, and I am also coaching groups of corporate employees in interpersonal skills, public speaking and self-confidence.

Key qualities (so I have been told) is being reassuringly calm even in stressful situations, analytical and creative in finding solutions, able to defuse tensions and support people's growth.

### Technical writing, like blog posts you’ve published or documentation you’ve worked on.

Most of the examples I have are client work at radiofrance, so I can't really share them, but this working on documentation was my incentive to think about `markdown` and Tailwind together. I did not want a separate website like Docusaurus, so I wanted to integrate that into some pages of the website; and I wanted to use Tailwind because I like it and did not want to spend my time writing CSS. I think the end-goal is to make my own SSG with markdown, Svelte and Tailwind - because it's been a lot of fun so far. This lead me to the wonderful world of unified/remark/rehype, and I have managed intagration with [shiki](https://shiki.style/) (code highlighting) and [twoslash](https://twoslash.netlify.app/) (type information like in the typescript docs). Next step is integrating with [mdsvex](https://mdsvex.pngwn.io/docs), to have components in my markdown... and then I'm almost done making an homegrown version of [Astro](https://astro.build/).
