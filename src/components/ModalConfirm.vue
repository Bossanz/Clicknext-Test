<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
  message?: string // ข้อความเพิ่มเติม (ถ้ามี)
}>()

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
    <div class="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
      <h3 class="font-bold text-lg mb-2 text-gray-800">{{ title }}</h3>
      <p v-if="message" class="text-gray-600 mb-6">{{ message }}</p>
      
      <slot />

      <div class="flex gap-3 mt-6">
        <button 
          @click="emit('confirm')" 
          class="flex-1 bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 transition font-medium"
        >
          ยืนยัน
        </button>
        <button 
          @click="emit('cancel')" 
          class="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>