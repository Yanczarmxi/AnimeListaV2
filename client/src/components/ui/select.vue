<template lang="html">
    <div class="sl-menu-container">
        <div class="sl-active-content sl-border-radius-all">
            <div class="sl-text-active-content">HI MOM!</div>
            <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
              <use xlink:href="#ico-down"/>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SelectorMenu'
}
</script>
<style lang="css">
.sl-menu-container {
    min-width: 96px;
    color: #fff;
}

.sl-active-content {
    background-color: var(--bg-dark-color);
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px
}

.sl-border-radius-all {
    border-radius: 8px 8px 8px 8px;
}

.sl-border-radius-top {
    border-radius: 8px 8px 0px 0px;
}

.sl-text-active-content {
    width: 90%;
    max-width: 90%;
}
</style>