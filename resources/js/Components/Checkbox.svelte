<script lang="ts">
    export let value: any = undefined;

</script>

<input
    {...$$restProps}
    type="checkbox"
    bind:value
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
/>

