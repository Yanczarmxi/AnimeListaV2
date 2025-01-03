<template lang="html">
    <div class="sl-menu-container">
        <div class="sl-active-content sl-border-radius-all" @click="ShowMenuToggle">
            <div class="sl-text-active-content">HI MOM!</div>
            <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
              <use xlink:href="#ico-down"/>
            </svg>
        </div>
        <div class="sl-sellect-menu" v-show="menuVisible">
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
            <div class="sl-sellect-content" @click="SetMenuContent(123)">
                <div class="sl-text-sellect-content">HI MOM!1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SelectorMenu',
    data() {
        return {
            menuVisible: false,
        }
    },

    methods: {
        ShowMenuToggle() {
            this.menuVisible = !this.menuVisible;
        },

        SetMenuContent(id) {
            console.log(id);
            this.menuVisible = false;
        },
    }
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

.sl-sellect-menu {
    display: flex;
    flex-direction: column;
    border-radius: 0 0 8px 8px;
    background-color: var(--bg-dark-color);
    max-height: 360px;
    overflow-y: auto;
    z-index: 1;
    position: absolute;
    max-width: inherit;
    width: auto;
    box-sizing: border-box;
}

.sl-sellect-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    background-color: var(--bg-dark-color);
    max-width: 100%;
    cursor: pointer;
}

.sl-sellect-content:hover {
    background-color: var(--bg-normal-color);
}

.sl-text-sellect-content {
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
}

.sl-text-sellect-content:hover {
    animation: scroll-left 5s linear infinite;
}

@keyframes scroll-left {
    0% {
        text-indent: 0; /* Start tekstu */
    }
    100% {
        text-indent: -100%; /* Przewijanie w lewo */
    }
}

</style>