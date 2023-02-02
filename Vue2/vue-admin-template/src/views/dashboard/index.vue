<template>
    <div class="dashboard-container">
        <div class="dashboard-text">
            <h1>欢迎使用</h1>
            <a @click="toHome(url)">去官网>></a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Dashboard",
    data() {
        return {
            url: "http://localhost:8081/",
        };
    },
    computed: {
        ...mapGetters(["name"]),
    },
    methods: {
        toHome(e) {
            window.location.href = e;
        },
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        height: calc(100vh - 50px);
        min-width: calc(100vw - 210px);
        max-width: calc(100vw - 54px);
        background: url(../../../public/welcome.jpg) no-repeat;
        background-size: cover;
    }
    &-text {
        // font-size: 30px;
        // line-height: 46px;
        width: 300px;
        height: 80px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        h1 {
            margin: 0 0 20px;
            padding: 0;
            font-size: 36px;
            color: rgba(000, 000, 000, 0.5);
        }
        a {
             color: rgba(000, 000, 000, 0.5);

        }
    }
}
</style>
