const scriptFunc = (theme = '') =>
  `
@import './scss-rule.scss';
$abbs-directs: (
  t: top,
  r: right,
  b: bottom,
  l: left,
);

/* 字体颜色 */
@each $key, $val in $colors {
  .${theme}color-#{$key} {
    color: $val;
  }
}

/* 边框颜色 */
@each $key, $val in $colors {
  .${theme}border-#{$key} {
    border-color: $val;
  }
}

/* 背景颜色 */
@each $key, $val in $colors {
  .${theme}bg-#{$key} {
    background-color: $val;
  }
}

/* 背景的hover颜色, 也可用于覆盖上面的bg-XXX */
@each $key, $val in $colors {
  .${theme}bg-#{$key}-hover {
    background-color: $val;
  }
}

/* 按钮的禁用背景颜色, 使用时类名disabled即可（貌似有问题，使用了平台自带的disabled效果） */
@each $key, $val in $colors {
  button[disabled].disabled.${theme}bg-#{$key} {
    background-color: $val;
  }
}

/* 按钮的禁用文字颜色, 使用时加上类名disabled即可（貌似有问题，使用了平台自带的disabled效果） */
@each $key, $val in $colors {
  button[disabled].disabled.${theme}color-#{$key} {
    color: $val;
  }
}

/* 字体家族 */
@each $key, $val in $familys {
  .${theme}family-#{$key} {
    font-family: $val;
  }
}

/* 遮罩类 */
@each $key, $val in $masks {
  .${theme}mask-#{$key} {
    background: $val;
  }
}

/* 阴影类 */
@each $key, $val in $shadows {
  .${theme}shadow-#{$key} {
    box-shadow: $val;
  }
}

/* 字体尺寸 */
@each $key, $val in $font-sizes {
  .${theme}font-#{$key} {
    font-size: $val;
  }
}

/* margin间距类，形如ml-l, mr-l */
@each $key, $val in $abbs-directs {
  @each $key2, $val2 in $gaps {
    .${theme}m#{$key}-#{$key2} {
      margin-#{$val}: $val2;
    }
  }
}

/* padding间距类，形如pl-l, pr-l */
@each $key, $val in $abbs-directs {
  @each $key2, $val2 in $gaps {
    .${theme}p#{$key}-#{$key2} {
      padding-#{$val}: $val2;
    }
  }
}

/* margin间距类，形如mlr-l, mtb-l */
@each $key, $val in $gaps {
  .${theme}mlr-#{$key} {
    margin-left: $val;
    margin-right: $val;
  }
}
@each $key, $val in $gaps {
  .${theme}mtb-#{$key} {
    margin-top: $val;
    margin-bottom: $val;
  }
}

/* padding间距类，形如plr-l, ptb-l, p-all-l */
@each $key, $val in $gaps {
  .${theme}plr-#{$key} {
    padding-left: $val;
    padding-right: $val;
  }
}
@each $key, $val in $gaps {
  .${theme}ptb-#{$key} {
    padding-top: $val;
    padding-bottom: $val;
  }
}
@each $key, $val in $gaps {
  .${theme}p-all-#{$key} {
    padding: $val;
  }
}

/* 高度类 */
@each $key, $val in $heights {
  .${theme}height-#{$key} {
    height: $val;
  }
}

/* 圆角类 */
@each $key, $val in $radius {
  .${theme}radius-#{$key} {
    border-radius: $val;
  }
}
/* 上下圆角类, 配合上面的radius-XXX来使用即可, 如radius-default radius-top */
.${theme}radius-top {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.${theme}radius-bottom {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

`;
module.exports = {
  scriptFunc,
};
