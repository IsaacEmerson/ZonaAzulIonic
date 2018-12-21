import { NgModule } from '@angular/core';
import { AppFooterComponent } from './app-footer/app-footer';
import { TimelineComponent } from './timeline/timeline';
import { AccordionListComponent } from './accordion-list/accordion-list';
import { TimerProgressComponent } from './timer-progress/timer-progress';
@NgModule({
	declarations: [AppFooterComponent,
    TimelineComponent,
    AccordionListComponent,
    TimerProgressComponent],
	imports: [],
	exports: [AppFooterComponent,
    TimelineComponent,
    AccordionListComponent,
    TimerProgressComponent]
})
export class ComponentsModule {}
