/**
 * The variables in this file are not really constants.
 * Please treat any capitalized variable as a constant -
 * do not change it. If you do change one, you are wrong
 * and must be duly punished.
 */

LEFT = -1;
RIGHT = 1;

SPRITESCALE = 0.25;


/* Budget Subgroups */
INFRASTRUCTURE 	= 0;
CULTURE 		= 1;
SCIENCE_EDU 	= 2;
HEALTH 			= 3;
WELFARE 		= 4;

/* Budget target proportions */
TARGET_INFRASTRUCTURE 	= 0.25;
TARGET_CULTURE 			= 0.10;
TARGET_SCIENCE_EDU 		= 0.15;
TARGET_HEALTH 			= 0.20;
TARGET_WELFARE 			= 0.30;

SUBGROUP_TARGETS = [	
			TARGET_INFRASTRUCTURE,
			TARGET_CULTURE,
			TARGET_SCIENCE_EDU,
			TARGET_HEALTH,
			TARGET_WELFARE];
SUBGROUP_NAMES = [	
			"Infrastruktur og samferdsel",
			"Kultur", 
			"Forskning og utdanning", 
			"Helse",
			"Velferd"];