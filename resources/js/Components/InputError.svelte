<script lang="ts">
    export let message: string = '';
</script>

{#if message}
    <div {...$$restProps}>
        <p class="text-sm text-red-600">
            {message}
        </p>
    </div>
{/if}
