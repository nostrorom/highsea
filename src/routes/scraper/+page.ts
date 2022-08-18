import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */

export const load:PageLoad = ({ params }) => {
  if (params.slug === 'hello-world') {
    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
    };
  }
 
  throw error(404, 'Not found');
}