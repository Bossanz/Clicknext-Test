<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginCard from '../components/LoginCard.vue' // นำเข้า Component ลูก

const router = useRouter()

// ฟังก์ชันนี้จะทำงานเมื่อ LoginCard ตรวจสอบผ่านแล้วส่งค่ามาให้
const handleLoginSuccess = (payload: { email: string }) => {
  // 3. เก็บสถานะ Login ใน localStorage (ตามโค้ดเดิมของเพื่อน)
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', payload.email)

  // 4. พาไปหน้าหลัก
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
    <LoginCard @submit="handleLoginSuccess" />
  </div>
</template>