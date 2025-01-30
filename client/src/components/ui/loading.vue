<template lang="html">
    <img src="../../assets/img/loading.svg" class="ui-loading-animation">
</template>
<script>
export default {
    name: 'LoadingWheel'
    
}
</script>
<style lang="css">
.ui-loading-animation {
    animation: loading 1s steps(8) infinite;
}

@keyframes loading {
    0%    {rotate: 0deg;}
    100%  {rotate: 360deg;}
}
    
</style>