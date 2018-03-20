---
title: Gallery
team: active
layout: onecolumn
description: Image Gallery
---
## {{page.description}}

A collection of images from the intrepid, early adopters showing Signal K systems being used afloat. Please feel free
to send us your own images, as we will be refreshing the gallery on a regular basis.

<div class="album">
  {% for image in site.data.gallery %}
    <figure data-toggle="gallery">
      <img src="/images/gallery/{{image.image}}" id="img-{{forloop.index}}">
      <figcaption>
        {{image.caption}}
      </figcaption>
    </figure>
  {% endfor %}
</div>

<div class="modal">
  <img class="modal-content">
</div>

<script>
$(function showImage() {
  $('figure[data-toggle="gallery"]').on('click', function(e) {
    var tgt = $('.modal');
    var tgtImg = $('.modal-content');

    var img = $(e.target).siblings('img');

    if(img.length === 0) {
      img = $(e.target).find('img');
    }

    if(img.length === 0) {
      img = $(e.target);
    }

    if(img.length === 0) {
      return false;
    }

    $(tgt).show();

    console.log(tgtImg[0]);

    tgtImg[0].src = img[0].src;
  });

  $('.modal').on('click', function() {
    $(this).hide();
  });
})
</script>
