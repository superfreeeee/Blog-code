#include <stdio.h>

typedef enum e_day {
    MON = 1, TUE, WED, THU, FRI, SAT, SUN
} Day;

int main() {
    printf("----- days using enum -----\n");
    for(Day day = MON;day<=SUN;day++) {
        switch (day) {
            case MON: printf("Monday is the %d day of the week\n", day); break;
            case TUE: printf("Tuesday is the %d day of the week\n", day); break;
            case WED: printf("Wednesday is the %d day of the week\n", day); break;
            case THU: printf("Thursday is the %d day of the week\n", day); break;
            case FRI: printf("Friday is the %d day of the week\n", day); break;
            case SAT: printf("Saturday is the %d day of the week\n", day); break;
            case SUN: printf("Sunday is the %d day of the week\n", day); break;
        }
    }
}