<script lang="ts">
    import DangerButton from '@/Components/DangerButton.svelte';
    import InputError from '@/Components/InputError.svelte';
    import InputLabel from '@/Components/InputLabel.svelte';
    import Modal from '@/Components/Modal.svelte';
    import SecondaryButton from '@/Components/SecondaryButton.svelte';
    import TextInput from '@/Components/TextInput.svelte';
    import { useForm } from '@inertiajs/svelte';
    import { onMount, tick } from 'svelte';

    let confirmingUserDeletion = false;
    let passwordInput: TextInput;


    const form = useForm({
        password: '',
    });

    const confirmUserDeletion = async () => {
        confirmingUserDeletion = true;
        await tick();
        passwordInput?.focus();
    };

    const deleteUser = () => {
        $form.delete(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('onSuccess');
                closeModal();
            },
            onError: () => {
                console.log('onError');
                passwordInput?.focus();
            },
            onFinish: () => {
                console.log('onFinish');
                $form.reset();
            },
        });
    };

    const onKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            deleteUser();
        }
    };

    onMount(() => {
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keyup', onKeyUp);
        };
    });
    $: {
        console.log({ confirmingUserDeletion });
    }
    const closeModal = () => {
        confirmingUserDeletion = false;

        $form.reset();
    };
</script>

<section {...$$restProps} class="{$$props.class || ''} space-y-6">
    <header>
        <h2 class="text-lg font-medium text-gray-900">Delete Account</h2>

        <p class="mt-1 text-sm text-gray-600">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download any data or
            information that you wish to retain.
        </p>
    </header>

    <DangerButton on:click={() => confirmUserDeletion()}>Delete Account</DangerButton>

    <Modal show={confirmingUserDeletion} {closeModal}>
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">
                Are you sure you want to delete your account?
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be
                permanently deleted. Please enter your password to confirm you would like
                to permanently delete your account.
            </p>

            <div class="mt-6">
                <InputLabel for="password" value="Password" class="sr-only" />

                <TextInput
                    id="password"
                    bind:this={passwordInput}
                    bind:value={$form.password}
                    type="password"
                    class="mt-1 block w-3/4"
                    placeholder="Password"
                    on:keyup={onKeyUp}
                />

                <InputError message={$form.errors.password} class="mt-2" />
            </div>

            <div class="mt-6 flex justify-end">
                <SecondaryButton on:click={closeModal}>Cancel</SecondaryButton>

                <DangerButton
                    class="ms-3 {$form.processing ? 'opacity-25' : ''}"
                    disabled={$form.processing}
                    on:click={deleteUser}
                >
                    Delete Account
                </DangerButton>
            </div>
        </div>
    </Modal>
</section>
