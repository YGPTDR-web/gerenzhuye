// 1. QQ 一键复制功能
const qqBox = document.getElementById('qq-copy');
qqBox.addEventListener('click', () => {
  const qqNumber = '2807078381';
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(qqNumber).then(() => {
      showCopied();
    }).catch(err => {
      console.error('复制失败:', err);
      fallbackCopy(qqNumber);
    });
  } else {
    fallbackCopy(qqNumber);
  }
});

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopied();
  } catch(err) { console.error('复制失败:', err); }
  document.body.removeChild(textarea);
}

function showCopied() {
  const tip = qqBox.querySelector('.copy-tip');
  const originalText = tip.textContent;
  tip.textContent = '已复制 ✓';
  qqBox.classList.add('copied');
  setTimeout(() => {
    tip.textContent = originalText;
    qqBox.classList.remove('copied');
  }, 2000);
}

// 2. 顶部像素横幅迎风飘扬拆分
const flagElement = document.getElementById('flag-text');
const flagText = flagElement.innerText;
flagElement.innerHTML = '';

[...flagText].forEach((char, index) => {
  const span = document.createElement('span');
  span.innerText = char === ' ' ? '\u00A0' : char;
  span.style.animationDelay = `${index * 0.15}s`;
  flagElement.appendChild(span);
});

// 3. 左侧介绍“风吹波浪”效果拆分
const bioElement = document.getElementById('bio-text');
const bioText = bioElement.innerText;
bioElement.innerHTML = '';

[...bioText].forEach((char, index) => {
  const span = document.createElement('span');
  span.innerText = char === ' ' ? '\u00A0' : char;
  // 针对标点符号不添加过大的波动，只做轻微延迟
  const isPunctuation = /[，。！？、,.!?]/.test(char);
  
  if (isPunctuation) {
    span.style.animation = 'none';
  } else {
    // 0.12s 的间隔让波浪从左到右依次起伏
    span.style.animationDelay = `${index * 0.12}s`;
  }
  
  bioElement.appendChild(span);
});
