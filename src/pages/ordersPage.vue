<template>
  <q-page class="q-pa-xl q-gutter-lg">
    <q-card class="bg-grey-3">
      <q-card-section>
        <q-breadcrumbs gutter="md" class="text-h6">
          <q-breadcrumbs-el
            class="text-bold"
            label="Menu"
            to="/menu"
            :class="{ 'no-decoration': !isHovered }"
            @mouseover="isHovered = false"
            @mouseleave="isHovered = true"
          />
          <q-breadcrumbs-el label="Orders" />
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
          <template v-slot:body-cell-status="props">
            <q-td :props="props" class="q-gutter-xs">
              <q-badge
                class="text-subtitle2 text-capitalize"
                rounded
                :class="getStatusClass(props.row.status)"
              >
                <div :style="getStatusColor(props.row.status)">
                  {{ getStatusText(props.row.status) }}
                </div>
              </q-badge>
            </q-td>
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
          <template v-slot:body-cell-action="props">
            <q-td :props="props" class="q-gutter-xs">
              <!-- Render a button only if the "operator" field is null -->
              <q-btn
                v-if="props.row.operator === null"
                color="primary"
                label="Action"
                @click="handleActionClick(props.row)"
              />
            </q-td>
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

const handleActionClick = async (row) => {
  try {
    const response = await api.patch(
      `/orders/${localStorage.getItem("id")}`,
      {
        operator: parseInt(localStorage.getItem("id"), 10),
        status: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchReports();
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
    name: "operator",
    label: "Operator",
    align: "left",
    field: "operator",
    sortable: true,
  },
  {
    name: "subtotal",
    label: "Total",
    align: "left",
    field: "subtotal",
    sortable: true,
  },
  {
    name: "payment",
    label: "Payment",
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
    format: (val) => {
      // Custom slot to dynamically display "Pending" or "Approve"
      return val === 1 ? "Pending" : val === 2 ? "Approve" : "Unknown";
    },
  },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "action",
    sortable: true,
  },
];
</script>
  
  <style scoped>
.no-decoration {
  text-decoration: underline;
}

.text-pending {
  color: orange; /* You can customize the color for "Pending" status */
}

.text-approved {
  color: green; /* You can customize the color for "Approve" status */
}
</style>
  