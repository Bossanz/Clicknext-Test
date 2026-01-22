<script setup lang="ts">
import { useRouter } from "vue-router";
import LoginCard from "../components/LoginCard.vue";

const router = useRouter();

const handleLoginSuccess = (payload: { email: string }) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", payload.email);

  router.push("/");
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4"
  >
    <LoginCard @submit="handleLoginSuccess" />
  </div>
</template>
