<script lang="ts">
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';

    export let align: 'left' | 'right' = 'right';
    // TODO: ... width as string :what:
    export let width: '48' = '48';
    export let contentClasses: string = 'py-1 bg-white';

    const closeOnEscape = (e: KeyboardEvent) => {
        if (open && e.key === 'Escape') {
            open = false;
        }
    };

    onMount(() => {
        document.addEventListener('keydown', closeOnEscape);

        return () => {
            document.removeEventListener('keydown', closeOnEscape);
        };
    });

    $: widthClass = { 48: 'w-48' }[width.toString()];

    let alignmentClasses: string;
    $: {
        if (align === 'left') {
            alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
        } else if (align === 'right') {
            alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
        } else {
            alignmentClasses = 'origin-top';
        }
    }

    let open = false;
</script>

<div class="relative">
    <div
        on:click={() => {
            open = !open;
        }}
    >
        <slot name="trigger" />
    </div>

    <!-- Full Screen Dropdown Overlay -->
    <div hidden={!open} class="fixed inset-0 z-40" on:click={() => (open = false)}></div>

    {#if open}
        <div
            in:scale={{ start: 0.95, opacity: 0, duration: 200, easing: cubicOut }}
            out:scale={{ start: 0.95, opacity: 0, duration: 75, easing: cubicIn  }}
        >
            <div
                class="absolute z-50 mt-2 rounded-md shadow-lg {widthClass} {alignmentClasses}"
                on:click={() => (open = false)}
            >
                <div class="rounded-md ring-1 ring-black ring-opacity-5 {contentClasses}">
                    <slot name="content" />
                </div>
            </div>
        </div>
    {/if}
</div>
