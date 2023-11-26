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
            label="Products"
            to="/products"
            :class="{ 'no-decoration': !isHovered1 }"
            @mouseover="isHovered1 = false"
            @mouseleave="isHovered1 = true"
          />
          <q-breadcrumbs-el label="Edit Product: id ">
            {{ id }}
          </q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card flat>
      <div class="text-h5 text-bold">Form Edit Product id {{ id }}</div>
      <q-input
        v-model="name"
        label="Name"
        placeholder="Inseart Product name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Name product required']"
      />
      <q-input
        v-model="stock"
        label="Stock"
        placeholder="Inseart Product stock"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Stock required',
          (val) => /^\d+$/.test(val) || 'Only numbers are allowed',
        ]"
      />
      <q-input
        v-model="price"
        label="Price"
        placeholder="Inseart Product price"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Price required',
          (val) => /^\d+$/.test(val) || 'Only numbers are allowed',
        ]"
      />
      <q-select v-model="category" :options="options" label="Caterogies" />
      <q-input
        class="q-mt-md"
        @update:model-value="
          (val) => {
            image = val[0];
          }
        "
        type="file"
        hint="Native file"
      />
      <div class="flex justify-between q-mt-md">
        <q-btn
          class="bg-orange text-white text-bold"
          icon="cancel"
          label="cancel"
          @click="back"
        />
        <q-btn
          class="bg-green text-white text-bold"
          label="EDIT"
          icon="check"
          @click="editProduct"
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

const id = localStorage.getItem("editId");

const name = ref("");
const stock = ref("");
const price = ref("");
const category = ref("");
const category_use = ref("");
const image = ref("");
const options = ref([]);

const isHovered = ref(true);
const isHovered1 = ref(true);

const fetchCategories = async () => {
  try {
    const response = await api.get(
      `categories?filter=&keyword=&sortby=id&orderby=&page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    options.value = response.data.data.map((category) => ({
      label: category.name,
      value: category.id,
    }));

    // Assign initial value to category
    category.value = options.value[0]; // You may want to set a default value
  } catch (error) {
    console.error(error);
  }
};

const detailProduct = async () => {
  try {
    const response = await api.get(`product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.data[0]);
    name.value = response.data.data[0].name;
    stock.value = response.data.data[0].stock;
    price.value = response.data.data[0].price;
    category_use.value = response.data.data[0].categoryid;
    image.value = response.data.data[0].image;
  } catch (error) {
    console.error("Get detail product failed", error);
  }
};

const editProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("stock", stock.value);
    formData.append("price", price.value);
    formData.append("categoryid", category_use.value.value);
    formData.append("image", image.value);

    const response = await api.patch(`product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });

    router.push({ name: "products" });
    localStorage.removeItem("editId");
  } catch (error) {
    console.error("Edit product failed", error);
  }
};

const back = () => {
  localStorage.removeItem("editId");
  router.push({ name: "products" });
};

watch(category, () => {
  category_use.value = category.value;
});

onMounted(() => {
  fetchCategories();
  detailProduct();
});
</script>

  
  <style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>