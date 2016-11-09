class SimpleAccordion {
    constructor({
        scope: s = window.document,
        rootSelector: r,
        itemSelector: i,
        titleSelector: t,
        contentSelector: c
    }, {
        enabled: e = false,
        mutualExclusive: me = true,
        openingDuration: od = 500,
        closingDuration: cd = 500,
        resolution: res = 3
    }) {
        this._rootSelector = r;
        this._itemSelector = i;
        this._titleSelector = t;
        this._contentSelector = c;
        this._scope = s;
        this._accordions = [];
        this._enabled = e;
        this._mutualExclusive = me;
        this._openingDuration = od;
        this._closingDuration = cd;
        this._resolution = res;

        this._this = this;
        this.findAccordions();

        if (this._enabled) {
            this.bindEventListeners();
        }
    }
    findAccordions() {
        for (let accordion of this._scope.querySelectorAll(this._rootSelector)) {
            let items = accordion.querySelectorAll(`:scope > ${this._itemSelector}`);
            this._accordions.push({ self: accordion, items: items });
        }
    }
    bindEventListeners() {
        for (let accordion of this._accordions) {
            accordion.self.addEventListener('click', (evnt) => this.handleClickEvent(evnt), false); // using arrow function so that 'this' references the current class scope.
        }
    }
    handleClickEvent(evnt) {
        evnt.stopPropagation();
        let clickedElement = evnt.target || evnt.srcElement;

        if (clickedElement && clickedElement.className === this._titleSelector.slice(1)) {
            //Now we know the target is a title!
            let clickedItem = clickedElement.parentNode;
            let clickedItemAccordion = clickedItem.parentNode;

            if (clickedItemAccordion === evnt.currentTarget)
                this.toggle(clickedElement.parentNode);
        }
    }
    toggle(item) {

        if (item.classList.contains('open')) {
            this.closeItem(item);
        } else if (this._mutualExclusive) {
            this.closeAccordion(item.parentNode);
            this.openItem(item);
        } else {
            this.openItem(item);
        }
    }
    openItem(item) {
        let itemContent = item.querySelector('.item-content');
        itemContent.style.visibility = 'hidden';
        itemContent.style.position = 'absolute';
        itemContent.style.display = 'block';
        let contentHeight = itemContent.getBoundingClientRect().height;
        itemContent.style.removeProperty('display');
        itemContent.style.removeProperty('position');
        itemContent.style.removeProperty('visibility');

        itemContent.style.height = '0px';

        item.classList.add('open');

        let interval = setInterval(() => {
            if (parseInt(itemContent.style.height.split('px')[0]) >= contentHeight) {
                clearInterval(interval);
                itemContent.style.removeProperty('height');
            }
            itemContent.style.height = `${parseInt(itemContent.style.height.split('px')[0]) + this._resolution}px`;

        }, Math.ceil(this._openingDuration / (contentHeight / this._resolution)));
    }
    closeItem(item) {
        let itemContent = item.querySelector('.item-content');
        let contentHeight = itemContent.getBoundingClientRect().height;
        itemContent.style.height = `${contentHeight}px`;
        let interval = setInterval(() => {
            if (parseInt(itemContent.style.height.split('px')[0]) <= this._resolution) {
                clearInterval(interval);
                itemContent.style.height = `0px`;
                itemContent.style.removeProperty('height');
                item.classList.remove('open');
            }
            itemContent.style.height = `${parseInt(itemContent.style.height.split('px')[0]) - this._resolution}px`;

        }, Math.ceil(this._closingDuration / (contentHeight / this._resolution)));
    }
    closeAccordion(accordion) {
        let items = accordion.querySelectorAll(`:scope > ${this._itemSelector}`);
        items.forEach((item) => {
            if (item.classList.contains('open'))
                this.closeItem(item);
        });
    }
    set enabled(e) {
        this._enabaled = e;
    }
    get enabled() {
        return this._enabaled;
    }
}
