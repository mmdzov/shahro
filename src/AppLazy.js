import React from 'react';

const EventsLazy = React.lazy(() => import('./page/Events/Events'));
const MediaLazy = React.lazy(() => import('./page/Media/Media'));
const PostLazy = React.lazy(() => import('./page/Post/Post'));

export { EventsLazy, MediaLazy, PostLazy };
