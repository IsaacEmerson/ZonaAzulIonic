import { NgModule } from '@angular/core';
import { AppFooterComponent } from './app-footer/app-footer';
import { TimelineComponent } from './timeline/timeline';
@NgModule({
	declarations: [AppFooterComponent,
    TimelineComponent],
	imports: [],
	exports: [AppFooterComponent,
    TimelineComponent]
})
export class ComponentsModule {}
