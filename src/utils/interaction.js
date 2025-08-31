export const onClick = (element, callback) => {
    return element.addEventListener("click", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

// export const onHover = (element, callback) => {
//     return element.addEventListener("mouseover", (event) => {
//         if(callback(event) !== false){
//             window.shop.draw();
//         }
//     });
// };

export const onMouseIn = (element, callback) => {
    return element.addEventListener("mouseenter", (event) => {
        if(callback(event) !== false){
            window.shop.draw();
        }
    });
};

// export const onMouseOut = (element, callback) => {
//     return element.addEventListener("mouseout", (event) => {
//         if(callback(event) !== false){
//             window.shop.draw();
//         }
//     });
// };

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