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
    element.addEventListener("click", (event) => {
        callback(event);
        event.stopPropagation();
        event.preventDefault();
        window.shop.draw();
    });
};

export const onHover = (element, callback) => {
    element.addEventListener("mouseover", (event) => {
        callback(event);
        event.stopPropagation();
        event.preventDefault();
        window.shop.draw();
    });
};

export const onLeave = (element, callback) => {
    element.addEventListener("mouseleave", (event) => {
        callback(event);
        event.stopPropagation();
        event.preventDefault();
        window.shop.draw();
    });
};

export const onMouseDown = (element, callback) => {
    element.addEventListener("mousedown", (event) => {
        callback(event);
        event.stopPropagation();
        event.preventDefault();
        window.shop.draw();
    });
};

export const onMouseUp = (element, callback) => {
    element.addEventListener("mouseup", (event) => {
        callback(event);
        event.stopPropagation();
        event.preventDefault();
        window.shop.draw();
    });
};