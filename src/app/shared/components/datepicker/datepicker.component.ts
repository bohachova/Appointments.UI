import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrl: './datepicker.component.scss'
  })
  export class DatePickerComponent {
    @Input()
    date: Date = new Date();
    @Input() 
    workingDays: number[] = [];

    @Output()
    dateClicked = new EventEmitter<Date>();

    selectedDate: Date | null = null;
    week: Date[] = [];
    forwardClickLimit = 5;
    backClickLimit = 0;
    days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


    ngOnInit(): void {
      this.selectedDate = this.date;
      this.fillWeek();
    }

    fillWeek(){
      this.week = [];

      const startDate = new Date(this.date);
      startDate.setDate(startDate.getDate() - (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)); 
    
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        this.week.push(day);
      }

      for(let i = 0; i < this.week.length; i++){
        if(!this.isDisabled(this.week[i])){
          this.selectedDate = this.week[i];
          this.dateClicked.emit(this.selectedDate);
          break;
        }
      }
    }

    getDateNumber(date: Date): number {
      return date.getDate();
    }

    onDateClick(date: Date): void{
      if (!this.isDisabled(date)) {
        this.selectedDate = date;
        this.dateClicked.emit(date);
      }
    }

    isSelected(date: Date): boolean {
      console.log(this.date?.getTime(), date.getTime())
      return this.selectedDate?.getTime() === date.getTime();
    }

    isDisabled(date: Date): boolean {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today || this.workingDays.length > 0 && !this.workingDays.includes(date.getDay());
    }

    viewNextWeek(){
      if (this.forwardClickLimit > 0){
        this.updateWeekData(1);
        this.forwardClickLimit--;
        this.backClickLimit++;
      }
    }

    viewPreviousWeek(){
      if (this.backClickLimit > 0){
        this.updateWeekData(-1);
        this.forwardClickLimit++;
        this.backClickLimit--;
      }
    }

    updateWeekData(direction: number){
      this.week = [];
      const dayOfWeek = this.date.getDay();
      const daysToMove = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      this.date.setDate(this.date.getDate() + direction * (7 + (direction > 0 ? -daysToMove : daysToMove)));
      this.fillWeek();
      }
    }
  