<script lang="ts">
    import Portal from '@/Components/Portal.svelte';
    import { onMount } from 'svelte';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import { fade, scale } from 'svelte/transition';

    export let show: boolean = false;
    export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = '2xl';
    export let closeable: boolean = true;
    export let closeModal: () => void;

    $: {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }

    const close = () => {
        if (closeable) {
            closeModal();
        }
    };

    const closeOnEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && show) {
            close();
        }
    };

    onMount(() => {
        document.addEventListener('keydown', closeOnEscape);

        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.body.style.overflow = 'visible';
        };
    });

    $: maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];
</script>

{#if show}
    <Portal>
        <div
            hidden={!show}
            class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50"
            scroll-region
        >
                <div
                    in:fade={{ duration: 300, easing: cubicOut }}
                    out:fade={{ duration: 200, easing: cubicIn }}
                    class="fixed inset-0 transform transition-all"
                    on:click={close}
                >
                    <div class="absolute inset-0 bg-gray-500 opacity-75" />
                </div>
            <!-- TODO: Vue's version has breakpoint-dependent transitions, nice! 
                    No obvious way to do this in Svelte – I could just pick one or 
                    do a small js thing to detect the current breakpoint. Seems gross.
                    For now, just use the large transition for all breakpoints.
            -->
            <div
                in:scale={{ duration: 300, easing: cubicOut, start: 0.95, opacity: 0 }}
                out:scale={{ duration: 200, easing: cubicIn, start: 0.95, opacity: 0 }}
                class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto {maxWidthClass}"
            >
                {#if show}
                    <slot />
                {/if}
            </div>
        </div>
    </Portal>
{/if}
