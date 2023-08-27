package fr.funetdelire.oncallscheduler.problem;

import java.time.LocalDate;

public class OnCallProblem {
	private int numberOfWeeks;
	private int numberOfPeople;
	private LocalDate startPoint;
	
	public OnCallProblem(int numberOfWeeks, int numberOfPeople, LocalDate startPoint) {
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

	public LocalDate getStartPoint() {
		return startPoint;
	}

	private boolean personExists(int n) {
		return n < numberOfPeople && n >= 0;
	}
	
	public double getFitness(OnCallSchedule schedule) {
		double deviation = 0;
		float mean = 0;
		int[] weeksSchedule = schedule.getWeeksSchedule();
		int[] weekEndsSchedule = schedule.getWeekEndsSchedule();
		int[] daysPerPerson = new int[numberOfPeople];
		
		for (int i = 0 ; i < numberOfWeeks ; i++) {
			mean += 7;
			daysPerPerson[weeksSchedule[i]] += 4;
			daysPerPerson[weekEndsSchedule[i]] += 3;
		}
		mean /= numberOfPeople;
				
		for (int i = 0 ; i < numberOfPeople ; i++) {
			deviation += Math.pow(daysPerPerson[i] - mean ,2);
		}
		
		return Math.sqrt(deviation/numberOfPeople);
	}
	
	public boolean checkSchedule(OnCallSchedule schedule) {
		int[] weeksSchedule = schedule.getWeeksSchedule();
		int[] weekEndsSchedule = schedule.getWeekEndsSchedule();
		LocalDate current = startPoint;
		int[] lastMonthScheduled = new int[numberOfPeople];
		
		if (weeksSchedule.length != weekEndsSchedule.length || weeksSchedule.length != numberOfWeeks) {
			return false;
		}
		
		for (int i = 0 ; i < numberOfWeeks ; i++) {
			int weekPerson = weeksSchedule[i];
			int weekEndPerson = weekEndsSchedule[i];
			int currentMonth = current.getMonthValue();
			
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
			current = current.plusWeeks(1);
		}
		
		return true;
	}
}
