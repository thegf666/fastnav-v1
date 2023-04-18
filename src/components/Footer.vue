<template>
    <div class="footer-box">
        <div class="footer-text">
            Copyright ©2023 <a href="/">{{fn.title}}</a>
        </div>
        <!--请勿更改以下版权信息，删除或更改将拉入黑名单，无法获得后续更新-->
        <div class="footer-text">
            design by <a href="https://fastnav.cn" target="_blank">FastNav</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
.footer-box{
    display: flex;
    padding: 20px 0;
    border-top: 1px solid #ffffff24;
    flex-direction: column;
    align-items: center;
}
</style>
