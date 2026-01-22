<script setup lang="ts">
import { ref } from 'vue'
import { useBankStore } from '../stores/bankStore'
import ModalConfirm from './ModalConfirm.vue'
import { Pencil, Trash2 } from 'lucide-vue-next'

const bankStore = useBankStore()
const editItem = ref<any>(null)
const deleteId = ref<number | null>(null)
const newAmount = ref<number>(0)

const openEdit = (item: any) => {
  editItem.value = item
  newAmount.value = item.amount
}

const confirmEdit = () => {
  if (editItem.value && newAmount.value > 0 && newAmount.value <= 100000) {
    bankStore.editTransaction(editItem.value.id, newAmount.value)
    editItem.value = null
  } else {
    alert('กรุณากรอกจำนวนเงิน 1 - 100,000 บาท')
  }
}

const openDelete = (id: number) => {
  deleteId.value = id
}

const confirmDelete = () => {
  if (deleteId.value) {
    bankStore.deleteTransaction(deleteId.value)
    deleteId.value = null
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full max-h-[calc(100vh-100px)]">
    
    <h2 class="mb-4 font-bold text-gray-800 shrink-0">ประวัติรายการฝากถอน</h2>
    
    <div class="hidden md:block overflow-auto border border-gray-200 rounded-lg">
      <table class="w-full text-sm text-left border-collapse relative">
        <thead class="sticky top-0 z-10 shadow-sm">
          <tr class="bg-gray-100 border-b text-gray-600">
            <th class="p-3 whitespace-nowrap">Datetime</th>
            <th class="p-3 whitespace-nowrap">Amount</th>
            <th class="p-3 whitespace-nowrap">Status</th>
            <th class="p-3 whitespace-nowrap">Email</th>
            <th class="p-3 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="item in bankStore.transactions" :key="item.id" class="border-b hover:bg-gray-50 transition-colors">
            <td class="p-3">{{ item.datetime }}</td>
            <td class="p-3">{{ item.amount.toLocaleString() }}</td>
            <td class="p-3">
              <span 
                class="px-2 py-1 rounded text-xs font-medium border border-opacity-20" 
                :class="item.status === 'ฝาก' ? 'text-green-600 bg-green-50 border-green-600' : 'text-red-600 bg-red-50 border-red-600'"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="p-3 text-gray-500 max-w-[200px] truncate" :title="item.email">{{ item.email }}</td>
            <td class="p-3 flex gap-2">
              <button v-if="item.status === 'ฝาก'" @click="openEdit(item)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-xs shadow-sm"><Pencil :size="16" /></button>
              <button v-if="item.status === 'ถอน'" @click="openDelete(item.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs shadow-sm"><Trash2 :size="16" /></button>
            </td>
          </tr>
          <tr v-if="bankStore.transactions.length === 0">
            <td colspan="5" class="p-10 text-center text-gray-400">ยังไม่มีรายการประวัติ</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="md:hidden space-y-4 overflow-y-auto max-h-[70vh] pr-1 pb-4">
      <div v-for="item in bankStore.transactions" :key="item.id" class="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3 relative shadow-sm">
        <div class="flex justify-between items-start">
          <span class="text-xs text-gray-500">{{ item.datetime }}</span>
          <span :class="item.status === 'ฝาก' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'" class="px-2 py-0.5 rounded text-xs font-medium">
            {{ item.status }}
          </span>
        </div>
        
        <div>
          <div class="text-lg font-bold text-gray-800">{{ item.amount.toLocaleString() }} บาท</div>
          <div class="text-xs text-gray-500 truncate">By: {{ item.email }}</div>
        </div>

        <div class="pt-2 border-t border-gray-200 flex justify-end gap-2">
          <button v-if="item.status === 'ฝาก'" @click="openEdit(item)" class="text-yellow-600 text-sm font-medium hover:underline"><Pencil :size="16" /></button>
          <button v-if="item.status === 'ถอน'" @click="openDelete(item.id)" class="text-red-600 text-sm font-medium hover:underline"><Trash2 :size="16" /></button>
        </div>
      </div>

      <div v-if="bankStore.transactions.length === 0" class="text-center p-8 text-gray-400 border border-dashed rounded-lg">
        ยังไม่มีรายการประวัติ
      </div>
    </div>

    <ModalConfirm 
      :isOpen="editItem !== null" 
      :title="`แก้ไขจำนวนเงิน${editItem?.status || ''}`"
      @confirm="confirmEdit"
      @cancel="editItem = null"
    >
      <div class="mt-2 mb-4">
        <input 
          v-model.number="newAmount" 
          type="number" 
          class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-400 text-lg text-center"
          placeholder="ระบุจำนวนเงินใหม่"
        />
        <p class="text-xs text-gray-500 mt-2 text-center">* ระบุ 1 - 100,000 บาท</p>
      </div>
    </ModalConfirm>

    <ModalConfirm 
      :isOpen="deleteId !== null" 
      title="ยืนยันการลบ"
      message="คุณต้องการลบรายการถอนนี้ใช่หรือไม่?"
      @confirm="confirmDelete"
      @cancel="deleteId = null"
    />
  </div>
</template>