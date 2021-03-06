'use strict';
class Templates {
	public readonly ELEMENT_TAG_TEMPLATE: string;
	public readonly ELEMENT_VAL_TEMPLATE: string;
	public readonly DIVISION_TEXT_TEMPLATE: string;
	public readonly PIXEL_TEMPLATE: string;
	public readonly PNG_TEMPLATE: string;
	public readonly TEXT_UNDERSCORE_TEMPLATE: string;
	public readonly VERSION_TAG_TEMPLATE: string;
	public readonly TIMESTEP_TEMPLATE: string;
	public readonly FILE_BUTTON_TEXT_TEMPLATE: string;
	public readonly DEBUG_TEMPLATE: string;
	public readonly GRAPH_DETAILS_TEMPLATE: string;
	constructor() {
		this.ELEMENT_TAG_TEMPLATE = '{TAG}{ID}';
		this.ELEMENT_VAL_TEMPLATE = '{VAL}{UNIT}';
		this.DIVISION_TEXT_TEMPLATE = '{A} / {B}';
		this.PIXEL_TEMPLATE = '{VALUE}px';
		this.PNG_TEMPLATE = '{NAME}.png';
		this.TEXT_UNDERSCORE_TEMPLATE = '{TEXT}_';
		this.VERSION_TAG_TEMPLATE = 'v{VERSION_TAG}   ';
		this.TIMESTEP_TEMPLATE = 'Δt:={TIMESTEP}s';
		this.FILE_BUTTON_TEXT_TEMPLATE = '  {TEXT}  ';
		this.DEBUG_TEMPLATE = '({ID},{TYPE}),';
		this.GRAPH_DETAILS_TEMPLATE = '{SCOPE}, Max: {MAX}, Min: {MIN} [{UNITS}]';
	}
}
