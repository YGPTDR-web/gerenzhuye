// 1. QQ 一键复制功能
const qqBox = document.getElementById('qq-copy');
qqBox.addEventListener('click', () => {
  const qqNumber = '2807078381';
  
  // 使用现代剪贴板API
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

// 2. 像素横幅迎风飘扬拆分
// 将文字拆分为单个字符，并赋予不同的动画延迟，模拟波浪/旗帜飘扬效果
const flagElement = document.getElementById('flag-text');
const flagText = flagElement.innerText;
flagElement.innerHTML = '';

[...flagText].forEach((char, index) => {
  const span = document.createElement('span');
  span.innerText = char === ' ' ? '\u00A0' : char;
  // 根据字符索引设置不同的延迟，营造从左到右的波浪传递感
  span.style.animationDelay = `${index * 0.15}s`;
  flagElement.appendChild(span);
});

// 3. 滚动平滑与卡片视差（可选增强）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
