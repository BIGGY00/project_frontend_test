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
          <q-breadcrumbs-el label="Reports" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card class="bg-grey-3">
      <q-card-section class="flex justify-end">
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
          :rows="reports"
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
const reports = ref([]);
const keyword = ref("");

const fetchReports = async () => {
  try {
    const response = await api.get(
      `orders?filter=&keyword=${keyword.value}&sortby=id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data.data);
    reports.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchReports();
});

watch(keyword, () => {
  fetchReports();
});

const columns = [
  {
    name: "updated",
    label: "Date",
    align: "left",
    field: "updated",
    sortable: true,
  },
  {
    name: "ordernumber",
    label: "Order Number",
    align: "left",
    field: "ordernumber",
    sortable: true,
  },
  {
    name: "customer",
    label: "Customer",
    align: "left",
    field: "customer",
    sortable: true,
  },
  {
    name: "subtotal",
    label: "Operator",
    align: "left",
    field: "subtotal",
    sortable: true,
  },
  {
    name: "payment",
    label: "Total",
    align: "left",
    field: "payment",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
    sortable: true,
  },
];
</script>

<style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>
