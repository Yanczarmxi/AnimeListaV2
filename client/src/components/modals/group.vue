<template lang="html">
  <div class="md-body d-flex justify-content-center align-items-center">
    <div class="md-content d-flex flex-column align-content-between">
      <div class="md-header">
        <h5>Dodaj grupę</h5>
        <div class="bt-md-exit" @click="CloseModal">
          <svg width="32" height="32" fill="currentColor" class="bi bi-database-fill-add">
            <use xlink:href="#ico-cross"/>
          </svg>
        </div>
      </div>

      <div class="md-body-content p-4">
        <label for="inp-title">Nazwa nowej grupy</label>
        <input type="text" class="lb-style m-1" style="width: 100%; height: 36px;" />
      </div>

      <div class="md-footer d-flex flex-row justify-content-end p-4">
        <button type="button" class="btn btn-secondary" @click="CloseModal">Zamknij</button>
        <button type="button" class="btn btn-primary bt-space" @click="EditAnime">Dodaj</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalAddGroupWindow',
  
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
  color: #fff;
  background-color: var(--bg-normal-color);
  position: relative;
  width: 800px;
  height: auto;
  border-radius: 8px 8px 8px 8px;
  -webkit-box-shadow:0px 0px 45px 23px rgba(0,0,0,0.82);
  -moz-box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
  box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
}

.md-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 63px;
  padding: 1rem;
  border-bottom: 1px solid #0e0e0e;
}

.bt-md-exit {
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  cursor: pointer;
}

.bt-md-exit:hover {
  color: #fff;
}

.md-title {
  font-size: 18pt;
}

.md-body-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 200px;
  height: 224px;
  width: 100%;
}

.md-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #0e0e0e;
}

.bt-clr {
  color: #fff;
}

.bt-space {
  margin-left: 16px;
}

.lb-style {
  background-color: var(--bg-dark-color);
  border: 0;
  border-radius: 8px 8px 8px 8px;
  color: #fff;
  padding: 7px;
}

/* Ukrywanie strzałek w Chrome, Edge i Safari */
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ukrywanie strzałek w Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>