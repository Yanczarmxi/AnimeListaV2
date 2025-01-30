<template lang="html">
    <div class="not-found-body d-flex justify-content-center">
        <div class="not-found-box d-flex flex-column justify-content-center align-items-center">
            <h1>ERROR 404</h1>
            <h4>Page not found</h4>
            <p class="mt-5">Nie tędy droga. Jesteś w backroomsach.</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "Error404Pane"
    
}
</script>
<style lang="css">
    .not-found-body {
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/img/bg404.jpg");
        background-size: cover;
    }

    .not-found-box {
        width: 512px;
        height: 256px;
        margin-top: 64px;
        background-color: var(--bg-normal-color);
        border-radius: 8px 8px 8px 8px;
        -webkit-box-shadow:0px 0px 45px 23px rgba(0,0,0,0.82);
        -moz-box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
        box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
    }
</style>