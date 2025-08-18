<template>
  <div style="width: 500px;height: 500px;display: flex;justify-content: center;align-items: center;">
    <vueCropper
      ref="cropper"
      :img="req.img"
      :outputType="req.type"
      :centerBox="true"
      :canMove="false"
      :autoCrop="true"
      :fixed="true"
      :original="true"
    >
    </vueCropper>
</div>
  
</template>
<script>
  export default{
    data() {
      return {

      }
    },
    props: ['req'],
  }
</script>
<style scoped>
</style>