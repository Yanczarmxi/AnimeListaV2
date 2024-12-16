<template lang="html">
    <div class="modal" tabindex="-1" role="dialog" id="modal-window" aria-labelledby="modal-windowLabel" aria-hidden="true">
        <div class="modal-dialog modal-color modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                <button type="button" class="btn btn-primary">Dodaj</button>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
export default {
    name: 'ModalWindow'
}
</script>
<style lang="css">
.modal-color {
    color: #000;
}
</style>