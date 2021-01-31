'use strict';
class SimulationManager {
	public node_size: number;
	public offset: number;
	public initialized: boolean;
	public readonly SIMULATION_MAX_TIME: number;
	public continue_solving: boolean;
	public iterator: number;
	public solutions_ready: boolean;
	public simulation_step: number;
	public first_matrix_build: boolean;
	public first_error_check: boolean;
	public first_x_matrix_copy: boolean;
	public first_x_matrix_solution: boolean;
	public time_data: Array<TIME_DATA_TEMPLATE_T>;
	/* #INSERT_GENERATE_ELEMENT_SIMULATION_OFFSETS_DECLARATION# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	public ELEMENT_RESISTOR_OFFSET: number;
	public ELEMENT_CAPACITOR_OFFSET: number;
	public ELEMENT_INDUCTOR_OFFSET: number;
	public ELEMENT_GROUND_OFFSET: number;
	public ELEMENT_DCSOURCE_OFFSET: number;
	public ELEMENT_DCCURRENT_OFFSET: number;
	public ELEMENT_ACSOURCE_OFFSET: number;
	public ELEMENT_ACCURRENT_OFFSET: number;
	public ELEMENT_SQUAREWAVE_OFFSET: number;
	public ELEMENT_SAW_OFFSET: number;
	public ELEMENT_TRI_OFFSET: number;
	public ELEMENT_CONSTANT_OFFSET: number;
	public ELEMENT_WIRE_OFFSET: number;
	public ELEMENT_NET_OFFSET: number;
	public ELEMENT_NOTE_OFFSET: number;
	public ELEMENT_RAIL_OFFSET: number;
	public ELEMENT_VOLTMETER_OFFSET: number;
	public ELEMENT_OHMMETER_OFFSET: number;
	public ELEMENT_AMMETER_OFFSET: number;
	public ELEMENT_WATTMETER_OFFSET: number;
	public ELEMENT_FUSE_OFFSET: number;
	public ELEMENT_SPST_OFFSET: number;
	public ELEMENT_SPDT_OFFSET: number;
	public ELEMENT_NOT_OFFSET: number;
	public ELEMENT_DIODE_OFFSET: number;
	public ELEMENT_LED_OFFSET: number;
	public ELEMENT_ZENER_OFFSET: number;
	public ELEMENT_POTENTIOMETER_OFFSET: number;
	public ELEMENT_AND_OFFSET: number;
	public ELEMENT_OR_OFFSET: number;
	public ELEMENT_NAND_OFFSET: number;
	public ELEMENT_NOR_OFFSET: number;
	public ELEMENT_XOR_OFFSET: number;
	public ELEMENT_XNOR_OFFSET: number;
	public ELEMENT_DFF_OFFSET: number;
	public ELEMENT_VSAT_OFFSET: number;
	public ELEMENT_ADD_OFFSET: number;
	public ELEMENT_SUB_OFFSET: number;
	public ELEMENT_MUL_OFFSET: number;
	public ELEMENT_DIV_OFFSET: number;
	public ELEMENT_GAIN_OFFSET: number;
	public ELEMENT_ABS_OFFSET: number;
	public ELEMENT_VCSW_OFFSET: number;
	public ELEMENT_VCVS_OFFSET: number;
	public ELEMENT_VCCS_OFFSET: number;
	public ELEMENT_CCCS_OFFSET: number;
	public ELEMENT_CCVS_OFFSET: number;
	public ELEMENT_OPAMP_OFFSET: number;
	public ELEMENT_NMOS_OFFSET: number;
	public ELEMENT_PMOS_OFFSET: number;
	public ELEMENT_NPN_OFFSET: number;
	public ELEMENT_PNP_OFFSET: number;
	public ELEMENT_ADC_OFFSET: number;
	public ELEMENT_DAC_OFFSET: number;
	public ELEMENT_SAH_OFFSET: number;
	public ELEMENT_PWM_OFFSET: number;
	public ELEMENT_INTEGRATOR_OFFSET: number;
	public ELEMENT_DIFFERENTIATOR_OFFSET: number;
	public ELEMENT_LPF_OFFSET: number;
	public ELEMENT_HPF_OFFSET: number;
	public ELEMENT_REL_OFFSET: number;
	public ELEMENT_PID_OFFSET: number;
	public ELEMENT_LUT_OFFSET: number;
	public ELEMENT_VCR_OFFSET: number;
	public ELEMENT_VCCA_OFFSET: number;
	public ELEMENT_VCL_OFFSET: number;
	public ELEMENT_GRT_OFFSET: number;
	public ELEMENT_TPTZ_OFFSET: number;
	public ELEMENT_TRAN_OFFSET: number;
	/* <!-- END AUTOMATICALLY GENERATED !--> */
	public time_step: number;
	public simulation_time: number;
	public max_voltage_error: Array<Array<number>>;
	public max_current_error: Array<Array<number>>;
	public voltage_error_locked: boolean;
	public current_error_locked: boolean;
	public voltage_converged: boolean;
	public current_converged: boolean;
	constructor() {
		this.node_size = 0;
		this.offset = 0;
		this.initialized = false;
		this.SIMULATION_MAX_TIME = 1e18;
		this.continue_solving = true;
		this.iterator = 0;
		this.solutions_ready = false;
		this.simulation_step = 0;
		this.first_matrix_build = true;
		this.first_error_check = true;
		this.first_x_matrix_copy = true;
		this.first_x_matrix_solution = false;
		this.time_data = [];
		/* #INSERT_GENERATE_ELEMENT_SIMULATION_OFFSETS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.ELEMENT_DCSOURCE_OFFSET = 0;
		this.ELEMENT_ACSOURCE_OFFSET = this.ELEMENT_DCSOURCE_OFFSET + dcsources.length;
		this.ELEMENT_SQUAREWAVE_OFFSET = this.ELEMENT_ACSOURCE_OFFSET + acsources.length;
		this.ELEMENT_SAW_OFFSET = this.ELEMENT_SQUAREWAVE_OFFSET + squarewaves.length;
		this.ELEMENT_TRI_OFFSET = this.ELEMENT_SAW_OFFSET + sawwaves.length;
		this.ELEMENT_CONSTANT_OFFSET = this.ELEMENT_TRI_OFFSET + trianglewaves.length;
		this.ELEMENT_RAIL_OFFSET = this.ELEMENT_CONSTANT_OFFSET + constants.length;
		this.ELEMENT_OHMMETER_OFFSET = this.ELEMENT_RAIL_OFFSET + rails.length;
		this.ELEMENT_AMMETER_OFFSET = this.ELEMENT_OHMMETER_OFFSET + ohmmeters.length;
		this.ELEMENT_WATTMETER_OFFSET = this.ELEMENT_AMMETER_OFFSET + ammeters.length;
		this.ELEMENT_NOT_OFFSET = this.ELEMENT_WATTMETER_OFFSET + wattmeters.length;
		this.ELEMENT_AND_OFFSET = this.ELEMENT_NOT_OFFSET + nots.length;
		this.ELEMENT_OR_OFFSET = this.ELEMENT_AND_OFFSET + ands.length;
		this.ELEMENT_NAND_OFFSET = this.ELEMENT_OR_OFFSET + ors.length;
		this.ELEMENT_NOR_OFFSET = this.ELEMENT_NAND_OFFSET + nands.length;
		this.ELEMENT_XOR_OFFSET = this.ELEMENT_NOR_OFFSET + nors.length;
		this.ELEMENT_XNOR_OFFSET = this.ELEMENT_XOR_OFFSET + xors.length;
		this.ELEMENT_DFF_OFFSET = this.ELEMENT_XNOR_OFFSET + 1 * dffs.length;
		this.ELEMENT_VSAT_OFFSET = this.ELEMENT_DFF_OFFSET + dffs.length;
		this.ELEMENT_ADD_OFFSET = this.ELEMENT_VSAT_OFFSET + vsats.length;
		this.ELEMENT_SUB_OFFSET = this.ELEMENT_ADD_OFFSET + adders.length;
		this.ELEMENT_MUL_OFFSET = this.ELEMENT_SUB_OFFSET + subtractors.length;
		this.ELEMENT_DIV_OFFSET = this.ELEMENT_MUL_OFFSET + multipliers.length;
		this.ELEMENT_GAIN_OFFSET = this.ELEMENT_DIV_OFFSET + dividers.length;
		this.ELEMENT_ABS_OFFSET = this.ELEMENT_GAIN_OFFSET + gains.length;
		this.ELEMENT_VCVS_OFFSET = this.ELEMENT_ABS_OFFSET + absvals.length;
		this.ELEMENT_CCCS_OFFSET = this.ELEMENT_VCVS_OFFSET + vcvss.length;
		this.ELEMENT_CCVS_OFFSET = this.ELEMENT_CCCS_OFFSET + 1 * ccvss.length;
		this.ELEMENT_OPAMP_OFFSET = this.ELEMENT_CCVS_OFFSET + ccvss.length;
		this.ELEMENT_ADC_OFFSET = this.ELEMENT_OPAMP_OFFSET + opamps.length;
		this.ELEMENT_DAC_OFFSET = this.ELEMENT_ADC_OFFSET + adcs.length;
		this.ELEMENT_SAH_OFFSET = this.ELEMENT_DAC_OFFSET + dacs.length;
		this.ELEMENT_PWM_OFFSET = this.ELEMENT_SAH_OFFSET + sandhs.length;
		this.ELEMENT_INTEGRATOR_OFFSET = this.ELEMENT_PWM_OFFSET + pwms.length;
		this.ELEMENT_DIFFERENTIATOR_OFFSET = this.ELEMENT_INTEGRATOR_OFFSET + integrators.length;
		this.ELEMENT_LPF_OFFSET = this.ELEMENT_DIFFERENTIATOR_OFFSET + differentiators.length;
		this.ELEMENT_HPF_OFFSET = this.ELEMENT_LPF_OFFSET + lowpasses.length;
		this.ELEMENT_PID_OFFSET = this.ELEMENT_HPF_OFFSET + highpasses.length;
		this.ELEMENT_LUT_OFFSET = this.ELEMENT_PID_OFFSET + pids.length;
		this.ELEMENT_GRT_OFFSET = this.ELEMENT_LUT_OFFSET + luts.length;
		this.ELEMENT_TPTZ_OFFSET = this.ELEMENT_GRT_OFFSET + grts.length;
		this.ELEMENT_TRAN_OFFSET = this.ELEMENT_TPTZ_OFFSET + tptzs.length;
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		this.max_voltage_error = [];
		this.max_current_error = [];
		this.voltage_error_locked = false;
		this.current_error_locked = false;
		this.voltage_converged = false;
		this.current_converged = false;
		this.time_step = 5e-6;
		this.simulation_time = 0;
	}
	reset_simulation(): void {
		this.initialized = false;
		this.simulation_time = 0;
		this.continue_solving = true;
		this.solutions_ready = false;
		this.iterator = 0;
		this.simulation_step = 0;
		this.first_matrix_build = true;
		this.first_error_check = true;
		this.first_x_matrix_copy = true;
		this.first_x_matrix_solution = false;
		linear_algebra.first_lup_solve = true;
	}
	setup(): void {
		this.patch();
		global.variables.is_singular = false;
		this.first_matrix_build = true;
		this.reset_simulation();
		if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] === global.CONSTANTS.ON) {
			this.time_step = this.determine_optimal_timestep();
			bottom_menu.resize_bottom_menu();
		} else {
			this.time_data.splice(0, this.time_data.length);
		}
		this.reset_elements();
		this.reset_memory_devices();
		this.reset_reactive_elements();
		this.reset_non_linear_elements();
		this.reset_meter_values();
		node_manager.generate_unique_nodes_list();
		node_manager.assign_node_simulation_ids();
		engine_functions.assign_element_simulation_ids();
		this.node_size = node_manager.active_nodes.length;
		/* #INSERT_GENERATE_SIMULATION_MATRIX_SIZE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.offset =
			dcsources.length +
			acsources.length +
			squarewaves.length +
			sawwaves.length +
			trianglewaves.length +
			constants.length +
			rails.length +
			ohmmeters.length +
			ammeters.length +
			wattmeters.length +
			nots.length +
			ands.length +
			ors.length +
			nands.length +
			nors.length +
			xors.length +
			xnors.length +
			2 * dffs.length +
			vsats.length +
			adders.length +
			subtractors.length +
			multipliers.length +
			dividers.length +
			gains.length +
			absvals.length +
			vcvss.length +
			cccss.length +
			2 * ccvss.length +
			opamps.length +
			adcs.length +
			dacs.length +
			sandhs.length +
			pwms.length +
			integrators.length +
			differentiators.length +
			lowpasses.length +
			highpasses.length +
			pids.length +
			luts.length +
			grts.length +
			tptzs.length +
			transformers.length;
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		/* #INSERT_GENERATE_ELEMENT_SIMULATION_OFFSETS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.ELEMENT_DCSOURCE_OFFSET = 0;
		this.ELEMENT_ACSOURCE_OFFSET = this.ELEMENT_DCSOURCE_OFFSET + dcsources.length;
		this.ELEMENT_SQUAREWAVE_OFFSET = this.ELEMENT_ACSOURCE_OFFSET + acsources.length;
		this.ELEMENT_SAW_OFFSET = this.ELEMENT_SQUAREWAVE_OFFSET + squarewaves.length;
		this.ELEMENT_TRI_OFFSET = this.ELEMENT_SAW_OFFSET + sawwaves.length;
		this.ELEMENT_CONSTANT_OFFSET = this.ELEMENT_TRI_OFFSET + trianglewaves.length;
		this.ELEMENT_RAIL_OFFSET = this.ELEMENT_CONSTANT_OFFSET + constants.length;
		this.ELEMENT_OHMMETER_OFFSET = this.ELEMENT_RAIL_OFFSET + rails.length;
		this.ELEMENT_AMMETER_OFFSET = this.ELEMENT_OHMMETER_OFFSET + ohmmeters.length;
		this.ELEMENT_WATTMETER_OFFSET = this.ELEMENT_AMMETER_OFFSET + ammeters.length;
		this.ELEMENT_NOT_OFFSET = this.ELEMENT_WATTMETER_OFFSET + wattmeters.length;
		this.ELEMENT_AND_OFFSET = this.ELEMENT_NOT_OFFSET + nots.length;
		this.ELEMENT_OR_OFFSET = this.ELEMENT_AND_OFFSET + ands.length;
		this.ELEMENT_NAND_OFFSET = this.ELEMENT_OR_OFFSET + ors.length;
		this.ELEMENT_NOR_OFFSET = this.ELEMENT_NAND_OFFSET + nands.length;
		this.ELEMENT_XOR_OFFSET = this.ELEMENT_NOR_OFFSET + nors.length;
		this.ELEMENT_XNOR_OFFSET = this.ELEMENT_XOR_OFFSET + xors.length;
		this.ELEMENT_DFF_OFFSET = this.ELEMENT_XNOR_OFFSET + 1 * dffs.length;
		this.ELEMENT_VSAT_OFFSET = this.ELEMENT_DFF_OFFSET + dffs.length;
		this.ELEMENT_ADD_OFFSET = this.ELEMENT_VSAT_OFFSET + vsats.length;
		this.ELEMENT_SUB_OFFSET = this.ELEMENT_ADD_OFFSET + adders.length;
		this.ELEMENT_MUL_OFFSET = this.ELEMENT_SUB_OFFSET + subtractors.length;
		this.ELEMENT_DIV_OFFSET = this.ELEMENT_MUL_OFFSET + multipliers.length;
		this.ELEMENT_GAIN_OFFSET = this.ELEMENT_DIV_OFFSET + dividers.length;
		this.ELEMENT_ABS_OFFSET = this.ELEMENT_GAIN_OFFSET + gains.length;
		this.ELEMENT_VCVS_OFFSET = this.ELEMENT_ABS_OFFSET + absvals.length;
		this.ELEMENT_CCCS_OFFSET = this.ELEMENT_VCVS_OFFSET + vcvss.length;
		this.ELEMENT_CCVS_OFFSET = this.ELEMENT_CCCS_OFFSET + 1 * ccvss.length;
		this.ELEMENT_OPAMP_OFFSET = this.ELEMENT_CCVS_OFFSET + ccvss.length;
		this.ELEMENT_ADC_OFFSET = this.ELEMENT_OPAMP_OFFSET + opamps.length;
		this.ELEMENT_DAC_OFFSET = this.ELEMENT_ADC_OFFSET + adcs.length;
		this.ELEMENT_SAH_OFFSET = this.ELEMENT_DAC_OFFSET + dacs.length;
		this.ELEMENT_PWM_OFFSET = this.ELEMENT_SAH_OFFSET + sandhs.length;
		this.ELEMENT_INTEGRATOR_OFFSET = this.ELEMENT_PWM_OFFSET + pwms.length;
		this.ELEMENT_DIFFERENTIATOR_OFFSET = this.ELEMENT_INTEGRATOR_OFFSET + integrators.length;
		this.ELEMENT_LPF_OFFSET = this.ELEMENT_DIFFERENTIATOR_OFFSET + differentiators.length;
		this.ELEMENT_HPF_OFFSET = this.ELEMENT_LPF_OFFSET + lowpasses.length;
		this.ELEMENT_PID_OFFSET = this.ELEMENT_HPF_OFFSET + highpasses.length;
		this.ELEMENT_LUT_OFFSET = this.ELEMENT_PID_OFFSET + pids.length;
		this.ELEMENT_GRT_OFFSET = this.ELEMENT_LUT_OFFSET + luts.length;
		this.ELEMENT_TPTZ_OFFSET = this.ELEMENT_GRT_OFFSET + grts.length;
		this.ELEMENT_TRAN_OFFSET = this.ELEMENT_TPTZ_OFFSET + tptzs.length;
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		toast.set_text(language_manager.START_SIMULATION[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
		toast.show();
		this.solutions_ready = false;
		global.flags.signal_build_element = true;
		this.initialized = true;
	}
	determine_optimal_timestep(): number {
		this.time_data.splice(0, this.time_data.length);
		/* #INSERT_GENERATE_PUSH_TIME_DATA# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < resistors.length; i++) {
			this.time_data.push(resistors[i].time_data());
		}
		for (var i: number = 0; i < capacitors.length; i++) {
			this.time_data.push(capacitors[i].time_data());
		}
		for (var i: number = 0; i < inductors.length; i++) {
			this.time_data.push(inductors[i].time_data());
		}
		for (var i: number = 0; i < grounds.length; i++) {
			this.time_data.push(grounds[i].time_data());
		}
		for (var i: number = 0; i < dcsources.length; i++) {
			this.time_data.push(dcsources[i].time_data());
		}
		for (var i: number = 0; i < dccurrents.length; i++) {
			this.time_data.push(dccurrents[i].time_data());
		}
		for (var i: number = 0; i < acsources.length; i++) {
			this.time_data.push(acsources[i].time_data());
		}
		for (var i: number = 0; i < accurrents.length; i++) {
			this.time_data.push(accurrents[i].time_data());
		}
		for (var i: number = 0; i < squarewaves.length; i++) {
			this.time_data.push(squarewaves[i].time_data());
		}
		for (var i: number = 0; i < sawwaves.length; i++) {
			this.time_data.push(sawwaves[i].time_data());
		}
		for (var i: number = 0; i < trianglewaves.length; i++) {
			this.time_data.push(trianglewaves[i].time_data());
		}
		for (var i: number = 0; i < constants.length; i++) {
			this.time_data.push(constants[i].time_data());
		}
		for (var i: number = 0; i < wires.length; i++) {
			this.time_data.push(wires[i].time_data());
		}
		for (var i: number = 0; i < nets.length; i++) {
			this.time_data.push(nets[i].time_data());
		}
		for (var i: number = 0; i < notes.length; i++) {
			this.time_data.push(notes[i].time_data());
		}
		for (var i: number = 0; i < rails.length; i++) {
			this.time_data.push(rails[i].time_data());
		}
		for (var i: number = 0; i < voltmeters.length; i++) {
			this.time_data.push(voltmeters[i].time_data());
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			this.time_data.push(ohmmeters[i].time_data());
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			this.time_data.push(ammeters[i].time_data());
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			this.time_data.push(wattmeters[i].time_data());
		}
		for (var i: number = 0; i < fuses.length; i++) {
			this.time_data.push(fuses[i].time_data());
		}
		for (var i: number = 0; i < spsts.length; i++) {
			this.time_data.push(spsts[i].time_data());
		}
		for (var i: number = 0; i < spdts.length; i++) {
			this.time_data.push(spdts[i].time_data());
		}
		for (var i: number = 0; i < nots.length; i++) {
			this.time_data.push(nots[i].time_data());
		}
		for (var i: number = 0; i < diodes.length; i++) {
			this.time_data.push(diodes[i].time_data());
		}
		for (var i: number = 0; i < leds.length; i++) {
			this.time_data.push(leds[i].time_data());
		}
		for (var i: number = 0; i < zeners.length; i++) {
			this.time_data.push(zeners[i].time_data());
		}
		for (var i: number = 0; i < potentiometers.length; i++) {
			this.time_data.push(potentiometers[i].time_data());
		}
		for (var i: number = 0; i < ands.length; i++) {
			this.time_data.push(ands[i].time_data());
		}
		for (var i: number = 0; i < ors.length; i++) {
			this.time_data.push(ors[i].time_data());
		}
		for (var i: number = 0; i < nands.length; i++) {
			this.time_data.push(nands[i].time_data());
		}
		for (var i: number = 0; i < nors.length; i++) {
			this.time_data.push(nors[i].time_data());
		}
		for (var i: number = 0; i < xors.length; i++) {
			this.time_data.push(xors[i].time_data());
		}
		for (var i: number = 0; i < xnors.length; i++) {
			this.time_data.push(xnors[i].time_data());
		}
		for (var i: number = 0; i < dffs.length; i++) {
			this.time_data.push(dffs[i].time_data());
		}
		for (var i: number = 0; i < vsats.length; i++) {
			this.time_data.push(vsats[i].time_data());
		}
		for (var i: number = 0; i < adders.length; i++) {
			this.time_data.push(adders[i].time_data());
		}
		for (var i: number = 0; i < subtractors.length; i++) {
			this.time_data.push(subtractors[i].time_data());
		}
		for (var i: number = 0; i < multipliers.length; i++) {
			this.time_data.push(multipliers[i].time_data());
		}
		for (var i: number = 0; i < dividers.length; i++) {
			this.time_data.push(dividers[i].time_data());
		}
		for (var i: number = 0; i < gains.length; i++) {
			this.time_data.push(gains[i].time_data());
		}
		for (var i: number = 0; i < absvals.length; i++) {
			this.time_data.push(absvals[i].time_data());
		}
		for (var i: number = 0; i < vcsws.length; i++) {
			this.time_data.push(vcsws[i].time_data());
		}
		for (var i: number = 0; i < vcvss.length; i++) {
			this.time_data.push(vcvss[i].time_data());
		}
		for (var i: number = 0; i < vccss.length; i++) {
			this.time_data.push(vccss[i].time_data());
		}
		for (var i: number = 0; i < cccss.length; i++) {
			this.time_data.push(cccss[i].time_data());
		}
		for (var i: number = 0; i < ccvss.length; i++) {
			this.time_data.push(ccvss[i].time_data());
		}
		for (var i: number = 0; i < opamps.length; i++) {
			this.time_data.push(opamps[i].time_data());
		}
		for (var i: number = 0; i < nmosfets.length; i++) {
			this.time_data.push(nmosfets[i].time_data());
		}
		for (var i: number = 0; i < pmosfets.length; i++) {
			this.time_data.push(pmosfets[i].time_data());
		}
		for (var i: number = 0; i < npns.length; i++) {
			this.time_data.push(npns[i].time_data());
		}
		for (var i: number = 0; i < pnps.length; i++) {
			this.time_data.push(pnps[i].time_data());
		}
		for (var i: number = 0; i < adcs.length; i++) {
			this.time_data.push(adcs[i].time_data());
		}
		for (var i: number = 0; i < dacs.length; i++) {
			this.time_data.push(dacs[i].time_data());
		}
		for (var i: number = 0; i < sandhs.length; i++) {
			this.time_data.push(sandhs[i].time_data());
		}
		for (var i: number = 0; i < pwms.length; i++) {
			this.time_data.push(pwms[i].time_data());
		}
		for (var i: number = 0; i < integrators.length; i++) {
			this.time_data.push(integrators[i].time_data());
		}
		for (var i: number = 0; i < differentiators.length; i++) {
			this.time_data.push(differentiators[i].time_data());
		}
		for (var i: number = 0; i < lowpasses.length; i++) {
			this.time_data.push(lowpasses[i].time_data());
		}
		for (var i: number = 0; i < highpasses.length; i++) {
			this.time_data.push(highpasses[i].time_data());
		}
		for (var i: number = 0; i < relays.length; i++) {
			this.time_data.push(relays[i].time_data());
		}
		for (var i: number = 0; i < pids.length; i++) {
			this.time_data.push(pids[i].time_data());
		}
		for (var i: number = 0; i < luts.length; i++) {
			this.time_data.push(luts[i].time_data());
		}
		for (var i: number = 0; i < vcrs.length; i++) {
			this.time_data.push(vcrs[i].time_data());
		}
		for (var i: number = 0; i < vccas.length; i++) {
			this.time_data.push(vccas[i].time_data());
		}
		for (var i: number = 0; i < vcls.length; i++) {
			this.time_data.push(vcls[i].time_data());
		}
		for (var i: number = 0; i < grts.length; i++) {
			this.time_data.push(grts[i].time_data());
		}
		for (var i: number = 0; i < tptzs.length; i++) {
			this.time_data.push(tptzs[i].time_data());
		}
		for (var i: number = 0; i < transformers.length; i++) {
			this.time_data.push(transformers[i].time_data());
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		let max_frequency: number = global.CONSTANTS.ZERO;
		let min_frequency: number = Number.MAX_VALUE;
		let max_resistance: number = global.CONSTANTS.ZERO;
		let min_resistance: number = Number.MAX_VALUE;
		let max_capacitance: number = global.CONSTANTS.ZERO;
		let min_capacitance: number = Number.MAX_VALUE;
		let max_inductance: number = global.CONSTANTS.ZERO;
		let min_inductance: number = Number.MAX_VALUE;
		let parallel_resistance: number = global.CONSTANTS.ZERO;
		let series_resistance: number = global.CONSTANTS.ZERO;
		let parallel_series_updated: boolean = false;
		let min_freq_updated: boolean = false;
		let max_freq_updated: boolean = false;
		let min_res_updated: boolean = false;
		let max_res_updated: boolean = false;
		let min_cap_updated: boolean = false;
		let max_cap_updated: boolean = false;
		let min_ind_updated: boolean = false;
		let max_ind_updated: boolean = false;
		for (var i: number = 0; i < this.time_data.length; i++) {
			if (this.time_data[i]['Resistance'] > 0) {
				parallel_resistance += global.utils.copy(1.0 / this.time_data[i]['Resistance']);
				series_resistance += global.utils.copy(this.time_data[i]['Resistance']);
				if (!parallel_series_updated) {
					parallel_series_updated = true;
				}
			}
			if (this.time_data[i]['Frequency'] < min_frequency && this.time_data[i]['Frequency'] > 0) {
				min_frequency = global.utils.copy(this.time_data[i]['Frequency']);
				if (!min_freq_updated) {
					min_freq_updated = true;
				}
			}
			if (this.time_data[i]['Frequency'] > max_frequency && this.time_data[i]['Frequency'] > 0) {
				max_frequency = global.utils.copy(this.time_data[i]['Frequency']);
				if (!max_freq_updated) {
					max_freq_updated = true;
				}
			}
			if (this.time_data[i]['Capacitance'] > max_capacitance && this.time_data[i]['Capacitance'] > 0) {
				max_capacitance = global.utils.copy(this.time_data[i]['Capacitance']);
				if (!max_cap_updated) {
					max_cap_updated = true;
				}
			}
			if (this.time_data[i]['Resistance'] > max_resistance && this.time_data[i]['Resistance'] > 0) {
				max_resistance = global.utils.copy(this.time_data[i]['Resistance']);
				if (!max_res_updated) {
					max_res_updated = true;
				}
			}
			if (this.time_data[i]['Inductance'] > max_inductance && this.time_data[i]['Inductance'] > 0) {
				max_inductance = global.utils.copy(this.time_data[i]['Inductance']);
				if (!max_ind_updated) {
					max_ind_updated = true;
				}
			}
			if (this.time_data[i]['Capacitance'] < min_capacitance && this.time_data[i]['Capacitance'] > 0) {
				min_capacitance = global.utils.copy(this.time_data[i]['Capacitance']);
				if (!min_cap_updated) {
					min_cap_updated = true;
				}
			}
			if (this.time_data[i]['Resistance'] < min_resistance && this.time_data[i]['Resistance'] > 0) {
				min_resistance = global.utils.copy(this.time_data[i]['Resistance']);
				if (!min_res_updated) {
					min_res_updated = true;
				}
			}
			if (this.time_data[i]['Inductance'] < min_inductance && this.time_data[i]['Inductance'] > 0) {
				min_inductance = global.utils.copy(this.time_data[i]['Inductance']);
				if (!min_ind_updated) {
					min_ind_updated = true;
				}
			}
		}
		parallel_resistance = 1.0 / parallel_resistance;
		if (!parallel_series_updated) {
			parallel_resistance = 376.73;
			series_resistance = 376.73;
		}
		if (!min_freq_updated) {
			min_frequency = global.settings.MIN_FREQUENCY;
		}
		if (!max_freq_updated) {
			max_frequency = global.settings.MIN_FREQUENCY;
		}
		if (!min_res_updated) {
			min_resistance = global.settings.R_MAX * 0.5;
		}
		if (!max_res_updated) {
			max_resistance = global.settings.R_MAX * 0.5;
		}
		if (!min_cap_updated) {
			min_capacitance = global.settings.MAX_CAPACITANCE;
		}
		if (!max_cap_updated) {
			max_capacitance = global.settings.MAX_CAPACITANCE;
		}
		if (!min_ind_updated) {
			min_inductance = global.settings.MAX_INDUCTANCE;
		}
		if (!max_ind_updated) {
			max_inductance = global.settings.MAX_INDUCTANCE;
		}
		let ts_final: number = 1;
		let multiplier: number = 0.016;
		if (parallel_series_updated) {
			let rc_parallel: number = Math.min(Math.max(parallel_resistance * min_capacitance * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			let rl_parallel: number = Math.min(Math.max((min_inductance / parallel_resistance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			let t_lc: number = Math.min(Math.max(Math.sqrt(min_capacitance * min_inductance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			let max_period: number = (1.0 / max_frequency) * multiplier;
			let rc_series: number = Math.min(Math.max(series_resistance * min_capacitance * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			let rl_series: number = Math.min(Math.max((min_inductance / series_resistance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			let min_period: number = (1.0 / min_frequency) * multiplier;
			let ts1: number = global.utils.min3(rc_parallel, rl_parallel, max_period);
			let ts2: number = global.utils.min3(rc_series, rl_series, min_period);
			ts_final = global.utils.min3(ts1, ts2, t_lc);
			ts_final = Math.min(Math.max(ts_final, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			if (!max_freq_updated && !min_freq_updated && !min_cap_updated && !max_cap_updated && !min_ind_updated && !max_ind_updated) {
				ts_final = 1;
			}
		} else {
			let t_lc: number = Math.min(Math.max(Math.sqrt(min_capacitance * min_inductance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			let max_period: number = (1.0 / max_frequency) * multiplier;
			let min_period: number = (1.0 / min_frequency) * multiplier;
			ts_final = global.utils.min3(max_period, min_period, t_lc);
			ts_final = Math.min(Math.max(ts_final, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
			if (!max_freq_updated && !min_freq_updated && !min_cap_updated && !max_cap_updated && !min_ind_updated && !max_ind_updated) {
				ts_final = 1;
			}
		}
		return ts_final;
	}
	terminate(): void {
		this.node_size = 0;
		this.offset = 0;
		this.initialized = false;
		this.continue_solving = true;
		this.iterator = 0;
		this.simulation_time = 0;
		this.simulation_step = 0;
		this.solutions_ready = false;
		global.variables.is_singular = false;
		toast.set_text(language_manager.STOP_SIMULATION[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
		toast.show();
	}
	reset_elements(): void {
		/* #INSERT_GENERATE_RESET_ELEMENTS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < resistors.length; i++) {
			resistors[i].reset();
		}
		for (var i: number = 0; i < capacitors.length; i++) {
			capacitors[i].reset();
		}
		for (var i: number = 0; i < inductors.length; i++) {
			inductors[i].reset();
		}
		for (var i: number = 0; i < grounds.length; i++) {
			grounds[i].reset();
		}
		for (var i: number = 0; i < dcsources.length; i++) {
			dcsources[i].reset();
		}
		for (var i: number = 0; i < dccurrents.length; i++) {
			dccurrents[i].reset();
		}
		for (var i: number = 0; i < acsources.length; i++) {
			acsources[i].reset();
		}
		for (var i: number = 0; i < accurrents.length; i++) {
			accurrents[i].reset();
		}
		for (var i: number = 0; i < squarewaves.length; i++) {
			squarewaves[i].reset();
		}
		for (var i: number = 0; i < sawwaves.length; i++) {
			sawwaves[i].reset();
		}
		for (var i: number = 0; i < trianglewaves.length; i++) {
			trianglewaves[i].reset();
		}
		for (var i: number = 0; i < constants.length; i++) {
			constants[i].reset();
		}
		for (var i: number = 0; i < wires.length; i++) {
			wires[i].reset();
		}
		for (var i: number = 0; i < nets.length; i++) {
			nets[i].reset();
		}
		for (var i: number = 0; i < notes.length; i++) {
			notes[i].reset();
		}
		for (var i: number = 0; i < rails.length; i++) {
			rails[i].reset();
		}
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].reset();
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].reset();
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].reset();
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].reset();
		}
		for (var i: number = 0; i < fuses.length; i++) {
			fuses[i].reset();
		}
		for (var i: number = 0; i < spsts.length; i++) {
			spsts[i].reset();
		}
		for (var i: number = 0; i < spdts.length; i++) {
			spdts[i].reset();
		}
		for (var i: number = 0; i < nots.length; i++) {
			nots[i].reset();
		}
		for (var i: number = 0; i < diodes.length; i++) {
			diodes[i].reset();
		}
		for (var i: number = 0; i < leds.length; i++) {
			leds[i].reset();
		}
		for (var i: number = 0; i < zeners.length; i++) {
			zeners[i].reset();
		}
		for (var i: number = 0; i < potentiometers.length; i++) {
			potentiometers[i].reset();
		}
		for (var i: number = 0; i < ands.length; i++) {
			ands[i].reset();
		}
		for (var i: number = 0; i < ors.length; i++) {
			ors[i].reset();
		}
		for (var i: number = 0; i < nands.length; i++) {
			nands[i].reset();
		}
		for (var i: number = 0; i < nors.length; i++) {
			nors[i].reset();
		}
		for (var i: number = 0; i < xors.length; i++) {
			xors[i].reset();
		}
		for (var i: number = 0; i < xnors.length; i++) {
			xnors[i].reset();
		}
		for (var i: number = 0; i < dffs.length; i++) {
			dffs[i].reset();
		}
		for (var i: number = 0; i < vsats.length; i++) {
			vsats[i].reset();
		}
		for (var i: number = 0; i < adders.length; i++) {
			adders[i].reset();
		}
		for (var i: number = 0; i < subtractors.length; i++) {
			subtractors[i].reset();
		}
		for (var i: number = 0; i < multipliers.length; i++) {
			multipliers[i].reset();
		}
		for (var i: number = 0; i < dividers.length; i++) {
			dividers[i].reset();
		}
		for (var i: number = 0; i < gains.length; i++) {
			gains[i].reset();
		}
		for (var i: number = 0; i < absvals.length; i++) {
			absvals[i].reset();
		}
		for (var i: number = 0; i < vcsws.length; i++) {
			vcsws[i].reset();
		}
		for (var i: number = 0; i < vcvss.length; i++) {
			vcvss[i].reset();
		}
		for (var i: number = 0; i < vccss.length; i++) {
			vccss[i].reset();
		}
		for (var i: number = 0; i < cccss.length; i++) {
			cccss[i].reset();
		}
		for (var i: number = 0; i < ccvss.length; i++) {
			ccvss[i].reset();
		}
		for (var i: number = 0; i < opamps.length; i++) {
			opamps[i].reset();
		}
		for (var i: number = 0; i < nmosfets.length; i++) {
			nmosfets[i].reset();
		}
		for (var i: number = 0; i < pmosfets.length; i++) {
			pmosfets[i].reset();
		}
		for (var i: number = 0; i < npns.length; i++) {
			npns[i].reset();
		}
		for (var i: number = 0; i < pnps.length; i++) {
			pnps[i].reset();
		}
		for (var i: number = 0; i < adcs.length; i++) {
			adcs[i].reset();
		}
		for (var i: number = 0; i < dacs.length; i++) {
			dacs[i].reset();
		}
		for (var i: number = 0; i < sandhs.length; i++) {
			sandhs[i].reset();
		}
		for (var i: number = 0; i < pwms.length; i++) {
			pwms[i].reset();
		}
		for (var i: number = 0; i < integrators.length; i++) {
			integrators[i].reset();
		}
		for (var i: number = 0; i < differentiators.length; i++) {
			differentiators[i].reset();
		}
		for (var i: number = 0; i < lowpasses.length; i++) {
			lowpasses[i].reset();
		}
		for (var i: number = 0; i < highpasses.length; i++) {
			highpasses[i].reset();
		}
		for (var i: number = 0; i < relays.length; i++) {
			relays[i].reset();
		}
		for (var i: number = 0; i < pids.length; i++) {
			pids[i].reset();
		}
		for (var i: number = 0; i < luts.length; i++) {
			luts[i].reset();
		}
		for (var i: number = 0; i < vcrs.length; i++) {
			vcrs[i].reset();
		}
		for (var i: number = 0; i < vccas.length; i++) {
			vccas[i].reset();
		}
		for (var i: number = 0; i < vcls.length; i++) {
			vcls[i].reset();
		}
		for (var i: number = 0; i < grts.length; i++) {
			grts[i].reset();
		}
		for (var i: number = 0; i < tptzs.length; i++) {
			tptzs[i].reset();
		}
		for (var i: number = 0; i < transformers.length; i++) {
			transformers[i].reset();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset_memory_devices(): void {
		/* #INSERT_GENERATE_RESET_MEMORY_ELEMENTS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < fuses.length; i++) {
			fuses[i].reset_fuse();
		}
		for (var i: number = 0; i < dffs.length; i++) {
			dffs[i].reset_dff();
		}
		for (var i: number = 0; i < sandhs.length; i++) {
			sandhs[i].reset_samplers();
		}
		for (var i: number = 0; i < lowpasses.length; i++) {
			lowpasses[i].reset_lowpass();
		}
		for (var i: number = 0; i < highpasses.length; i++) {
			highpasses[i].reset_highpass();
		}
		for (var i: number = 0; i < pids.length; i++) {
			pids[i].reset_pid();
		}
		for (var i: number = 0; i < tptzs.length; i++) {
			tptzs[i].reset_tptz();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset_reactive_elements(): void {
		/* #INSERT_GENERATE_RESET_REACTIVE_ELEMENTS_TEMPLATE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < capacitors.length; i++) {
			capacitors[i].reset_capacitor();
		}
		for (var i: number = 0; i < inductors.length; i++) {
			inductors[i].reset_inductor();
		}
		for (var i: number = 0; i < relays.length; i++) {
			relays[i].reset_relay();
		}
		for (var i: number = 0; i < vccas.length; i++) {
			vccas[i].reset_vcca();
		}
		for (var i: number = 0; i < vcls.length; i++) {
			vcls[i].reset_vcl();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset_non_linear_elements(): void {
		/* #INSERT_GENERATE_RESET_NON_LINEAR_ELEMENTS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < diodes.length; i++) {
			diodes[i].reset_diode();
		}
		for (var i: number = 0; i < leds.length; i++) {
			leds[i].reset_led();
		}
		for (var i: number = 0; i < zeners.length; i++) {
			zeners[i].reset_zener();
		}
		for (var i: number = 0; i < nmosfets.length; i++) {
			nmosfets[i].reset_nmosfet();
		}
		for (var i: number = 0; i < pmosfets.length; i++) {
			pmosfets[i].reset_pmosfet();
		}
		for (var i: number = 0; i < npns.length; i++) {
			npns[i].reset_npn();
		}
		for (var i: number = 0; i < pnps.length; i++) {
			pnps[i].reset_pnp();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset_meter_values(): void {
		graph_window.reset();
		/* #INSERT_GENERATE_RESET_METER_TRACE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].reset_trace();
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].reset_trace();
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].reset_trace();
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].reset_trace();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	clear_meter_values(): void {
		/* #INSERT_GENERATE_RESET_METER# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].reset_meter();
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].reset_meter();
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].reset_meter();
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].reset_meter();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	update_vir(): void {
		if (this.simulation_time >= this.time_step + this.time_step) {
			scope_manager.update_scopes();
		} else {
			this.clear_meter_values();
		}
	}
	led_check(): void {
		for (var i: number = 0; i < leds.length; i++) {
			leds[i].turn_on_check();
		}
	}
	convergence_check(): void {
		if (this.node_size > 0 && matrix_x.length === matrix_x_copy.length) {
			if (this.first_error_check) {
				this.max_voltage_error = linear_algebra.matrix(matrix_x.length, matrix_x[0].length);
				this.max_current_error = linear_algebra.matrix(matrix_x.length, matrix_x[0].length);
				this.first_error_check = false;
			} else {
				for (var i: number = 0; i < this.max_voltage_error.length; i++) {
					for (var j: number = 0; j < this.max_voltage_error[0].length; j++) {
						this.max_voltage_error[i][j] = 0;
						this.max_current_error[i][j] = 0;
					}
				}
			}
			this.voltage_error_locked = false;
			this.current_error_locked = false;
			this.voltage_converged = false;
			this.current_converged = false;
			for (var i: number = 0; i < matrix_x.length; i++) {
				if (i < this.node_size) {
					this.max_voltage_error[i][0] = Math.max(Math.max(Math.abs(matrix_x[i][0]), Math.abs(matrix_x_copy[i][0])), global.settings.VNTOL);
				} else {
					this.max_current_error[i][0] = Math.max(Math.max(Math.abs(matrix_x[i][0]), Math.abs(matrix_x_copy[i][0])), global.settings.ABSTOL);
				}
			}
			for (var i: number = 0; i < matrix_x.length; i++) {
				if (i < this.node_size) {
					if (Math.abs(matrix_x[i][0] - matrix_x_copy[i][0]) < global.settings.RELTOL * this.max_voltage_error[i][0] + global.settings.VNTOL) {
						if (!this.voltage_error_locked) {
							this.voltage_converged = true;
						}
					} else {
						this.voltage_error_locked = true;
						this.voltage_converged = false;
					}
				} else {
					if (Math.abs(matrix_x[i][0] - matrix_x_copy[i][0]) < global.settings.RELTOL * this.max_current_error[i][0] + global.settings.ABSTOL) {
						if (!this.current_error_locked) {
							this.current_converged = true;
						}
					} else {
						this.current_error_locked = true;
						this.current_converged = false;
					}
				}
			}
			if (matrix_x.length - this.node_size <= 0) {
				this.current_converged = true;
			}
			if (!this.voltage_converged || !this.current_converged) {
				this.continue_solving = true;
			}
		}
	}
	non_linear_update(): void {
		/* #INSERT_GENERATE_NON_LINEAR_CHECK# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < diodes.length; i++) {
			diodes[i].update();
		}
		for (var i: number = 0; i < leds.length; i++) {
			leds[i].update();
		}
		for (var i: number = 0; i < zeners.length; i++) {
			zeners[i].update();
		}
		for (var i: number = 0; i < nmosfets.length; i++) {
			nmosfets[i].update();
		}
		for (var i: number = 0; i < pmosfets.length; i++) {
			pmosfets[i].update();
		}
		for (var i: number = 0; i < npns.length; i++) {
			npns[i].update();
		}
		for (var i: number = 0; i < pnps.length; i++) {
			pnps[i].update();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	update_reactive_elements(): void {
		/* #INSERT_GENERATE_UPDATE_REACTIVE_ELEMENTS_TEMPLATE_II# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < capacitors.length; i++) {
			capacitors[i].update_capacitor();
		}
		for (var i: number = 0; i < inductors.length; i++) {
			inductors[i].update_inductor();
		}
		for (var i: number = 0; i < relays.length; i++) {
			relays[i].update_relay();
		}
		for (var i: number = 0; i < vccas.length; i++) {
			vccas[i].update_vcca();
		}
		for (var i: number = 0; i < vcls.length; i++) {
			vcls[i].update_vcl();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	simulate(): void {
		if (global.flags.flag_simulating && this.initialized) {
			if (this.simulation_step === 0) {
				this.solve();
				if (this.continue_solving && !global.CONSTANTS.MOBILE_MODE) {
					this.solve();
				}
			} else {
				this.update_reactive_elements();
				if (!this.continue_solving || this.iterator >= global.settings.ITL4 || global.variables.is_singular || this.simulation_time >= this.SIMULATION_MAX_TIME) {
					if (this.iterator >= global.settings.ITL4) {
						menu_bar.handle_simulation_flag(!global.flags.flag_simulating);
						toast.set_text(language_manager.CONVERGENCE_ERROR[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
						toast.show();
					} else if (global.variables.is_singular) {
						menu_bar.handle_simulation_flag(!global.flags.flag_simulating);
						toast.set_text(language_manager.SINGULAR_MATRIX[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
						toast.show();
					} else if (this.simulation_time >= this.SIMULATION_MAX_TIME) {
						menu_bar.handle_simulation_flag(!global.flags.flag_simulating);
						toast.set_text(language_manager.END_OF_TIME[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
						toast.show();
					}
				}
				global.variables.canvas_draw_request_counter = 0;
				global.flags.canvas_draw_request = true;
				this.continue_solving = true;
				this.iterator = 0;
				this.update_vir();
				this.led_check();
				this.simulation_time += this.time_step;
				this.simulation_step = 0;
			}
		}
	}
	solve(): void {
		if (this.continue_solving && this.iterator < global.settings.ITL4) {
			this.continue_solving = false;
			if (this.first_matrix_build) {
				matrix_a = linear_algebra.matrix(this.node_size + this.offset, this.node_size + this.offset);
				matrix_z = linear_algebra.matrix(this.node_size + this.offset, 1);
				this.first_matrix_build = false;
			} else {
				for (var i: number = 0; i < matrix_z.length; i++) {
					matrix_z[i][0] = 0;
				}
				for (var i: number = 0; i < matrix_a.length; i++) {
					for (var j: number = 0; j < matrix_a[0].length; j++) {
						matrix_a[i][j] = 0;
					}
				}
			}
			matrix_a = linear_algebra.set_matrix_diagonal(matrix_a, global.settings.INV_R_MAX, this.node_size);
			engine_functions.stamp_elements();
			if (this.first_x_matrix_copy) {
				if (!this.first_x_matrix_solution) {
					matrix_x_copy = linear_algebra.matrix(this.node_size + this.offset, 1);
				} else {
					matrix_x_copy = global.utils.copy(matrix_x);
					this.first_x_matrix_copy = false;
				}
			} else {
				for (var i: number = 0; i < matrix_x.length; i++) {
					matrix_x_copy[i][0] = matrix_x[i][0];
				}
			}
			matrix_x = linear_algebra.lup_solve(matrix_a, matrix_z);
			for (var i: number = 0; i < matrix_x.length; i++) {
				if (isNaN(matrix_x[i][0])) {
					this.continue_solving = false;
					this.iterator = global.settings.ITL4;
					matrix_x[i][0] = 0;
				}
			}
			if (!this.first_x_matrix_solution) {
				this.first_x_matrix_solution = true;
			}
			if (global.variables.is_singular) {
				this.iterator = 0;
				this.continue_solving = false;
				this.simulation_step++;
			}
			this.solutions_ready = true;
			this.non_linear_update();
			this.convergence_check();
			this.iterator++;
			if (!this.continue_solving) {
				this.simulation_step++;
			}
		} else {
			this.simulation_step++;
		}
	}
	patch(): void {
		global.settings.patch();
	}
}
