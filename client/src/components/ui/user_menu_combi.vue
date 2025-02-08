<template lang="html">
    <div class="usr-menu-box">
        <div class="usr-menu-opction">
            <div class="usr-icon-opction">
                <svg width="16" height="16" fill="currentColor">
                    <use xlink:href="#ico-gear" />
                </svg>
            </div>
            <span>Ustawienia</span>
        </div>

        <div class="usr-menu-opction">
            <div class="usr-icon-opction">
                <img src="../../assets/flag/pl.png" alt="PL">
            </div>
            <span>Język PL</span>
        </div>

        <div class="usr-menu-opction">
            <div class="usr-icon-opction">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-logout"/>
                </svg>
            </div>
            <span>Wylogój</span>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserMenuCombi',
    data() { return {
    }},
};
</script>


<style lang="css">
.usr-menu-box {
    position: absolute;
    border: 1px solid var(--bg-dark-color);
    border-radius: 0px;
    background-color: var(--bg-dark-color);
    color: #fff;
    top: 64px;
    right: 48px;
    width: 224px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0px 0px 18px -1px rgba(20,23,26,1);
    -webkit-box-shadow: 0px 0px 18px -1px rgba(20,23,26,1);
    -moz-box-shadow: 0px 0px 18px -1px rgba(20,23,26,1);
}

.usr-menu-opction {
    height: 40px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--bg-dark-color);
    cursor: pointer;
}

.usr-menu-opction:hover {
    background-color: var(--bg-normal-color);
}

.usr-icon-opction {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
