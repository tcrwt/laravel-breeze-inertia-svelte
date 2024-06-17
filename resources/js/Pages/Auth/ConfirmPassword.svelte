<script lang="ts">
import GuestLayout from '@/Layouts/GuestLayout.svelte';
import InputError from '@/Components/InputError.svelte';
import InputLabel from '@/Components/InputLabel.svelte';
import PrimaryButton from '@/Components/PrimaryButton.svelte';
import TextInput from '@/Components/TextInput.svelte';
import { useForm } from '@inertiajs/svelte';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<svelte:head>
    <title>Confirm Password</title>
</svelte:head>

<GuestLayout>
    <div class="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before
        continuing.
    </div>

    <form on:submit|preventDefault={submit}>
        <div>
            <InputLabel for="password" value="Password" />
            <TextInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                v-model="form.password"
                required
                autocomplete="current-password"
                autofocus
            />
            <InputError class="mt-2" message={$form.errors.password} />
        </div>

        <div class="flex justify-end mt-4">
            <PrimaryButton
                class="ms-4 {$form.processing ? 'opacity-25' : ''}"
                disabled={$form.processing}
            >
                Confirm
            </PrimaryButton>
        </div>
    </form>
</GuestLayout>
