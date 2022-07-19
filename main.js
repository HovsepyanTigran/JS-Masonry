function Masonry(selector, options) {
    let defaultOptions = {
        columnWidth: 200,
        autoresize: true || false
    }
    options = {...defaultOptions, ...options}

    let container  = document.querySelector(selector);
    let imgsNodeList = container.querySelectorAll(".masonry__image")
    imgsNodeList.forEach(elem => {
        elem.style.width = options.columnWidth + 'px';
    });

    window.removeEventListener('resize',onResize);
    if(options.autoresize){
        window.addEventListener('resize',onResize);
    }
    let containerWidth = container.clientWidth;
    let columnCount = Math.floor(containerWidth / options.columnWidth);
    let columnsArray = [];
    columnsArray.length = columnCount;
    columnsArray.fill(0);

    for(var j = 0; j < imgsNodeList.length; j++) {
        var minHeightIndx = getMinimalHeightIndex();
        setCorrectPosition(j, minHeightIndx);
        setNewColumnHeight(minHeightIndx,imgsNodeList[j].clientHeight);
    }

    function getMinimalHeightIndex() {
        return indexofMinHeight  = columnsArray.indexOf(Math.min(...columnsArray));
    }


    function setNewColumnHeight(index,newHeight) {
        return columnsArray[index] += newHeight;
    }
    
    function setCorrectPosition(index, indexofMinHeight) {
        imgsNodeList[index].style.left = indexofMinHeight * options.columnWidth + "px";
        if( index < columnCount) {
            imgsNodeList[j].style.top = 0;
        } else {
            imgsNodeList[j].style.top = columnsArray[indexofMinHeight] + "px"; 
        }
    }    
    
}  

var resizeTimer;
function onResize(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        Masonry('.masonry', {autoresize:true})
    },100)
    
}
new Masonry('.masonry', {autoresize:true})

