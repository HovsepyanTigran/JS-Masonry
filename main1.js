class Masonry{
    constructor(selector,options){
        this.selector = selector;
        this.options = options;
        this.render();
        if(this.options.autoresize){
            window.addEventListener('resize',()=>{
                this.render();
            });
        }
    }

        render() {
        let container  = document.querySelector(this.selector);
        this.imgsNodeList = container.querySelectorAll(".masonry__image")
        this.imgsNodeList.forEach(elem => {
            elem.style.width = this.options.columnWidth + 'px';
        });
        
        this.columnsArray = [];
        this.columnsArray.length = Math.floor(container.clientWidth / this.options.columnWidth);
        this.columnsArray.fill(0);
        
        for(this.j = 0; this.j < this.imgsNodeList.length; this.j++) {
            this.getMinimalHeightIndex();
            this.setCorrectPosition(this.j, this.getMinimalHeightIndex());
            this.setNewColumnHeight(this.getMinimalHeightIndex(),this.imgsNodeList[this.j].clientHeight);
        }

    }
    

    getMinimalHeightIndex() {
        return this.columnsArray.indexOf(Math.min(...this.columnsArray));
    }

    setNewColumnHeight(index,newHeight) {
        return this.columnsArray[index] += newHeight;
    }
    
    setCorrectPosition(index, indexofMinHeight) {
        this.imgsNodeList[index].style.left = indexofMinHeight * this.options.columnWidth + "px";
        if( index < this.columnCount) {
            this.imgsNodeList[this.j].style.top = 0;
        } else {
            this.imgsNodeList[this.j].style.top = this.columnsArray[indexofMinHeight] + "px"; 
        }
    }   

}
new Masonry('.masonry', {autoresize:true, columnWidth: 200})
