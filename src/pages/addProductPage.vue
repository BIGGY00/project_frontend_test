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
          <q-breadcrumbs-el label="Add Product" />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card flat>
      <div class="text-h5 text-bold">Form New Product</div>
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
          to="/products"
        />
        <q-btn
          class="bg-green text-white text-bold"
          label="SUBMIT"
          icon="check"
          @click="addProduct"
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

const name = ref("");
const stock = ref("");
const price = ref("");
const category = ref("");
const category_use = ref("");
const image = ref("");
const options = ref([]);

const isHovered = ref(true);
const isHovered1 = ref(true);

watch(image, () => {
  console.log("Image changed:", image.value);
  const randomName = uniqueId("file_");
  const originalName = image.value.name;
  const fileExtension = originalName.slice(
    ((originalName.lastIndexOf(".") - 1) >>> 0) + 2
  );
  const newFileName = `${randomName}.${fileExtension}`;
  console.log("Random File Name:", newFileName);
});

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
  } catch (error) {
    console.error(error);
  }
};

watch(category, () => {
  category_use.value = category.value;
});

onMounted(() => {
  fetchCategories();
});

const addProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("stock", stock.value);
    formData.append("price", price.value);
    formData.append("categoryid", category_use.value.value);
    formData.append("image", image.value);

    const response = await api.post(`product`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    });

    router.push({ name: "products" });
  } catch (error) {
    console.error("Add product failed", error);
  }
};
</script>

<style scoped>
.no-decoration {
  text-decoration: underline;
}
</style>