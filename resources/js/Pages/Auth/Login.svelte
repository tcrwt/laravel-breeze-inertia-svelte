<script lang="ts">
    import Checkbox from '@/Components/Checkbox.svelte';
    import GuestLayout from '@/Layouts/GuestLayout.svelte';
    import InputError from '@/Components/InputError.svelte';
    import InputLabel from '@/Components/InputLabel.svelte';
    import PrimaryButton from '@/Components/PrimaryButton.svelte';
    import TextInput from '@/Components/TextInput.svelte';
    import { Link, useForm } from '@inertiajs/svelte';
    import { route } from '../../../../vendor/tightenco/ziggy/src/js'


    export let canResetPassword: boolean = false;
    export let status: string = '';

    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = () => {
        form.post(route('login'), {
            onFinish: () => {
                form.reset('password');
            },
        });
    };
</script>

<svelte:head >
    <title>Log in</title>
</svelte:head>

<GuestLayout>
    {#if status}
        <div class="mb-4 font-medium text-sm text-green-600">
            { status }
        </div>
    {/if}

    <form on:submit|preventDefault={submit}>
        <div>
            <InputLabel for="email" value="Email" />

            <TextInput
                id="email"
                type="email"
                class="mt-1 block w-full"
                bind:value={$form.email}
                required
                autofocus
                autocomplete="username"
            />

            <InputError class="mt-2" message={$form.errors.email} />
        </div>

        <div class="mt-4">
            <InputLabel for="password" value="Password" />

            <TextInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                bind:value={$form.password}
                required
                autocomplete="current-password"
            />

            <InputError class="mt-2" message={$form.errors.password} />
        </div>

        <div class="block mt-4">
            <label class="flex items-center">
                <Checkbox name="remember" v-model:checked="form.remember" />
                <span class="ms-2 text-sm text-gray-600">Remember me</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            {#if canResetPassword}
                <Link
                    href={route('password.request')}
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Forgot your password?
                </Link>
            {/if}

            <PrimaryButton class="ms-4 {form.processing ? 'opacity-25' : ''}" disabled={form.processing}>
                Log in
            </PrimaryButton>
        </div>
    </form>
</GuestLayout>

