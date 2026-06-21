<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { data: status } = await useFetch('/api/setup/status')
if (!status.value?.needsSetup) {
  await navigateTo('/auth/login')
}

const state = reactive({ name: '', email: '', password: '' })
const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  error.value = null

  try {
    await $fetch('/api/setup/init', { method: 'POST', body: state })
    await navigateTo('/auth/login')
  }
  catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    error.value = err.data?.message ?? 'Erreur lors de la création du compte'
    loading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-sm">
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
          C
        </div>
        <div>
          <p class="font-bold text-white">CubeHost</p>
          <p class="text-xs text-neutral-400">Création du compte owner</p>
        </div>
      </div>
    </template>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <UFormField label="Nom" name="name">
        <UInput
          v-model="state.name"
          placeholder="Tom"
          autocomplete="name"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput
          v-model="state.email"
          type="email"
          placeholder="admin@example.com"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Mot de passe" name="password">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="••••••••"
          autocomplete="new-password"
          class="w-full"
        />
      </UFormField>

      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        :description="error"
      />

      <UButton
        type="submit"
        color="primary"
        :loading="loading"
        block
      >
        Créer le compte
      </UButton>
    </form>
  </UCard>
</template>
