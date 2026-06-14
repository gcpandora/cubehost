<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p class="text-neutral-400 mt-1">Vue d'ensemble de vos serveurs Minecraft</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <UCard>
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-server" class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-400">Serveurs</p>
            <p class="text-2xl font-bold text-white">0</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-play" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-400">En cours</p>
            <p class="text-2xl font-bold text-white">0</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-users" class="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-400">Joueurs</p>
            <p class="text-2xl font-bold text-white">0</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Docker status -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-simple-icons-docker" class="w-5 h-5 text-blue-400" />
            <h3 class="font-semibold text-white">Démon Docker</h3>
          </div>
          <UBadge v-if="!pending" :color="dockerOk ? 'success' : 'error'" variant="subtle">
            {{ dockerOk ? 'Connecté' : 'Erreur de connexion' }}
          </UBadge>
        </div>
      </template>

      <div v-if="pending" class="flex items-center gap-2 text-neutral-400 text-sm">
        <UIcon name="i-lucide-loader-circle" class="w-4 h-4 animate-spin" />
        Connexion au démon Docker…
      </div>

      <div v-else-if="error" class="text-red-400 text-sm font-mono">
        {{ error.message }}
      </div>

      <div v-else-if="containers.length === 0" class="text-neutral-400 text-sm">
        Aucun conteneur détecté sur ce système.
      </div>

      <div v-else class="space-y-2">
        <div
          v-for="c in containers"
          :key="c.id"
          class="flex items-center gap-3 p-2.5 rounded-lg bg-neutral-800/50 text-sm"
        >
          <UIcon name="i-lucide-box" class="w-4 h-4 text-neutral-400 shrink-0" />
          <span class="font-mono text-neutral-300 shrink-0">{{ c.id }}</span>
          <span class="text-neutral-400 truncate">{{ c.names[0] }}</span>
          <UBadge
            :color="c.state === 'running' ? 'success' : 'neutral'"
            variant="subtle"
            size="xs"
            class="ml-auto shrink-0"
          >
            {{ c.status }}
          </UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/docker/test')

const dockerOk = computed(() => !!data.value?.ok && !error.value)
const containers = computed(() => data.value?.containers ?? [])
</script>
