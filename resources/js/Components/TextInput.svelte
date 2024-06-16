<script lang="ts">
    export let value: string = '';
</script>

<input
    {...$$restProps}
    class="{$$props.class || ''} border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    bind:value
/>
