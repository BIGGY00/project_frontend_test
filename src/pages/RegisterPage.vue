<template>
  <q-page>
    <q-form @submit="login">
      <div class="q-pa-xl">
        <div class="q-gutter-md fixed-center text-center">
          <div class="text-h4">Register</div>
          <div class="text-h6">Welcome to our store</div>
          <!-- Username section -->
          <q-input
            label="Username"
            v-model="username"
            class="text-body1"
            filled
            clearable
            style="width: 450px"
          >
          </q-input>
          <!-- Phone section -->
          <q-input
            label="Phone"
            v-model="phone"
            class="text-body1"
            filled
            clearable
            style="width: 450px"
          >
          </q-input>
          <!-- Email section -->
          <q-input
            label="Email"
            v-model="email"
            class="text-body1"
            filled
            clearable
            style="width: 450px"
          >
          </q-input>
          <!-- Password section -->
          <q-input
            label="Password"
            v-model="password"
            class="text-body1"
            filled
            clearable
            style="width: 450px"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-ml-xs"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- Button section -->
          <q-btn @click="register" style="width: 300px">register</q-btn>
          <div class="text-body1">
            You have the account?
            <div class="cursor-pointer text-blue text-bold" @click="direct">
              --- Login ---
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

name: "register";

const router = useRouter();

const direct = async () => {
  router.push({ name: "login" });
};
</script>
