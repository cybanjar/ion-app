<script>
import { computed, defineComponent, loadingController, ref } from "vue";

export default defineComponent({
  setup() {
    const load = ref(false);

    const loading = computed({
      get: () => load,
      set: (val) => {
        load = val;
      },
    });

    const presentLoading = async () => {
      const loading = await loadingController.create({
        message: "Please wait...",
      });

      await loading.present();

      loading.dismiss();
    };

    return {
      presentLoading,
      loading,
    };
  },
});
</script>