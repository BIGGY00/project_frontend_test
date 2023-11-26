<template>
  <div class="">
    <q-item clickable @click="$router.push({ name: name })">
      <q-item-section v-if="icon" avatar>
        <div class="flex items-center" style="margin-left: 40px">
          <q-icon :name="icon" class="mr-5" style="font-size: 24px" />
          <div class="q-ml-md" style="font-size: 16px">
            <q-item-label class="text-body1">{{ title }}</q-item-label>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "#",
    },
  },
});
</script>
