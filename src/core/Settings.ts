/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Settings.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to store the settings of the solver.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class Settings {
	/* A flag to make the camra view a perfect square. */
	public WORKSPACE_PERFECT_SQUARE: boolean;
	/* The Workspace Scaling (ultimately determines width and height of workspace view) */
	public WORKSPACE_RATIO_Y: number;
	public WORKSPACE_RATIO_X: number;
	/* Resistance for near zero voltage drop elements, like ammeters. */
	public WIRE_RESISTANCE: number;
	/* This is the multiplier for dx and dy when dragging the workspace's view */
	public TRANSLATION_SCALE: number;
	/* The maximum number of nodes to create for the given board. Must be a perfect square.*/
	public MAXNODES: number;
	/* The sqrt of the maximum nodes. Pre-computed.*/
	public SQRT_MAXNODES: number;
	public SQRT_MAXNODES_M1: number;
	public INV_SQRT_M_1: number;
	/* The max amount of resistance the system can handle. */
	public R_MAX: number;
	/* The max amount of resistance the system can handle. */
	public INV_R_MAX: number;
	/* A resistance that's place between nodes and ground, or non-linear elements nodes and ground.
It is mostly used for the diagonal of the matrix in order to help non-singularity */
	public R_SHUNT: number;
	/* These can get over written from SimulationManager (Future proofing.)  */
	/* The relative tolerance of the simulation error */
	public RELTOL: number;
	/* The absolute tolerance of the simulation error - Usually currents*/
	public ABSTOL: number;
	/* The voltage tolerance of the simmulation error. */
	public VNTOL: number;
	/* The tolerance during operating point analysis. */
	public TOLERANCE: number;
	/* The amount of iterations that are allowed to solve a time-step outout of
operating point analysis */
	public ITL4: number;
	/* The amount of iterations that are allowed to find an operating point. */
	public ITL1: number;
	/* The maximum amount of a parameters voltage */
	public MAX_VOLTAGE: number;
	/* The minimum amount of a parameters voltage  */
	public MIN_VOLTAGE: number;
	/* The maximum amount of a parameters current */
	public MAX_CURRENT: number;
	/* The minimum amount of a parameters current  */
	public MIN_CURRENT: number;
	/* The maximum amount of a parameters capacitance */
	public MAX_CAPACITANCE: number;
	/* The minimum amount of a parameters capacitance  */
	public MIN_CAPACITANCE: number;
	/* The maximum amount of a parameters inductance */
	public MAX_INDUCTANCE: number;
	/* The minimum amount of a parameters inductance  */
	public MIN_INDUCTANCE: number;
	/* The maximum amount of a parameters gain */
	public MAX_GAIN: number;
	/* The minimum amount of a parameters gain  */
	public MIN_GAIN: number;
	/* The maximum amount of a parameters frequency */
	public MAX_FREQUENCY: number;
	/* The minimum amount of a parameters frequency  */
	public MIN_FREQUENCY: number;
	/* The maximum amount of a parameters wavelength */
	public MAX_WAVELENGTH: number;
	/* The minimum amount of a parameters wavelength  */
	public MIN_WAVELENGTH: number;
	/* The maximum amount of a parameters wiper % */
	public MAX_POTENTIOMETER_WIPER: number;
	/* The minimum amount of a parameters wiper %  */
	public MIN_POTENTIOMETER_WIPER: number;
	/* The maximum amount of a parameters phase */
	public MAX_PHASE: number;
	/* The minimum amount of a parameters phase  */
	public MIN_PHASE: number;
	/* The maximum amount of a parameters resolution */
	public MAX_BIT_RESOLUTION: number;
	/* The minimum amount of a parameters resolution  */
	public MIN_BIT_RESOLUTION: number;
	/* The maximum amount of a duty cycle % */
	public MAX_DUTY_CYCLE: number;
	/* The minimum amount of a duty cycle %  */
	public MIN_DUTY_CYCLE: number;
	/* The maximum amount of a postscaler */
	public MAX_POSTSCALER: number;
	/* The minimum amount of a postscaler  */
	public MIN_POSTSCALER: number;
	/* The minimum time_constant   */
	public MIN_TIME_CONSTANT: number;
	/* The minimum time_constant   */
	public MAX_TIME_CONSTANT: number;

	constructor() {
		/* A flag to make the camra view a perfect square. */
		this.WORKSPACE_PERFECT_SQUARE = true;
		/* The Workspace Scaling (ultimately determines width and height of workspace view) */
		this.WORKSPACE_RATIO_Y = 0.45;
		if (this.WORKSPACE_PERFECT_SQUARE) {
			this.WORKSPACE_RATIO_X = _.clone(this.WORKSPACE_RATIO_Y);
		} else {
			this.WORKSPACE_RATIO_X = (view_port.view_height * this.WORKSPACE_RATIO_Y) / view_port.view_width;
		}
		/* Resistance for near zero voltage drop elements, like ammeters. */
		this.WIRE_RESISTANCE = 1e-3;
		/* This is the multiplier for dx and dy when dragging the workspace's view */
		this.TRANSLATION_SCALE = 1.2;
		/* The maximum number of nodes to create for the given board. Must be a perfect square.*/
		this.MAXNODES = 900;
		/* The sqrt of the maximum nodes. Pre-computed.*/
		this.SQRT_MAXNODES = Math.round(Math.sqrt(this.MAXNODES));
		this.SQRT_MAXNODES_M1 = this.SQRT_MAXNODES - 1;
		this.INV_SQRT_M_1 = 1.0 / (this.SQRT_MAXNODES - 1);
		/* The max amount of resistance the system can handle. */
		this.R_MAX = 1e9;
		/* The max amount of resistance the system can handle. */
		this.INV_R_MAX = 1.0 / this.R_MAX;
		/* A resistance that's place between nodes and ground, or non-linear elements nodes and ground.
    It is mostly used for the diagonal of the matrix in order to help non-singularity */
		this.R_SHUNT = 1e12;
		/* These can get over written from SimulationManager (Future proofing.)  */
		/* The relative tolerance of the simulation error */
		this.RELTOL = 1e-1;
		/* The absolute tolerance of the simulation error - Usually currents*/
		this.ABSTOL = 1e-1;
		/* The voltage tolerance of the simmulation error. */
		this.VNTOL = 1e-1;
		/* The tolerance during operating point analysis. */
		this.TOLERANCE = 1e-1;
		/* The amount of iterations that are allowed to solve a time-step outout of
    operating point analysis */
		this.ITL4 = 96;
		/* The amount of iterations that are allowed to find an operating point. */
		this.ITL1 = 24;
		/* The maximum amount of a parameters voltage */
		this.MAX_VOLTAGE = 500e6;
		/* The minimum amount of a parameters voltage  */
		this.MIN_VOLTAGE = 1e-15;
		/* The maximum amount of a parameters current */
		this.MAX_CURRENT = 500e6;
		/* The minimum amount of a parameters current  */
		this.MIN_CURRENT = 1e-15;
		/* The maximum amount of a parameters capacitance */
		this.MAX_CAPACITANCE = 500e6;
		/* The minimum amount of a parameters capacitance  */
		this.MIN_CAPACITANCE = 1e-15;
		/* The maximum amount of a parameters inductance */
		this.MAX_INDUCTANCE = 500e6;
		/* The minimum amount of a parameters inductance  */
		this.MIN_INDUCTANCE = 1e-15;
		/* The maximum amount of a parameters gain */
		this.MAX_GAIN = 500e6;
		/* The minimum amount of a parameters gain  */
		this.MIN_GAIN = 1e-15;
		/* The maximum amount of a parameters frequency */
		this.MAX_FREQUENCY = 500e6;
		/* The minimum amount of a parameters frequency  */
		this.MIN_FREQUENCY = 1e-15;
		/* The maximum amount of a parameters wavelength */
		this.MAX_WAVELENGTH = 700;
		/* The minimum amount of a parameters wavelength  */
		this.MIN_WAVELENGTH = 400;
		/* The maximum amount of a parameters wiper % */
		this.MAX_POTENTIOMETER_WIPER = 99.99;
		/* The minimum amount of a parameters wiper %  */
		this.MIN_POTENTIOMETER_WIPER = 0.01;
		/* The maximum amount of a parameters phase */
		this.MAX_PHASE = 360.0;
		/* The minimum amount of a parameters phase  */
		this.MIN_PHASE = 0;
		/* The maximum amount of a parameters resolution */
		this.MAX_BIT_RESOLUTION = 24;
		/* The minimum amount of a parameters resolution  */
		this.MIN_BIT_RESOLUTION = 1;
		/* The maximum amount of a duty cycle % */
		this.MAX_DUTY_CYCLE = 98;
		/* The minimum amount of a duty cycle %  */
		this.MIN_DUTY_CYCLE = 2;
		/* The maximum amount of a postscaler */
		this.MAX_POSTSCALER = 500e6;
		/* The minimum amount of a postscaler  */
		this.MIN_POSTSCALER = 1;
		/* The minimum time_constant   */
		this.MIN_TIME_CONSTANT = 100e-9;
		/* The minimum time_constant   */
		this.MAX_TIME_CONSTANT = 10;
	}
	patch(): void {
		/* A flag to make the camra view a perfect square. */
		this.WORKSPACE_PERFECT_SQUARE = true;
		/* The Workspace Scaling (ultimately determines width and height of workspace view) */
		this.WORKSPACE_RATIO_Y = 0.45;
		if (this.WORKSPACE_PERFECT_SQUARE) {
			this.WORKSPACE_RATIO_X = _.clone(this.WORKSPACE_RATIO_Y);
		} else {
			this.WORKSPACE_RATIO_X = (view_port.view_height * this.WORKSPACE_RATIO_Y) / view_port.view_width;
		}
		/* Resistance for near zero voltage drop elements, like ammeters. */
		this.WIRE_RESISTANCE = 1e-3;
		/* This is the multiplier for dx and dy when dragging the workspace's view */
		this.TRANSLATION_SCALE = 1.2;
		/* The maximum number of nodes to create for the given board. Must be a perfect square.*/
		this.MAXNODES = 900;
		/* The sqrt of the maximum nodes. Pre-computed.*/
		this.SQRT_MAXNODES = Math.round(Math.sqrt(this.MAXNODES));
		this.SQRT_MAXNODES_M1 = this.SQRT_MAXNODES - 1;
		this.INV_SQRT_M_1 = 1.0 / (this.SQRT_MAXNODES - 1);
		/* The max amount of resistance the system can handle. */
		this.R_MAX = 1e9;
		/* The max amount of resistance the system can handle. */
		this.INV_R_MAX = 1.0 / this.R_MAX;
		/* A resistance that's place between nodes and ground, or non-linear elements nodes and ground.
    It is mostly used for the diagonal of the matrix in order to help non-singularity */
		this.R_SHUNT = 1e12;
		/* These can get over written from SimulationManager (Future proofing.)  */
		/* The relative tolerance of the simulation error */
		this.RELTOL = 1e-1;
		/* The absolute tolerance of the simulation error - Usually currents*/
		this.ABSTOL = 1e-1;
		/* The voltage tolerance of the simmulation error. */
		this.VNTOL = 1e-1;
		/* The tolerance during operating point analysis. */
		this.TOLERANCE = 1e-1;
		/* The amount of iterations that are allowed to solve a time-step outout of
    operating point analysis */
		this.ITL4 = 96;
		/* The amount of iterations that are allowed to find an operating point. */
		this.ITL1 = 24;
		/* The maximum amount of a parameters voltage */
		this.MAX_VOLTAGE = 500e6;
		/* The minimum amount of a parameters voltage  */
		this.MIN_VOLTAGE = 1e-15;
		/* The maximum amount of a parameters current */
		this.MAX_CURRENT = 500e6;
		/* The minimum amount of a parameters current  */
		this.MIN_CURRENT = 1e-15;
		/* The maximum amount of a parameters capacitance */
		this.MAX_CAPACITANCE = 500e6;
		/* The minimum amount of a parameters capacitance  */
		this.MIN_CAPACITANCE = 1e-15;
		/* The maximum amount of a parameters inductance */
		this.MAX_INDUCTANCE = 500e6;
		/* The minimum amount of a parameters inductance  */
		this.MIN_INDUCTANCE = 1e-15;
		/* The maximum amount of a parameters gain */
		this.MAX_GAIN = 500e6;
		/* The minimum amount of a parameters gain  */
		this.MIN_GAIN = 1e-15;
		/* The maximum amount of a parameters frequency */
		this.MAX_FREQUENCY = 500e6;
		/* The minimum amount of a parameters frequency  */
		this.MIN_FREQUENCY = 1e-15;
		/* The maximum amount of a parameters wavelength */
		this.MAX_WAVELENGTH = 700;
		/* The minimum amount of a parameters wavelength  */
		this.MIN_WAVELENGTH = 400;
		/* The maximum amount of a parameters wiper % */
		this.MAX_POTENTIOMETER_WIPER = 99.99;
		/* The minimum amount of a parameters wiper %  */
		this.MIN_POTENTIOMETER_WIPER = 0.01;
		/* The maximum amount of a parameters phase */
		this.MAX_PHASE = 360.0;
		/* The minimum amount of a parameters phase  */
		this.MIN_PHASE = 0;
		/* The maximum amount of a parameters resolution */
		this.MAX_BIT_RESOLUTION = 24;
		/* The minimum amount of a parameters resolution  */
		this.MIN_BIT_RESOLUTION = 1;
		/* The maximum amount of a duty cycle % */
		this.MAX_DUTY_CYCLE = 98;
		/* The minimum amount of a duty cycle %  */
		this.MIN_DUTY_CYCLE = 2;
		/* The maximum amount of a postscaler */
		this.MAX_POSTSCALER = 500e6;
		/* The minimum amount of a postscaler  */
		this.MIN_POSTSCALER = 1;
		/* The minimum time_constant   */
		this.MIN_TIME_CONSTANT = 100e-9;
		/* The minimum time_constant   */
		this.MAX_TIME_CONSTANT = 10;
	}
}
