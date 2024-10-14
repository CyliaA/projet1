/* jshint esversion: 6 */

var MyEnum = {
    LoadAvatar    : 1,
};

class ButtonManager extends pc.ScriptType {
    onButtonClick() {
        switch (this.Choices) {
            case 1:
                this.LoadAvatar();
                break;
        }
    }
    // initialize code called once per entity
    initialize() {
        this.entity.element.on('mousedown', this.onRelease, this);
        if(this.entity.button) {
            this.entity.button.on('hoverstart', this.hoverStart, this);
            this.entity.button.on('hoverend',   this.hoverEnd, this);
        }
        if(this.app.touch)
            this.entity.element.on('touchend', this.onTouchDown, this);
    }

    hoverStart(event) {
        document.body.style.cursor = "pointer";
    }

    hoverEnd(event) {
        document.body.style.cursor = "auto";
    }

    onPressedDown(event) {
        this.pointerDown = true;
    }

    onMove(event) {
        this.pointerDown = false;
    }

    onRelease(event) {
        event.stopPropagation();
        this.onButtonClick();
        this.pointerDown = false;
        this.app.fire("sound:playSound", "Btnclick");
    }

    onTouchDown(event) {
        // event.stopPropagation();
        this.onButtonClick();
        this.pointerDown = false;
        this.app.fire("sound:playSound", "Btnclick");
    }

    LoadAvatar() {
        this.app.fire("BtnManager:LoadAvatarButtonClick");
    }
}

function mapEnum(Enum) {
    var reverseLookup = {};
    var result = [];
    for (var value in Enum) {
        if (!Enum.hasOwnProperty(value)) continue;
        var enumEntry = {};
        enumEntry[value] = Enum[value];
        result.push(enumEntry);
        reverseLookup[Enum[value]] = value;
    }
    Enum.toString = function (value) { return reverseLookup[value]; };
    return result;
}

pc.registerScript(ButtonManager, 'buttonManager');

ButtonManager.attributes.add('Choices', { type: 'number', enum: mapEnum(MyEnum) });