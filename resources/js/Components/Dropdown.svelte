<script setup lang="ts">
    import { onMount } from 'svelte';


export let align: 'left' | 'right' = 'right';
// TODO: ... width as string :what:
export let width: '48' = '48';
export let contentClasses: string = 'py-1 bg-white';


const closeOnEscape = (e: KeyboardEvent) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

onMount(()=>{
    document.addEventListener('keydown', closeOnEscape);

    return () => {
        document.removeEventListener('keydown', closeOnEscape);
    };
})

$: widthClass = {48: 'w-48'}[width.toString()];

let alignmentClasses: string;
$: {
    if (align === 'left') {
        alignmentClasses= 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses= 'ltr:origin-top-right rtl:origin-top-left end-0';
    } else {
        alignmentClasses= 'origin-top';
    }
};

let open = false;
</script>


    <div class="relative">
        <div on:click={()=>{open = !open}}>
            <slot name="trigger" />
        </div>

        <!-- Full Screen Dropdown Overlay -->
        <!-- v-show="open"  -->
        <div 
        class="fixed inset-0 z-40" on:click={()=>open = false}></div>

        <!-- <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        > -->
        <!-- v-show="open" -->
            <div
                class="absolute z-50 mt-2 rounded-md shadow-lg {widthClass} {alignmentClasses}"
                style="display: none"
                on:click={()=>open = false}
            >
                <div class="rounded-md ring-1 ring-black ring-opacity-5" :class="contentClasses">
                    <slot name="content" />
                </div>
            </div>
        <!-- </Transition> -->
    </div>

