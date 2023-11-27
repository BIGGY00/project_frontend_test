<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-white flex" style="min-height: 70px">
      <q-toolbar>
        <q-toolbar-title
          class="title-text q-ml-md text-bold"
          style="color: black"
        >
        </q-toolbar-title>
        <q-btn
          class="text-white, bg-black"
          icon="menu"
          label="Orders"
          @click="direct"
        ></q-btn>
        <div class="flex justify-between q-gutter-md">
          <div class="text-black text-bold q-mr-xl q-ml-xl text-md">
            {{ "Cashier" }}
          </div>
        </div>
        <q-btn
          class="text-black"
          icon="logout"
          label="Logout"
          flat
          @click="logout"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  try {
    localStorage.clear();
    router.push({ name: "login" });
  } catch (error) {
    console.error("Logout failed");
  }
};

const direct = () => {
  router.push({ name: "orders" });
};
</script>

<style>
.drawer-content {
  margin-top: 60px;
}
</style>
