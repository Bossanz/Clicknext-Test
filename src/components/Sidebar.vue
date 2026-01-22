<script setup lang="ts">
import { LayoutDashboard, History, X } from "lucide-vue-next"; // นำเข้าไอคอน

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);
</script>

<template>
  <aside
    :class="isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    class="bg-white border-r border-gray-200 w-64 fixed md:relative h-[calc(100vh-57px)] z-40 transition-transform duration-300 ease-in-out pt-4"
  >
    <nav class="space-y-1 px-2 justify-between flex flex-col h-full">
      <div class="space-y-1 px-2">
        <router-link
          to="/"
          exact-active-class="bg-gray-800 text-white"
          class="group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
          @click="emit('close')"
        >
          <LayoutDashboard :size="20" />
          Deposit / Withdraw
        </router-link>

        <router-link
          to="/transaction"
          active-class="bg-gray-800 text-white"
          class="group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
          @click="emit('close')"
        >
          <History :size="20" />
          Transaction
        </router-link>
      </div>
      <div class="px-4 py-4">
        <button
          @click="emit('close')"
          class="md:hidden w-full flex items-center justify-center gap-2 py-4 text-gray-500 text-sm hover:text-gray-700"
        >
          <X :size="18" />
          Close Menu
        </button>
      </div>
    </nav>
  </aside>
</template>
