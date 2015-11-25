#pragma once

#define USE_GENERIC_MAIN
#define REMOVE_LEADING_ZERO_FROM_TIME

#define BG_IMAGE RESOURCE_ID_IMAGE_CAPNION

#undef FONT_NAME
#define FONT_SYSTEM_NAME FONT_KEY_BITHAM_42_BOLD

#define BLUETOOTH_DISCONNECTED_STR "No BT"
#define BAT_FMT_STR "Bat:\n%d%%"
#define DATE_FMT_STR "%a\n%d %b"  /* TODO review %d for day */
#define MAX_DATE_STR "Thu\n00 Aug"  /* if custom version of DATE_FMT_STR is set, MAX_DATE_STR  needs to be updated too */

#define BT_ALIGN GTextAlignmentRight
#define BAT_ALIGN GTextAlignmentRight
#define TIME_ALIGN GTextAlignmentRight

#define DEFAULT_TIME_COLOR GColorBlack
#define DEFAULT_BACKGROUND_COLOR GColorWhite


#define RHS_OFFSET 3
#define CLOCK_POS GRect(0, -8, 144 - RHS_OFFSET, 168) /* probably taller than really needed */
#define BT_POS GRect(0, 40, 144, 168) /* probably taller than really needed */
#define DATE_POS GRect(0, 65, 144 - RHS_OFFSET, 168) /* probably taller than really needed */
#define BAT_POS GRect(0, 125, 144 - RHS_OFFSET, 168) /* probably taller than really needed */
