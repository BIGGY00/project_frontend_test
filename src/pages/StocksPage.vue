<template>
  <q-page class="q-pa-xl q-gutter-lg">
    <q-card class="bg-grey-3">
      <q-card-section>
        <q-breadcrumbs gutter="md" class="text-h6">
          <q-breadcrumbs-el
            class="text-bold"
            label="Dashboard"
            to="/dashboard"
            :class="{ 'no-decoration': !isHovered }"
            @mouseover="isHovered = false"
            @mouseleave="isHovered = true"
          />
          <q-breadcrumbs-el label="Stocks" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card class="bg-grey-3">
      <q-card-section class="flex justify-between">
        <q-btn
          class="bg-green text-white text-body1 text-bold"
          icon="add"
          label="Add"
          to="/addstock"
        ></q-btn>
        <q-input
          class=""
          outlined
          dense
          v-model="keyword"
          placeholder="Searching"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="stocks"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[20, 50, 100]"
        >
          <template v-slot:body-cell-[column]="props">
            <!-- Customize cell content here if needed -->
            {{ props.value }}
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const isHovered = ref(true);

const loading = ref(false);
const stocks = ref([]);
const keyword = ref("");

const fetchStocks = async () => {
  try {
    const response = await api.get(
      `stocks?filter=&keyword=${keyword.value}&sortby=&orderby=desc&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    stocks.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchStocks();
});

watch(keyword, () => {
  fetchStocks();
});

const columns = [
  {
    name: "created",
    label: "Date",
    align: "left",
    field: "created",
    sortable: true,
  },
  {
    name: "id",
    label: "Product",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "qty",
    label: "Quantity",
    align: "left",
    field: "qty",
    sortable: true,
  },
  {
    name: "operator",
    label: "ID Cashier",
    align: "left",
    field: "operator",
    sortable: true,
  },
  {
    name: "username",
    label: "Cashier",
    align: "left",
    field: "username",
    sortable: true,
  },
  {
    name: "remark",
    label: "Remark",
    align: "left",
    field: "remark",
    sortable: true,
  },
];
</script>

<style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>
