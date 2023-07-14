import { NgModule } from "@angular/core";
import { RemoteEntryComponent } from "./entry.component";
import { SearchComponent } from "../search/search.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [RemoteEntryComponent],
	imports: [CommonModule, SearchComponent],

})
export class RemoteEntryModule { }