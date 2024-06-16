<script lang="ts">
    export let value: string = '';
</script>

<label {...$$restProps} class="block font-medium text-sm text-gray-700">
    {#if value}
        <span>{value}</span>
    {:else}
        <span><slot /></span>
    {/if}
</label>

