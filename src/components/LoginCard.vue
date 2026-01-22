<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submit", payload: { email: string }): void;
}>();

const email = ref("");
const password = ref("");
const emailError = ref("");

const validateEmail = (input: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(input);
};

const onSubmit = () => {
  emailError.value = "";

  if (!validateEmail(email.value)) {
    emailError.value = "กรุณากรอกรูปแบบ Email ให้ถูกต้อง";
    return;
  }

  if (!password.value) {
    alert("กรุณากรอกรหัสผ่าน");
    return;
  }

  emit("submit", { email: email.value });
};
</script>

<template>
  <div
    class="w-full max-w-[400px] bg-white p-8 rounded-xl shadow-sm border border-gray-100"
  >
    <h1 class="text-2xl font-semibold text-center mb-8 text-gray-800">
      Clicknext
    </h1>

    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Email *</label
        >
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          :class="{ 'border-red-500': emailError }"
        />
        <p v-if="emailError" class="text-red-500 text-xs mt-1">
          {{ emailError }}
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Password *</label
        >
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
        />
      </div>

      <button
        @click="onSubmit"
        class="w-full bg-slate-800 text-white font-medium py-3 rounded-lg hover:bg-slate-900 active:scale-[0.98] transition-all mt-4"
      >
        Login
      </button>
    </div>
  </div>
</template>
