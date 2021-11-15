export const crash = (el1, el2) => {
  // 获取俩个元素的四条边位置
  let el1Pos = el1.getBoundingClientRect();
  let el2Pos = el2.getBoundingClientRect();
  if (
    el1Pos.right > el2Pos.left &&
    el1Pos.left < el2Pos.right &&
    el1Pos.bottom > el2Pos.top &&
    el1Pos.top < el2Pos.bottom
  ) {
    return true;
  } else {
    return false;
  }
}
