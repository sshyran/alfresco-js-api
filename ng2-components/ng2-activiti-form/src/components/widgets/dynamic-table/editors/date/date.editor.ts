/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, ElementRef } from '@angular/core';
import { CellEditorComponent } from './../cell.editor';

@Component({
    moduleId: module.id,
    selector: 'alf-date-editor',
    templateUrl: './date.editor.html',
    styleUrls: ['./date.editor.css']
})
export class DateEditorComponent extends CellEditorComponent implements OnInit {

    DATE_FORMAT: string = 'DD-MM-YYYY';

    datePicker: any;

    constructor(private elementRef: ElementRef) {
        super();
    }

    ngOnInit() {
        let settings: any = {
            type: 'date',
            future: moment().add(21, 'years')
        };

        let value = this.table.getCellValue(this.row, this.column);
        if (value) {
            settings.init = moment(value, this.DATE_FORMAT);
        }

        this.datePicker = new mdDateTimePicker.default(settings);
        if (this.elementRef) {
            this.datePicker.trigger = this.elementRef.nativeElement.querySelector('#dateInput');
        }
    }

    onDateSelected(event: CustomEvent) {
        let newValue = this.datePicker.time.format('YYYY-MM-DD');
        this.row.value[this.column.id] = newValue + 'T00:00:00.000Z';
        this.table.flushValue();

        if (this.elementRef) {
            this.setupMaterialTextField(this.elementRef, componentHandler, newValue);
        }
    }

    setupMaterialTextField(elementRef: ElementRef, handler: any, value: string): boolean {
        if (elementRef && handler) {
            let el = elementRef.nativeElement;
            if (el) {
                let container = el.querySelector('.mdl-textfield');
                if (container) {
                    container.MaterialTextfield.change(value);
                    return true;
                }
            }
        }
        return false;
    }

}
