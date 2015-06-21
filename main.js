var el = document.querySelector('#under-construction');
var str = "UNDER CONSTRUCTION";
var strLength = str.length;
var whitespaceArray = [];
var marqueeArray = [];
var mode = 'add';
var int;

for (var i = 0; i < strLength; i++) {
  whitespaceArray.push(' ');
}

characterIndex = 0;
marqueeArray = Object.create(whitespaceArray);


function update() {
  if (characterIndex === strLength) {
    mode = (mode === 'add') ? 'remove' : 'add';
    characterIndex = 0;
  }

  if (mode === 'add') {
    char = str[characterIndex];
  } else {
    char = ' ';
  }

  marqueeArray[characterIndex] = char;
  marqueeStr = marqueeArray.join('');

  textProp = 'textContent' || 'innerText';
  el[textProp] = marqueeStr;

  characterIndex++;
}

int = setInterval(update, 12.5);
update();
