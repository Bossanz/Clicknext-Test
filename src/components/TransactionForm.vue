<script setup lang="ts">
import { ref } from "vue";
import { useBankStore } from "../stores/bankStore";
import ModalConfirm from "./ModalConfirm.vue";

const bankStore = useBankStore();
const amount = ref<number | null>(null);
const showConfirmModal = ref(false);
const transactionType = ref<"ฝาก" | "ถอน">("ฝาก");

const openConfirm = (type: "ฝาก" | "ถอน") => {
  // Logic เช็คเงิน 1 - 100,000
  if (!amount.value || amount.value <= 0 || amount.value > 100000) {
    alert("กรุณากรอกจำนวนเงิน 1 - 100,000 บาท");
    return;
  }
  transactionType.value = type;
  showConfirmModal.value = true;
};

const confirmAction = () => {
  const email = localStorage.getItem("userEmail") || "unknown";

  bankStore.addTransaction(transactionType.value, amount.value!, email);

  amount.value = null;
  showConfirmModal.value = false;
};
</script>

<template>
  <div
    class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
  >
    <h2 class="text-lg mb-6">
      จำนวนเงินคงเหลือ {{ bankStore.balance.toLocaleString() }} บาท
    </h2>

    <div class="max-w-xs mx-auto space-y-4">
      <div class="text-left">
        <label class="block text-sm mb-1">จำนวนเงิน *</label>
        <input
          v-model.number="amount"
          type="number"
          placeholder="กรอกจำนวนเงิน"
          class="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div class="flex gap-4">
        <button
          @click="openConfirm('ฝาก')"
          class="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          ฝาก
        </button>
        <button
          @click="openConfirm('ถอน')"
          class="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          ถอน
        </button>
      </div>
    </div>

    <ModalConfirm
      :isOpen="showConfirmModal"
      :title="`ยืนยันการ${transactionType}`"
      :message="`จำนวนเงิน ${amount?.toLocaleString()} บาท`"
      @confirm="confirmAction"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>
