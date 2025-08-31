export const removeAllListeners = (el, withChildren) => {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  }
  else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}

export const onClick = (element, callback) => {
    return element.addEventListener("click", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

export const onHover = (element, callback) => {
    return element.addEventListener("mouseover", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

export const onMouseIn = (element, callback) => {
    return element.addEventListener("mouseenter", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

export const onMouseOut = (element, callback) => {
    return element.addEventListener("mouseout", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

export const onLeave = (element, callback) => {
    return element.addEventListener("mouseleave", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

export const onMouseDown = (element, callback) => {
    return element.addEventListener("mousedown", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

export const onMouseUp = (element, callback) => {
    return element.addEventListener("mouseup", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};