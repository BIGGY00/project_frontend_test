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
          <q-breadcrumbs-el
            class="text-bold"
            label="Stocks"
            to="/stocks"
            :class="{ 'no-decoration': !isHovered1 }"
            @mouseover="isHovered1 = false"
            @mouseleave="isHovered1 = true"
          />
          <q-breadcrumbs-el label="Add Stock" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card flat>
      <div class="text-h5 text-bold">Form New Stock</div>
      <q-select v-model="product" :options="options" label="Products" />
      <q-input
        v-model="quantity"
        label="Quantity"
        placeholder="Inseart Quantity"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Stock required',
          (val) => /^\d+$/.test(val) || 'Only numbers are allowed',
        ]"
      />
      <q-input
        v-model="remark"
        label="Remark"
        placeholder="Input text Add or Reduce or Adjustment"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Name product required']"
      />
      <q-select v-model="category" :options="options_c" label="Category" />

      <div class="flex justify-between q-mt-md">
        <q-btn
          class="bg-orange text-white text-bold"
          icon="cancel"
          label="cancel"
          to="/products"
        />
        <q-btn
          class="bg-green text-white text-bold"
          label="SUBMIT"
          icon="check"
          @click="addStock"
        ></q-btn>
      </div>
    </q-card>
  </q-page>
</template> 
  
  <script setup>
import { ref, watch, onMounted } from "vue";
import { uniqueId } from "lodash";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const product = ref("");
const product_use = ref("");
const quantity = ref("");
const remark = ref("");
const options = ref([]);

const category = ref("");
const category_use = ref("");
const options_c = ref(["add", "reduce", "adjustment"]);

const isHovered = ref(true);
const isHovered1 = ref(true);

const fetchProducts = async () => {
  try {
    const response = await api.get(
      `products?filter=&keyword=&sortby=products.id&orderby=&page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    options.value = response.data.data.map((product) => ({
      label: product.name,
      value: product.id,
    }));
  } catch (error) {
    console.error(error);
  }
};

const addStock = async () => {
  try {
    const response = await api.post(
      `stocks`,
      {
        productid: product_use.value.value,
        qty: quantity.value,
        remark: remark.value,
        category: category_use.value,
        operator: localStorage.getItem("id"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    router.push({ name: "stocks" });
  } catch (error) {}
};

onMounted(() => {
  fetchProducts();
});

watch(product, () => {
  product_use.value = product.value;
  //   console.log(product_use.value.value);
});

watch(category, () => {
  if (category.value == "add") {
    category_use.value = "0";
  } else if (category.value == "reduce") {
    category_use.value = "1";
  } else if (category.value == "adjustment") {
    category_use.value = "2";
  }
  //   console.log(category);
});
</script>
  
  <style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>