<template>
  <div class="header-container">
      <div class="bk l">
          <div class="arrow top"></div> 
          <div class="arrow bottom"></div>
      </div>

      <div class="skew l"></div>

      <div class="main">
          <div class="content">
              <slot />
          </div>   
      </div>

      <div class="skew r"></div>
      
      <div class="bk r">
          <div class="arrow top"></div> 
          <div class="arrow bottom"></div>
      </div>
  </div>
</template>

<style scoped lang="scss">
$color: #f0e0c3;
$fg_color: #030420;

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.8rem;
}

* {
box-sizing: border-box;
}

.header-container {
width: 80%;
max-width: 1000px;
height: 80px;
margin: 40px auto; 
position: relative;
}

.header-container > div {
height: 50px;
}

.main {
color: $fg_color;
background: $color; 
position: relative;
display: block;
width: 90%;
left: 50%;
top: 0;
padding: 5px;
margin-left: -45%;
z-index: 10;

animation: main 250ms;
}

.main > div {
border: 1px dashed $fg_color;
border-color: change-color($fg_color , $alpha: 0.5);
height: 40px;
}

.bk {
background: scale-color($color, $lightness: -10%);
position: absolute;
width: 8%;
top: 12px;

animation: back 600ms;
}

.bk.l {
left: 0;
}

.bk.r {
right: 0;
}

.skew {
position: absolute;
background: scale-color($color, $lightness: -30%);
width: 3%;
top: 6px;
z-index: 5;

animation: edge 500ms;
}

.skew.l {
left: 5%;
transform: skew(00deg,20deg);
}

.skew.r {
right: 5%;
transform: skew(00deg,-20deg);
}

.bk.l > div {
left: -29px;
}

.bk.r > div {
right: -29px;
}

.arrow {
height: 25px !important;
position: absolute;
z-index: 2;
width: 0; 
height: 0; 

animation: back 600ms;
}

.arrow.top {
top: 0px;
border-top: 0px solid transparent;
border-bottom: 25px solid transparent; 	
border-right: 30px solid scale-color($color, $lightness: -10%); 
}

.arrow.bottom {
top: 25px;
border-top: 25px solid transparent;
border-bottom:0px solid transparent; 	
border-right: 30px solid scale-color($color, $lightness: -10%); 
}

.r .bottom {
border-top: 25px solid transparent;
border-bottom: 0px solid transparent; 	
border-left: 30px solid scale-color($color, $lightness: -10%); 
border-right: none;
}

.r .top {
border-bottom: 25px solid transparent;
border-top: 0px solid transparent; 	
border-left: 30px solid scale-color($color, $lightness: -10%); 
border-right: none;
}

@media all and (max-width: 1020px) {
.skew.l {
  left: 5%;
  transform: skew(00deg,25deg);
}

.skew.r {
  right: 5%;
  transform: skew(00deg,-25deg);
}
}

@media all and (max-width: 680px) {
.skew.l {
  left: 5%;
  transform: skew(00deg,30deg);
}

.skew.r {
  right: 5%;
  transform: skew(00deg,-30deg);
}
}

@media all and (max-width: 460px) {
.skew.l {
  left: 5%;
  transform: skew(00deg,40deg);
}
.skew.r {
  right: 5%;
  transform: skew(00deg,-40deg);
}
}


@keyframes main {
0% { transform: scaleX(0); }
100% { transform: scaleX(1); }
}

@keyframes edge {
0%, 50% { transform: scaleY(0); }
100% { transform: scaleY(1); }
}

@keyframes back {
0%, 75% { transform: scaleX(0); }
100% { transform: scaleX(1); }
}
</style>
