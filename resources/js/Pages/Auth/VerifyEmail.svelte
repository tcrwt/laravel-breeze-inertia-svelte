<script lang="ts">
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.svelte;
import PrimaryButton from '@/Components/PrimaryButton.svelte;
import { Link, useForm } from '@inertiajs/svelte';


export let status: string = '';


const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>


    <svelte:head>
    <title>Email Verification</title>
</svelte:head>

<GuestLayout>

        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <div class="mb-4 font-medium text-sm text-green-600" v-if="verificationLinkSent">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form on:submit|preventDefault={submit}>
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" disabled={$form.processing}>
                    Resend Verification Email
                </PrimaryButton>

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >Log Out</Link
                >
            </div>
        </form>
    </GuestLayout>

