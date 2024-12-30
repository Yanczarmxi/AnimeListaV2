<template lang="html">
    <div class="md-body d-flex justify-content-center align-items-center">
      <div class="md-content d-flex flex-column align-content-between">
        <div class="md-header d-flex flex-row justify-content-between p-4 mb-3">
          <h3>Dodaj animu</h3>
          <button type="button" class="btn-close"></button>
        </div>

        <div class="md-body-content d-flex align-items-stretch p-4">
          Hi mom!
        </div>

        <div class="md-footer d-flex flex-row justify-content-end p-4">
          <div class="md-bt-box d-flex flex-row ">
            <button type="button" class="btn btn-secondary">Zamknij</button>
            <button type="button" class="btn btn-primary">Dodaj</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'ModalAddWindow',
}
</script>
<style lang="css">
.md-body {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.md-content {
  color: #000;
  background-color: #fff;
  position: relative;
  width: 800px;
  height: 600px;
  border-radius: 8px 8px 8px 8px;
}

.md-header {
  width: 100%;
  height: 28px;
}

.md-title {
  font-size: 18pt;
}

.md-body-content {
  
}

.md-footer {
  position: absolute;
  bottom: 0;
}

.md-bt-box {
  width: 96px;
  height: 100%;
}
</style>