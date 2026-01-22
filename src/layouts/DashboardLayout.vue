<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import { Menu, LogOut } from "lucide-vue-next";

const router = useRouter();
const isMobileMenuOpen = ref(false);

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <header
      class="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-50"
    >
      <div class="flex items-center gap-4">
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 text-gray-600"
        >
          <Menu :size="24" />
        </button>
        <span class="text-xl font-bold text-gray-800">Clicknext</span>
      </div>

      <button
        @click="handleLogout"
        class="bg-gray-600 text-white px-4 py-1.5 rounded text-sm hover:bg-gray-700 transition flex items-center gap-2"
      >
        <LogOut :size="16" />
        Logout
      </button>
    </header>

    <div class="flex flex-1 relative">
      <Sidebar :isOpen="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

      <main class="flex-1 p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
          <router-view />
        </div>
      </main>

      <div
        v-if="isMobileMenuOpen"
        @click="isMobileMenuOpen = false"
        class="fixed inset-0 bg-black/20 z-30 md:hidden"
      ></div>
    </div>
  </div>
</template>
