<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button
        class="ion-padding"
        color="primary"
        shape="round"
        fill="outline"
        expand="full"
        router-link="/book"
        >Hadits</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style>
/* Add any specific styles for the Home page here */
</style>
