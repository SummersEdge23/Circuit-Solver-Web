'use strict';
class Templates {
    constructor() {
        this.ELEMENT_TAG_TEMPLATE = '{TAG}{ID}';
        this.ELEMENT_VAL_TEMPLATE = '{VAL}{UNIT}';
        this.DIVISION_TEXT_TEMPLATE = '{A} / {B}';
        this.PIXEL_TEMPLATE = '{VALUE}px';
        this.PNG_TEMPLATE = '{NAME}.png';
        this.FONT_TEMPLATE = 'spx f';
        this.TEXT_UNDERSCORE_TEMPLATE = '{TEXT}_';
        this.VERSION_TAG_TEMPLATE = 'v{VERSION_TAG}   ';
        this.TIMESTEP_TEMPLATE = 'Δt:={TIMESTEP}s';
        this.FILE_BUTTON_TEXT_TEMPLATE = '  {TEXT}  ';
        this.DEBUG_TEMPLATE = '({ID},{TYPE}),';
        this.TIME_DATA_TEMPLATE = {
            Frequency: -1,
            Resistance: -1,
            Capacitance: -1,
            Inductance: -1
        };
    }
}
