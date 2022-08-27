<template>
<div class="footer">
  <p>Groupomania © 2022</p>
  <a class="contact" href="mailto:groupomania@gmail.com">Nous contacter</a>
</div>  
</template>

<script>

export default {
  name: 'FooterComponent',
}
</script>

<style lang="scss" scoped>
  .footer{
    padding-top: 100px;
    padding-bottom:100px;
    border-top: solid 1px white ;

    p{
      margin-bottom: 50px;
    }
    .contact{
      color:black;
      text-decoration: none;
      
    }
    :hover.contact{
      color: #fd2d01;
    }

  }
</style>