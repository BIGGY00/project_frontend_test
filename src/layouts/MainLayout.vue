<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-white flex" style="min-height: 70px">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="bg-black"
        />
        <q-toolbar-title
          class="title-text q-ml-md text-bold"
          style="color: black"
        >
          {{ Sitename || "loading" }}
        </q-toolbar-title>
        <div class="flex">
          <div class="text-black text-bold q-mr-xl text-md">
            {{ "Admin" }}
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above bordered :width="250" v-model="leftDrawerOpen">
      <div class="drawer-content">
        <q-list>
          <EssentialLink
            class="q-my-lg"
            v-for="link in filteredEssentialLinks"
            :key="link.title"
            v-bind="link"
            :class="{ 'active-link': link.title === activeLink }"
          />
        </q-list>
      </div>
      <q-space></q-space>
      <div class="q-py-xl q-ml-sm" style="position: absolute; bottom: 0">
        <q-btn
          class=""
          style="font-size: 14px; color: #363636; text-transform: capitalize"
          icon="logout"
          label="Logout"
          flat
          @click="logout"
        >
        </q-btn>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";

const essentialLinks = [
  { title: "Dashboard", icon: "dashboard", name: "dashboard" },
  { title: "Products", icon: "local_mall", name: "products" },
  { title: "Categories", icon: "category", name: "categories" },
  { title: "Stocks", icon: "checklist_rtl", name: "stocks" },
  { title: "Reports", icon: "summarize", name: "reports" },
  { title: "Add Product", icon: "", name: "addproduct" }, // hide
  { title: "Edit Product", icon: "", name: "editproduct" }, // hide
  { title: "Add Category", icon: "", name: "addcategory" }, // hide
  { title: "Edit Category", icon: "", name: "editcategory" }, // hide
];

const router = useRouter();

const Sitename = ref("");

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const currentRoute = computed(() => router.currentRoute.value);
const activeLink = computed(() => {
  const matchingLink = essentialLinks.find(
    (link) => link.name === currentRoute.value.name
  );
  // console.log(router.currentRoute.value.name);
  return matchingLink ? matchingLink.title : "";
});

const matchingLink = essentialLinks.find(
  (link) => link.name === currentRoute.value.name
);
Sitename.value = matchingLink ? matchingLink.title : "";

watch(currentRoute, () => {
  const matchingLink = essentialLinks.find(
    (link) => link.name === currentRoute.value.name
  );
  Sitename.value = matchingLink ? matchingLink.title : "";
});

const logout = async () => {
  try {
    localStorage.clear();
    router.push({ name: "login" });
  } catch (error) {
    console.error("Logout failed");
  }
};

const filteredEssentialLinks = computed(() =>
  essentialLinks.filter(
    (link) =>
      link.name !== "addproduct" &&
      link.name !== "editproduct" &&
      link.name !== "addcategory" &&
      link.name !== "editcategory"
  )
);
</script>

<style>
.drawer-content {
  margin-top: 60px;
}
</style>
