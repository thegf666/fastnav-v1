<template>
    <div>
        <Header></Header>
        <div class="content">
            <AddWeb style="margin-bottom: 23px"></AddWeb>
            <NavList style="padding-top: 10px;"></NavList>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>


export default {
    name: "index",
    data() {
        return {

        }
    }
}
</script>

<style>
.content {
    width: 1200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .content {
        width: 100%;
        padding: 0 10px;
    }
}
</style>
