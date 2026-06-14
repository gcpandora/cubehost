<template>
  <div class="flex h-screen overflow-hidden bg-neutral-950">
    <!-- Sidebar -->
    <aside class="w-60 shrink-0 flex flex-col bg-neutral-900 border-r border-neutral-800">
      <div class="h-16 flex items-center gap-2.5 px-4 border-b border-neutral-800">
        <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          C
        </div>
        <span class="font-bold text-white text-lg">CubeHost</span>
      </div>
      <nav class="flex-1 p-3 space-y-0.5">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === item.to
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'"
        >
          <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="p-3 border-t border-neutral-800">
        <div class="flex items-center gap-3 px-3 py-2 text-sm text-neutral-500">
          <UIcon name="i-lucide-tag" class="w-4 h-4 shrink-0" />
          <span>v0.1.0 — Phase 0</span>
        </div>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 shrink-0 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6">
        <p class="text-sm text-neutral-400">{{ pageTitle }}</p>
        <div class="flex items-center gap-3">
          <UColorModeButton />
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const navigation = [
  { to: '/', label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
  { to: '/servers', label: 'Serveurs', icon: 'i-lucide-server' },
]

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/servers': 'Serveurs',
}

const pageTitle = computed(() => pageTitles[route.path] ?? 'CubeHost')
</script>
