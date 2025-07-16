
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AutoSaveService {
    private saveSubject = new Subject<any>();
    private statusSubject = new BehaviorSubject<'idle' | 'saving' | 'saved' | 'error'>('idle');

    constructor() {
        this.saveSubject.pipe(
            debounceTime(2000),
            distinctUntilChanged()
        ).subscribe(data => {
            this.saveData(data);
        });
    }

    triggerSave(data: any): void {
        this.statusSubject.next('saving');
        this.saveSubject.next(data);
    }

    getSaveStatus(): Observable<'idle' | 'saving' | 'saved' | 'error'> {
        return this.statusSubject.asObservable();
    }

    private saveData(data: any): void {
        // Simulate API call or localStorage save
        setTimeout(() => {
            try {
                localStorage.setItem('ngx-smart-forms-data', JSON.stringify(data));
                this.statusSubject.next('saved');

                setTimeout(() => {
                    this.statusSubject.next('idle');
                }, 2000);
            } catch (error) {
                this.statusSubject.next('error');
            }
        }, 1000);
    }
}