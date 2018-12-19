import { NgModule } from '@angular/core';
import { AppFooterComponent } from './app-footer/app-footer';
import { TimelineComponent } from './timeline/timeline';
import { AccordionListComponent } from './accordion-list/accordion-list';
@NgModule({
	declarations: [AppFooterComponent,
    TimelineComponent,
    AccordionListComponent],
	imports: [],
	exports: [AppFooterComponent,
    TimelineComponent,
    AccordionListComponent]
})
export class ComponentsModule {}
