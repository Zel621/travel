document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const addTextButton = document.getElementById("addTextButton");
    const fontSizeInput = document.getElementById("fontSize");
    const fontFamilySelect = document.getElementById("fontFamily");
    const fontColorInput = document.getElementById("fontColor");
    const imageUploadInput = document.getElementById("imageUpload");
    const shapeSelector = document.getElementById("shapeSelector");
    const addShapeButton = document.getElementById("addShapeButton");
    const shapeColorInput = document.getElementById("shapeColor");
  
    // Add Text Element
    addTextButton.addEventListener("click", () => {
      const textElement = document.createElement("div");
      textElement.classList.add("text-element");
      textElement.textContent = "Edit this text";
      textElement.contentEditable = true;
      textElement.style.fontSize = `${fontSizeInput.value}px`;
      textElement.style.fontFamily = fontFamilySelect.value;
      textElement.style.color = fontColorInput.value;
      canvas.appendChild(textElement);
      makeDraggable(textElement);
    });
  
    // Font and Color Change for Text Elements
    fontSizeInput.addEventListener("input", (event) => {
      const selectedElement = document.querySelector(".text-element:focus");
      if (selectedElement) {
        selectedElement.style.fontSize = `${event.target.value}px`;
      }
    });
  
    fontFamilySelect.addEventListener("change", (event) => {
      const selectedElement = document.querySelector(".text-element:focus");
      if (selectedElement) {
        selectedElement.style.fontFamily = event.target.value;
      }
    });
  
    fontColorInput.addEventListener("input", (event) => {
      const selectedElement = document.querySelector(".text-element:focus");
      if (selectedElement) {
        selectedElement.style.color = event.target.value;
      }
    });
  
    // Add Shape Element
    addShapeButton.addEventListener("click", () => {
      const shapeElement = document.createElement("div");
      shapeElement.classList.add("shape-element");
      shapeElement.style.backgroundColor = shapeColorInput.value;
  
      const shapeType = shapeSelector.value;
      if (shapeType === "rectangle") {
        shapeElement.classList.add("rectangle");
      } else if (shapeType === "circle") {
        shapeElement.classList.add("circle");
      }
  
      canvas.appendChild(shapeElement);
      makeDraggable(shapeElement);
      makeResizable(shapeElement);  // Enable resizing for shapes
    });
  
    // Upload Image as Canvas Background
    imageUploadInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        canvas.style.backgroundImage = `url(${e.target.result})`;
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  
    // Make Elements Draggable
    function makeDraggable(element) {
      let isDragging = false;
  
      element.addEventListener("mousedown", function (e) {
        isDragging = true;
        const offsetX = e.clientX - element.offsetLeft;
        const offsetY = e.clientY - element.offsetTop;
  
        function onMouseMove(e) {
          if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
          }
        }
  
        document.addEventListener("mousemove", onMouseMove);
  
        element.addEventListener("mouseup", function () {
          isDragging = false;
          document.removeEventListener("mousemove", onMouseMove);
        });
      });
    }
  
    // Make Shapes Resizable
    function makeResizable(element) {
      const resizer = document.createElement("div");
      resizer.style.width = "10px";
      resizer.style.height = "10px";
      resizer.style.background = "gray";
      resizer.style.position = "absolute";
      resizer.style.right = "0";
      resizer.style.bottom = "0";
      resizer.style.cursor = "se-resize";
      element.appendChild(resizer);
  
      let isResizing = false;
  
      resizer.addEventListener("mousedown", function (e) {
        isResizing = true;
        const initialWidth = element.offsetWidth;
        const initialHeight = element.offsetHeight;
        const initialX = e.clientX;
        const initialY = e.clientY;
  
        function onMouseMove(e) {
          if (isResizing) {
            const width = initialWidth + (e.clientX - initialX);
            const height = initialHeight + (e.clientY - initialY);
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
          }
        }
  
        document.addEventListener("mousemove", onMouseMove);
  
        document.addEventListener("mouseup", function () {
          isResizing = false;
          document.removeEventListener("mousemove", onMouseMove);
        });
      });
    }
  });
  
  
  