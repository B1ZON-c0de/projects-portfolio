<script setup lang="ts">
import BasketTableItem from './BasketTableItem.vue';
import BasketTableSummary from './BasketTableSummary.vue';
import type { Goods } from '../types/type';

const { basket, totalTax, totalPrice } = defineProps<{
  basket: Goods[];
  totalTax: number;
  totalPrice: number;
}>();

const emit = defineEmits([
  'decrease-quantity',
  'increase-quantity',
  'remove-item',
]);
</script>
<template>
  <table class="basket-table">
    <thead class="basket-table__header">
      <tr>
        <th>Product Details</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody class="basket-table__body">
      <tr v-for="(item, index) in basket" :key="item.id">
        <BasketTableItem
          :item="item"
          @decrease-quantity="emit('decrease-quantity', item)"
          @increase-quantity="emit('increase-quantity', item)"
          @remove-item="emit('remove-item', index)"
        />
      </tr>
      <tr v-if="basket.length === 0">
        <td colspan="5">
          <p class="basket-table__empty">No items</p>
        </td>
      </tr>

      <tr v-if="basket.length > 0">
        <BasketTableSummary :totalPrice="totalPrice" :totalTax="totalTax" />
      </tr>
    </tbody>
  </table>
</template>
