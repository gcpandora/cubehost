<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { signIn } = useAuth()

const state = reactive({ email: '', password: '' })
const error = ref<string | null>(null)
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  error.value = null

  const result = await signIn.email({
    email: state.email,
    password: state.password,
  })

  if (result?.error) {
    error.value = 'Email ou mot de passe incorrect'
    loading.value = false
    return
  }

  await navigateTo('/')
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
          <p class="text-xs text-neutral-400">Connexion à votre panneau</p>
        </div>
      </div>
    </template>

    <form class="space-y-4" @submit.prevent="onSubmit">
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
          autocomplete="current-password"
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
        Se connecter
      </UButton>
    </form>
  </UCard>
</template>
