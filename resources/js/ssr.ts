import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true });
            return pages[`./Pages/${name}.svelte`];
        },
    }),
);

