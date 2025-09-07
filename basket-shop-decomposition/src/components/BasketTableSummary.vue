<script setup lang="ts">
const { totalTax, totalPrice } = defineProps<{
  totalPrice: number;
  totalTax: number;
}>();
</script>
<template>
  <td colspan="5">
    <div class="basket-table__summary">
      <p class="basket-table__total">
        Total <b>$ {{ totalPrice.toFixed(2) }}</b>
      </p>
      <p>Tax $ {{ totalTax.toFixed(2) }}</p>
    </div>
  </td>
</template>
