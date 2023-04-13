package fr.funetdelire.oncallscheduler.problem;

import java.util.Calendar;

public class OnCallProblem {
	private int numberOfWeeks;
	private int numberOfPeople;
	private Calendar startPoint;
	
	public OnCallProblem(int numberOfWeeks, int numberOfPeople, Calendar startPoint) {
		this.numberOfWeeks = numberOfWeeks;
		this.numberOfPeople = numberOfPeople;
		this.startPoint = startPoint;
	}
	
	public int getNumberOfWeeks() {
		return numberOfWeeks;
	}

	public int getNumberOfPeople() {
		return numberOfPeople;
	}

	public Calendar getStartPoint() {
		return startPoint;
	}

	private boolean personExists(int n) {
		return n < numberOfPeople && n >= 0;
	}
	
	public boolean checkSchedule(OnCallSchedule schedule) {
		int[] weeksSchedule = schedule.getWeeksSchedule();
		int[] weekEndsSchedule = schedule.getWeekEndsSchedule();
		Calendar current = (Calendar) startPoint.clone();
		int[] lastMonthScheduled = new int[numberOfPeople];
		
		if (weeksSchedule.length != weekEndsSchedule.length || weeksSchedule.length != numberOfWeeks) {
			return false;
		}
		
		for (int i = 0 ; i < numberOfWeeks ; i++) {
			int weekPerson = weeksSchedule[i];
			int weekEndPerson = weekEndsSchedule[i];
			int currentMonth = current.get(Calendar.MONTH) + 1;
			
			// The scheduled person must exist
			if (!personExists(weekPerson) || !personExists(weekEndPerson)) {
				return false;
			}
			
			// The scheduled person must not be on call during the week and during the week end
			if (weekPerson == weekEndPerson) {
				return false;
			}
			
			// The scheduled person must be on call only one time per month
			if (currentMonth == lastMonthScheduled[weekPerson]
					|| currentMonth == lastMonthScheduled[weekEndPerson]) {
				return false;
			}
			
			lastMonthScheduled[weekPerson] = currentMonth;
			lastMonthScheduled[weekEndPerson] = currentMonth;
			current.roll(Calendar.WEEK_OF_YEAR, true);
		}
		
		return true;
	}
}
