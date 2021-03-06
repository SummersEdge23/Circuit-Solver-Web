'use strict';
class HistoryManager {
	public history: Array<string>;
	public history_index: number;
	constructor() {
		this.history = [];
		this.history_index = -1;
	}
	watch(): void {
		if (global.variables.history['packet'].length > 0) {
			this.push(global.variables.history['packet'][0]);
			global.variables.history['packet'].splice(0, 1);
		}
	}
	push(packet: string): void {
		if (!global.flags.flag_add_element && !global.flags.flag_history_lock) {
			if (this.history.length > 0) {
				let last_history_index = this.history.length - 1;
				if (this.history[last_history_index] !== packet) {
					if (this.history_index > -1) {
						this.history.splice(this.history_index + 1, this.history.length - this.history_index);
					}
					this.history.push(packet);
					this.history_index = this.history.length - 1;
				}
			} else {
				if (this.history_index > -1) {
					this.history.splice(this.history_index + 1, this.history.length - this.history_index);
				}
				this.history.push(packet);
				this.history_index = this.history.length - 1;
			}
		}
	}
	undo(): void {
		if (this.history_index > 0) {
			this.history_index--;
			engine_functions.parse_elements(this.history[this.history_index]);
		}
	}
	redo(): void {
		if (this.history_index < this.history.length - 1) {
			this.history_index++;
			engine_functions.parse_elements(this.history[this.history_index]);
		}
	}
	clear(): void {
		this.history.splice(0, this.history.length);
	}
}
