<script lang="ts">
    // https://github.com/sveltejs/svelte/issues/3088#issuecomment-505785516
    import { onMount, onDestroy } from 'svelte';
    let ref: HTMLDivElement;
    let portal: HTMLElement;

    onMount(() => {
        portal = document.createElement('div');
        portal.className = 'portal';
        document.body.appendChild(portal);
        portal.appendChild(ref);
    });

    onDestroy(() => {
        document.body.removeChild(portal);
    });
</script>

<div class="hidden">
    <div bind:this={ref}>
        <slot />
    </div>
</div>
