import entries from '../routes/[...docs=docs]/md/entries.json';

export const match = (docs) => entries.includes(docs);
